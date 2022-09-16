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

describe('KemrDoctor e2e test', () => {
  const kemrDoctorPageUrl = '/kemr-doctor';
  const kemrDoctorPageUrlPattern = new RegExp('/kemr-doctor(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrDoctorSample = { kemrDoctorName: 'Interactions Cambrid', kemrDoctorField: 'schemas 면' };

  let kemrDoctor;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-doctors+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-doctors').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-doctors/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrDoctor) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-doctors/${kemrDoctor.id}`,
      }).then(() => {
        kemrDoctor = undefined;
      });
    }
  });

  it('KemrDoctors menu should load KemrDoctors page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-doctor');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrDoctor').should('exist');
    cy.url().should('match', kemrDoctorPageUrlPattern);
  });

  describe('KemrDoctor page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrDoctorPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrDoctor page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-doctor/new$'));
        cy.getEntityCreateUpdateHeading('KemrDoctor');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDoctorPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-doctors',
          body: kemrDoctorSample,
        }).then(({ body }) => {
          kemrDoctor = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-doctors+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrDoctor],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrDoctorPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrDoctor page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrDoctor');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDoctorPageUrlPattern);
      });

      it('edit button click should load edit KemrDoctor page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrDoctor');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDoctorPageUrlPattern);
      });

      it('edit button click should load edit KemrDoctor page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrDoctor');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDoctorPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrDoctor', () => {
        cy.intercept('GET', '/api/kemr-doctors/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrDoctor').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDoctorPageUrlPattern);

        kemrDoctor = undefined;
      });
    });
  });

  describe('new KemrDoctor page', () => {
    beforeEach(() => {
      cy.visit(`${kemrDoctorPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrDoctor');
    });

    it('should create an instance of KemrDoctor', () => {
      cy.get(`[data-cy="kemrDoctorName"]`).type('index').should('have.value', 'index');

      cy.get(`[data-cy="kemrDoctorField"]`).type('Computers').should('have.value', 'Computers');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrDoctor = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrDoctorPageUrlPattern);
    });
  });
});
