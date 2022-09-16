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

describe('KemrPatient e2e test', () => {
  const kemrPatientPageUrl = '/kemr-patient';
  const kemrPatientPageUrlPattern = new RegExp('/kemr-patient(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrPatientSample = {
    kemrPatientName: 'Avon Berks',
    kemrPatientSex: 'C',
    kemrPatientBirthday: '2022-08-30',
    kemrPatientRegistrationDate: '2022-08-31T05:47:58.962Z',
    kemrPatientSocialSeurityNo: 'robust Practical',
    kemrPatientQualificationCheck: '면',
  };

  let kemrPatient;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-patients+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-patients').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-patients/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrPatient) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-patients/${kemrPatient.id}`,
      }).then(() => {
        kemrPatient = undefined;
      });
    }
  });

  it('KemrPatients menu should load KemrPatients page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-patient');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrPatient').should('exist');
    cy.url().should('match', kemrPatientPageUrlPattern);
  });

  describe('KemrPatient page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrPatientPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrPatient page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-patient/new$'));
        cy.getEntityCreateUpdateHeading('KemrPatient');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPatientPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-patients',
          body: kemrPatientSample,
        }).then(({ body }) => {
          kemrPatient = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-patients+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrPatient],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrPatientPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrPatient page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrPatient');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPatientPageUrlPattern);
      });

      it('edit button click should load edit KemrPatient page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrPatient');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPatientPageUrlPattern);
      });

      it('edit button click should load edit KemrPatient page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrPatient');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPatientPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrPatient', () => {
        cy.intercept('GET', '/api/kemr-patients/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrPatient').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrPatientPageUrlPattern);

        kemrPatient = undefined;
      });
    });
  });

  describe('new KemrPatient page', () => {
    beforeEach(() => {
      cy.visit(`${kemrPatientPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrPatient');
    });

    it('should create an instance of KemrPatient', () => {
      cy.get(`[data-cy="kemrPatientName"]`).type('Clothing').should('have.value', 'Clothing');

      cy.get(`[data-cy="kemrPatientSex"]`).type('C').should('have.value', 'C');

      cy.get(`[data-cy="kemrPatientBirthday"]`).type('2022-08-30').blur().should('have.value', '2022-08-30');

      cy.get(`[data-cy="kemrPatientRegistrationDate"]`).type('2022-08-30T13:13').blur().should('have.value', '2022-08-30T13:13');

      cy.get(`[data-cy="kemrPatientSocialSeurityNo"]`).type('Buckinghamshire').should('have.value', 'Buckinghamshire');

      cy.get(`[data-cy="kemrPatientQualificationCheck"]`).type('W').should('have.value', 'W');

      cy.get(`[data-cy="kemrPatientAddress"]`).type('Mali Steel').should('have.value', 'Mali Steel');

      cy.get(`[data-cy="kemrPatientNurseMemo"]`).type('Iceland 부산').should('have.value', 'Iceland 부산');

      cy.get(`[data-cy="kemrPatientCellphone"]`).type('knowledge grey Re-en').should('have.value', 'knowledge grey Re-en');

      cy.get(`[data-cy="kemrPatientLandline"]`).type('Dynamic Rubber').should('have.value', 'Dynamic Rubber');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrPatient = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrPatientPageUrlPattern);
    });
  });
});
