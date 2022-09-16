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

describe('KemrMedicine e2e test', () => {
  const kemrMedicinePageUrl = '/kemr-medicine';
  const kemrMedicinePageUrlPattern = new RegExp('/kemr-medicine(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrMedicineSample = { kemrMedicineName: 'program archive middleware', kemrMedicinePrice: 68670 };

  let kemrMedicine;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-medicines+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-medicines').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-medicines/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrMedicine) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-medicines/${kemrMedicine.id}`,
      }).then(() => {
        kemrMedicine = undefined;
      });
    }
  });

  it('KemrMedicines menu should load KemrMedicines page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-medicine');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrMedicine').should('exist');
    cy.url().should('match', kemrMedicinePageUrlPattern);
  });

  describe('KemrMedicine page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrMedicinePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrMedicine page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-medicine/new$'));
        cy.getEntityCreateUpdateHeading('KemrMedicine');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicinePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-medicines',
          body: kemrMedicineSample,
        }).then(({ body }) => {
          kemrMedicine = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-medicines+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrMedicine],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrMedicinePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrMedicine page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrMedicine');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicinePageUrlPattern);
      });

      it('edit button click should load edit KemrMedicine page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrMedicine');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicinePageUrlPattern);
      });

      it('edit button click should load edit KemrMedicine page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrMedicine');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicinePageUrlPattern);
      });

      it('last delete button click should delete instance of KemrMedicine', () => {
        cy.intercept('GET', '/api/kemr-medicines/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrMedicine').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrMedicinePageUrlPattern);

        kemrMedicine = undefined;
      });
    });
  });

  describe('new KemrMedicine page', () => {
    beforeEach(() => {
      cy.visit(`${kemrMedicinePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrMedicine');
    });

    it('should create an instance of KemrMedicine', () => {
      cy.get(`[data-cy="kemrMedicineName"]`).type('Money initiatives 24/365').should('have.value', 'Money initiatives 24/365');

      cy.get(`[data-cy="kemrMedicinePrice"]`).type('65381').should('have.value', '65381');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrMedicine = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrMedicinePageUrlPattern);
    });
  });
});
