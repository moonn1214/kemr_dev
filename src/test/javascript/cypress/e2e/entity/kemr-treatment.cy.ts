import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('KemrTreatment e2e test', () => {
  const kemrTreatmentPageUrl = '/kemr-treatment';
  const kemrTreatmentPageUrlPattern = new RegExp('/kemr-treatment(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrTreatmentSample = { kemrTreatmentName: '강원 blockchains' };

  let kemrTreatment;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-treatments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-treatments').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-treatments/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrTreatment) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-treatments/${kemrTreatment.id}`,
      }).then(() => {
        kemrTreatment = undefined;
      });
    }
  });

  it('KemrTreatments menu should load KemrTreatments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-treatment');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrTreatment').should('exist');
    cy.url().should('match', kemrTreatmentPageUrlPattern);
  });

  describe('KemrTreatment page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrTreatmentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrTreatment page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-treatment/new$'));
        cy.getEntityCreateUpdateHeading('KemrTreatment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrTreatmentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-treatments',
          body: kemrTreatmentSample,
        }).then(({ body }) => {
          kemrTreatment = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-treatments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrTreatment],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrTreatmentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrTreatment page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrTreatment');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrTreatmentPageUrlPattern);
      });

      it('edit button click should load edit KemrTreatment page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrTreatment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrTreatmentPageUrlPattern);
      });

      it('edit button click should load edit KemrTreatment page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrTreatment');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrTreatmentPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrTreatment', () => {
        cy.intercept('GET', '/api/kemr-treatments/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrTreatment').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrTreatmentPageUrlPattern);

        kemrTreatment = undefined;
      });
    });
  });

  describe('new KemrTreatment page', () => {
    beforeEach(() => {
      cy.visit(`${kemrTreatmentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrTreatment');
    });

    it('should create an instance of KemrTreatment', () => {
      cy.get(`[data-cy="kemrTreatmentName"]`).type('Steel wireless Home').should('have.value', 'Steel wireless Home');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrTreatment = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrTreatmentPageUrlPattern);
    });
  });
});
