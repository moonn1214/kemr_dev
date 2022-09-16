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

describe('KemrPrescription e2e test', () => {
  const kemrPrescriptionPageUrl = '/kemr-prescription';
  const kemrPrescriptionPageUrlPattern = new RegExp('/kemr-prescription(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrPrescriptionSample = {};

  let kemrPrescription;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-prescriptions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-prescriptions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-prescriptions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrPrescription) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-prescriptions/${kemrPrescription.id}`,
      }).then(() => {
        kemrPrescription = undefined;
      });
    }
  });

  it('KemrPrescriptions menu should load KemrPrescriptions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-prescription');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrPrescription').should('exist');
    cy.url().should('match', kemrPrescriptionPageUrlPattern);
  });

  describe('KemrPrescription page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrPrescriptionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrPrescription page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-prescription/new$'));
        cy.getEntityCreateUpdateHeading('KemrPrescription');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPrescriptionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-prescriptions',
          body: kemrPrescriptionSample,
        }).then(({ body }) => {
          kemrPrescription = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-prescriptions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrPrescription],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrPrescriptionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrPrescription page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrPrescription');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPrescriptionPageUrlPattern);
      });

      it('edit button click should load edit KemrPrescription page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrPrescription');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPrescriptionPageUrlPattern);
      });

      it('edit button click should load edit KemrPrescription page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrPrescription');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPrescriptionPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrPrescription', () => {
        cy.intercept('GET', '/api/kemr-prescriptions/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrPrescription').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPrescriptionPageUrlPattern);

        kemrPrescription = undefined;
      });
    });
  });

  describe('new KemrPrescription page', () => {
    beforeEach(() => {
      cy.visit(`${kemrPrescriptionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrPrescription');
    });

    it('should create an instance of KemrPrescription', () => {
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrPrescription = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrPrescriptionPageUrlPattern);
    });
  });
});
