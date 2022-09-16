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

describe('KemrReservation e2e test', () => {
  const kemrReservationPageUrl = '/kemr-reservation';
  const kemrReservationPageUrlPattern = new RegExp('/kemr-reservation(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const kemrReservationSample = { kemrReservationStatus: 'm', kemrReservationDate: '2022-08-30T14:48:56.406Z', kemrReservationTime: 2023 };

  let kemrReservation;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/kemr-reservations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/kemr-reservations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/kemr-reservations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (kemrReservation) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/kemr-reservations/${kemrReservation.id}`,
      }).then(() => {
        kemrReservation = undefined;
      });
    }
  });

  it('KemrReservations menu should load KemrReservations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('kemr-reservation');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('KemrReservation').should('exist');
    cy.url().should('match', kemrReservationPageUrlPattern);
  });

  describe('KemrReservation page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(kemrReservationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create KemrReservation page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/kemr-reservation/new$'));
        cy.getEntityCreateUpdateHeading('KemrReservation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrReservationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/kemr-reservations',
          body: kemrReservationSample,
        }).then(({ body }) => {
          kemrReservation = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/kemr-reservations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [kemrReservation],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(kemrReservationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details KemrReservation page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('kemrReservation');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrReservationPageUrlPattern);
      });

      it('edit button click should load edit KemrReservation page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrReservation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrReservationPageUrlPattern);
      });

      it('edit button click should load edit KemrReservation page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('KemrReservation');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrReservationPageUrlPattern);
      });

      it('last delete button click should delete instance of KemrReservation', () => {
        cy.intercept('GET', '/api/kemr-reservations/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('kemrReservation').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', kemrReservationPageUrlPattern);

        kemrReservation = undefined;
      });
    });
  });

  describe('new KemrReservation page', () => {
    beforeEach(() => {
      cy.visit(`${kemrReservationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('KemrReservation');
    });

    it('should create an instance of KemrReservation', () => {
      cy.get(`[data-cy="kemrReservationStatus"]`).type('p').should('have.value', 'p');

      cy.get(`[data-cy="kemrReservationNewPatientName"]`).type('whiteboard Ergonomic').should('have.value', 'whiteboard Ergonomic');

      cy.get(`[data-cy="kemrReservationNewPatientPhone"]`).type('applications panel B').should('have.value', 'applications panel B');

      cy.get(`[data-cy="kemrReservationDate"]`).type('2022-08-31T03:06').blur().should('have.value', '2022-08-31T03:06');

      cy.get(`[data-cy="kemrReservationTime"]`).type('93890').should('have.value', '93890');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        kemrReservation = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', kemrReservationPageUrlPattern);
    });
  });
});
