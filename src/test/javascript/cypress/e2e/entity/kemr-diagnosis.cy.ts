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

describe('KemrDiagnosis e2e test', () => {
  const kemrDiagnosisPageUrl = '/kemr-diagnosis';
  const kemrDiagnosisPageUrlPattern = new RegExp('/kemr-diagnosis(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrDiagnosisSample = { kemrDiagnosisName: 'Clothing' };

  let kemrDiagnosis;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-diagnoses+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-diagnoses').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-diagnoses/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrDiagnosis) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-diagnoses/${kemrDiagnosis.id}`,
      }).then(() => {
        kemrDiagnosis = undefined;
      });
    }
  });

  it('KemrDiagnoses menu should load KemrDiagnoses page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-diagnosis');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrDiagnosis').should('exist');
    cy.url().should('match', kemrDiagnosisPageUrlPattern);
  });

  describe('KemrDiagnosis page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrDiagnosisPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrDiagnosis page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-diagnosis/new$'));
        cy.getEntityCreateUpdateHeading('KemrDiagnosis');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDiagnosisPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-diagnoses',
          body: kemrDiagnosisSample,
        }).then(({ body }) => {
          kemrDiagnosis = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-diagnoses+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrDiagnosis],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrDiagnosisPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrDiagnosis page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrDiagnosis');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDiagnosisPageUrlPattern);
      });

      it('edit button click should load edit KemrDiagnosis page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrDiagnosis');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDiagnosisPageUrlPattern);
      });

      it('edit button click should load edit KemrDiagnosis page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrDiagnosis');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDiagnosisPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrDiagnosis', () => {
        cy.intercept('GET', '/api/kemr-diagnoses/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrDiagnosis').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrDiagnosisPageUrlPattern);

        kemrDiagnosis = undefined;
      });
    });
  });

  describe('new KemrDiagnosis page', () => {
    beforeEach(() => {
      cy.visit(`${kemrDiagnosisPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrDiagnosis');
    });

    it('should create an instance of KemrDiagnosis', () => {
      cy.get(`[data-cy="kemrDiagnosisName"]`).type('Portugal capacitor Handmade').should('have.value', 'Portugal capacitor Handmade');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrDiagnosis = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrDiagnosisPageUrlPattern);
    });
  });
});
