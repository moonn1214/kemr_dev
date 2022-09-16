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

describe('KemrInstitution e2e test', () => {
  const kemrInstitutionPageUrl = '/kemr-institution';
  const kemrInstitutionPageUrlPattern = new RegExp('/kemr-institution(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrInstitutionSample = {
    kemrInstitutionId: 'Mouse Home Granite',
    kemrInstitutionPassword: 'haptic',
    kemrInstitutionName: 'Usability withdrawal',
    kemrInstitutionManager: 'Object-based empower',
    kemrInstitutionCellphone: '대전 Car',
    kemrInstitutionEmail: 'PNG',
    kemrInstitutionAgree: '2022-08-31T01:39:13.141Z',
    kemrInstitutionStatus: 'v',
  };

  let kemrInstitution;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-institutions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-institutions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-institutions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrInstitution) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-institutions/${kemrInstitution.id}`,
      }).then(() => {
        kemrInstitution = undefined;
      });
    }
  });

  it('KemrInstitutions menu should load KemrInstitutions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-institution');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrInstitution').should('exist');
    cy.url().should('match', kemrInstitutionPageUrlPattern);
  });

  describe('KemrInstitution page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrInstitutionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrInstitution page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-institution/new$'));
        cy.getEntityCreateUpdateHeading('KemrInstitution');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrInstitutionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-institutions',
          body: kemrInstitutionSample,
        }).then(({ body }) => {
          kemrInstitution = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-institutions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrInstitution],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrInstitutionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrInstitution page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrInstitution');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrInstitutionPageUrlPattern);
      });

      it('edit button click should load edit KemrInstitution page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrInstitution');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrInstitutionPageUrlPattern);
      });

      it('edit button click should load edit KemrInstitution page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrInstitution');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrInstitutionPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrInstitution', () => {
        cy.intercept('GET', '/api/kemr-institutions/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrInstitution').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrInstitutionPageUrlPattern);

        kemrInstitution = undefined;
      });
    });
  });

  describe('new KemrInstitution page', () => {
    beforeEach(() => {
      cy.visit(`${kemrInstitutionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrInstitution');
    });

    it('should create an instance of KemrInstitution', () => {
      cy.get(`[data-cy="kemrInstitutionId"]`).type('generate bypassing c').should('have.value', 'generate bypassing c');

      cy.get(`[data-cy="kemrInstitutionPassword"]`).type('Bedfordshire').should('have.value', 'Bedfordshire');

      cy.get(`[data-cy="kemrInstitutionName"]`).type('visionary Triple-buf').should('have.value', 'visionary Triple-buf');

      cy.get(`[data-cy="kemrInstitutionDepartment"]`).type('Cambridges').should('have.value', 'Cambridges');

      cy.get(`[data-cy="kemrInstitutionPosition"]`).type('vertical R').should('have.value', 'vertical R');

      cy.get(`[data-cy="kemrInstitutionManager"]`).type('Sausages').should('have.value', 'Sausages');

      cy.get(`[data-cy="kemrInstitutionCellphone"]`).type('Loan XML').should('have.value', 'Loan XML');

      cy.get(`[data-cy="kemrInstitutionEmail"]`).type('읍 Human ADP').should('have.value', '읍 Human ADP');

      cy.get(`[data-cy="kemrInstitutionWebsite"]`).type('navigating Future 동').should('have.value', 'navigating Future 동');

      cy.get(`[data-cy="kemrInstitutionAgree"]`).type('2022-08-31T08:54').blur().should('have.value', '2022-08-31T08:54');

      cy.get(`[data-cy="kemrInstitutionStatus"]`).type('M').should('have.value', 'M');

      cy.get(`[data-cy="kemrInstitutionModification"]`).type('2022-08-30T12:30').blur().should('have.value', '2022-08-30T12:30');

      cy.get(`[data-cy="kemrInstitutionWithdrawal"]`).type('2022-08-30T17:21').blur().should('have.value', '2022-08-30T17:21');

      cy.get(`[data-cy="kemrInstitutionLandline"]`).type('Associate calculatin').should('have.value', 'Associate calculatin');

      cy.get(`[data-cy="kemrInstitutionFail"]`).type('7040').should('have.value', '7040');

      cy.get(`[data-cy="kemrInstitutionFailtime"]`).type('2022-08-30T11:33').blur().should('have.value', '2022-08-30T11:33');

      cy.get(`[data-cy="kemrInstitutionNumber"]`).type('Concrete C').should('have.value', 'Concrete C');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrInstitution = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrInstitutionPageUrlPattern);
    });
  });
});
