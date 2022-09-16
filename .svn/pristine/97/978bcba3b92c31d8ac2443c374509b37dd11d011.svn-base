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

describe('KemrMedicalTreatment e2e test', () => {
  const kemrMedicalTreatmentPageUrl = '/kemr-medical-treatment';
  const kemrMedicalTreatmentPageUrlPattern = new RegExp('/kemr-medical-treatment(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrMedicalTreatmentSample = {};

  let kemrMedicalTreatment;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-medical-treatments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-medical-treatments').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-medical-treatments/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrMedicalTreatment) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-medical-treatments/${kemrMedicalTreatment.id}`,
      }).then(() => {
        kemrMedicalTreatment = undefined;
      });
    }
  });

  it('KemrMedicalTreatments menu should load KemrMedicalTreatments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-medical-treatment');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrMedicalTreatment').should('exist');
    cy.url().should('match', kemrMedicalTreatmentPageUrlPattern);
  });

  describe('KemrMedicalTreatment page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrMedicalTreatmentPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrMedicalTreatment page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-medical-treatment/new$'));
        cy.getEntityCreateUpdateHeading('KemrMedicalTreatment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalTreatmentPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-medical-treatments',
          body: kemrMedicalTreatmentSample,
        }).then(({ body }) => {
          kemrMedicalTreatment = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-medical-treatments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrMedicalTreatment],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrMedicalTreatmentPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrMedicalTreatment page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrMedicalTreatment');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalTreatmentPageUrlPattern);
      });

      it('edit button click should load edit KemrMedicalTreatment page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrMedicalTreatment');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalTreatmentPageUrlPattern);
      });

      it('edit button click should load edit KemrMedicalTreatment page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrMedicalTreatment');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalTreatmentPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrMedicalTreatment', () => {
        cy.intercept('GET', '/api/kemr-medical-treatments/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrMedicalTreatment').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalTreatmentPageUrlPattern);

        kemrMedicalTreatment = undefined;
      });
    });
  });

  describe('new KemrMedicalTreatment page', () => {
    beforeEach(() => {
      cy.visit(`${kemrMedicalTreatmentPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrMedicalTreatment');
    });

    it('should create an instance of KemrMedicalTreatment', () => {
      cy.get(`[data-cy="kemrMedicalTreatmentDoctorNote"]`)
        .type('Gibraltar Practical wireless')
        .should('have.value', 'Gibraltar Practical wireless');

      cy.get(`[data-cy="kemrMedicalTreatmentNurseMessage"]`).type('protocol').should('have.value', 'protocol');

      cy.get(`[data-cy="kemrMedicalTreatmentDate"]`).type('2022-08-30T12:25').blur().should('have.value', '2022-08-30T12:25');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrMedicalTreatment = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrMedicalTreatmentPageUrlPattern);
    });
  });
});
