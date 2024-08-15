describe('Trekk App', () => {
  it('frontend can be opened', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.contains('Buenos Aires')
  })

  it('login can be opened', () => {
    cy.visit(Cypress.env('baseUrl') + '/login')
    cy.contains('Ingrese a su cuenta')
  })

  it('user cannot login', () => {
    cy.visit(Cypress.env('baseUrl') + '/login')
    cy.get('[placeholder="Email"]').type('caca@caca.com')
    cy.get('[placeholder="Contraseña"]').type('caca')
    cy.get('#form-login-submit-button').click()
    cy.contains('Ingrese a su cuenta')
  })

  it('user can login', () => {
    cy.visit(Cypress.env('baseUrl') + '/login')
    cy.get('[placeholder="Email"]').type('santiago.mauhourat@gmail.com')
    cy.get('input[placeholder="Contraseña"]').type('123123')
    cy.get('#form-login-submit-button').click()

    // Verify the app redirected you to the homepage
    cy.location().should((loc) => {
      expect(loc.toString()).to.eq(
        Cypress.env('baseUrl') + '/dashboard'
      )
    })
    cy.contains('Dashboard')
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      cy.visit(Cypress.env('baseUrl') + '/login')
      cy.get('[placeholder="Email"]').type('santiagomauhourat@hotmail.com')
      cy.get('[placeholder="Contraseña"]').type('123123')
      cy.get('#form-login-submit-button').click()

      // Verify the app redirected you to the homepage
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/dashboard'
        )
      })
    })

    it('a new trip can be created', () => {
      cy.contains('Agregar Evento')
    })

    it('a new user can be created', () => {
      cy.contains('Agregar Usuario') // .click()
    })

    it('a new trip go back', () => {
      cy.contains('Agregar Evento').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/add-trip'
        )
      })
      cy.contains('Crear Evento')
      cy.get('.btn-secondary').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/dashboard'
        )
      })
    })

    it('a new trip added', () => {
      cy.contains('Agregar Evento').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/add-trip'
        )
      })
      cy.contains('Crear Evento')
    })
  })
})
