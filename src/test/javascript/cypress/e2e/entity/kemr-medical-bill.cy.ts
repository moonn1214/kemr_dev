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

describe('KemrMedicalBill e2e test', () => {
  const kemrMedicalBillPageUrl = '/kemr-medical-bill';
  const kemrMedicalBillPageUrlPattern = new RegExp('/kemr-medical-bill(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrMedicalBillSample = {
    kemrMedicalBillTotal: 93867,
    kemrMedicalBillNhsShare: 12521,
    kemrMedicalBillPatientShare: 73894,
    kemrMedicalBillMethod: 'c',
    kemrMedicalBillDeliveryType: 'A',
    kemrMedicalBillCashReceipt: '동',
  };

  let kemrMedicalBill;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-medical-bills+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-medical-bills').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-medical-bills/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrMedicalBill) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-medical-bills/${kemrMedicalBill.id}`,
      }).then(() => {
        kemrMedicalBill = undefined;
      });
    }
  });

  it('KemrMedicalBills menu should load KemrMedicalBills page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-medical-bill');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrMedicalBill').should('exist');
    cy.url().should('match', kemrMedicalBillPageUrlPattern);
  });

  describe('KemrMedicalBill page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrMedicalBillPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrMedicalBill page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-medical-bill/new$'));
        cy.getEntityCreateUpdateHeading('KemrMedicalBill');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalBillPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-medical-bills',
          body: kemrMedicalBillSample,
        }).then(({ body }) => {
          kemrMedicalBill = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-medical-bills+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrMedicalBill],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrMedicalBillPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrMedicalBill page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrMedicalBill');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalBillPageUrlPattern);
      });

      it('edit button click should load edit KemrMedicalBill page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrMedicalBill');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalBillPageUrlPattern);
      });

      it('edit button click should load edit KemrMedicalBill page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrMedicalBill');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalBillPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrMedicalBill', () => {
        cy.intercept('GET', '/api/kemr-medical-bills/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrMedicalBill').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicalBillPageUrlPattern);

        kemrMedicalBill = undefined;
      });
    });
  });

  describe('new KemrMedicalBill page', () => {
    beforeEach(() => {
      cy.visit(`${kemrMedicalBillPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrMedicalBill');
    });

    it('should create an instance of KemrMedicalBill', () => {
      cy.get(`[data-cy="kemrMedicalBillTotal"]`).type('92094').should('have.value', '92094');

      cy.get(`[data-cy="kemrMedicalBillNhsShare"]`).type('48571').should('have.value', '48571');

      cy.get(`[data-cy="kemrMedicalBillPatientShare"]`).type('93646').should('have.value', '93646');

      cy.get(`[data-cy="kemrMedicalBillMethod"]`).type('B').should('have.value', 'B');

      cy.get(`[data-cy="kemrMedicalBillDeliveryType"]`).type('g').should('have.value', 'g');

      cy.get(`[data-cy="kemrMedicalBillCashReceipt"]`).type('Data Progressive 인천').should('have.value', 'Data Progressive 인천');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrMedicalBill = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrMedicalBillPageUrlPattern);
    });
  });
});
