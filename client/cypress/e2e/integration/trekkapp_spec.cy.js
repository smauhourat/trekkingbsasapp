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
    cy.login({ email: 'caca@caca.com', password: 'caca' })

    cy.contains('Ingrese a su cuenta')
  })

  it('user can login', () => {
    cy.login({ email: 'santiago.mauhourat@gmail.com', password: '123123' })

    // Verify the app redirected you to the homepage
    cy.wait(3000)
    cy.url().should('eq', Cypress.env('baseUrl') + '/')
    cy.contains('Dashboard')
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      cy.login({ email: 'santiago.mauhourat@gmail.com', password: '123123' })

      // Verify the app redirected you to the homepage
      cy.wait(3000)
      cy.url().should('eq', Cypress.env('baseUrl') + '/')
      cy.contains('Dashboard')
      //cy.visit(Cypress.env('baseUrl') + '/dashrouter')
      cy.get('#test_toDash').click()
    })

    it('a new trip can be created', () => {
      cy.contains('Agregar Evento')
    })

    it('a new user can be created', () => {
      cy.contains('Agregar Usuario')
    })

    it('a new bank account can be created', () => {
      cy.contains('Agregar Cuenta Banco')
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


    it('a new user go back', () => {
      cy.contains('Agregar Usuario').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/add-user'
        )
      })
      cy.contains('Crear Usuario')
      cy.get('.btn-secondary').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/dashboard'
        )
      })
    })    

    it('a new user added', () => {
      cy.contains('Agregar Usuario').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/add-user'
        )
      })
      cy.contains('Crear Usuario')
    })


    it('a new account go back', () => {
      cy.contains('Agregar Cuenta Banco').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/add-account'
        )
      })
      cy.contains('Crear Cuenta')
      cy.get('.btn-secondary').click()
      cy.location().should((loc) => {
        expect(loc.toString()).to.eq(
          Cypress.env('baseUrl') + '/dashboard'
        )
      })
    })

    // it('a new account added', () => {
    //   cy.contains('Agregar Cuenta Banco').click()
    //   cy.location().should((loc) => {
    //     expect(loc.toString()).to.eq(
    //       Cypress.env('baseUrl') + '/add-account'
    //     )
    //   })
    //   cy.contains('Crear Cuenta')
    //   cy.get('[placeholder="Banco"]').type('Test Banco')
    //   cy.get('[placeholder="Nro Cuenta"]').type('Test Nro Cuenta')
    //   cy.get('[placeholder="Moneda"]').type('Test Moneda')
    //   cy.get('[placeholder="Tipo Cuenta"]').type('Test Tipo Cuenta')
    //   cy.get('[placeholder="CBU"]').type('Test CBU')
    //   cy.get('[placeholder="Alias"]').type('Test Alias')

    //   cy.get('#form-account-submit-button').click()

    //   cy.location().should((loc) => {
    //     expect(loc.toString()).to.eq(
    //       Cypress.env('baseUrl') + '/dashboard'
    //     )
    //   })      
    // })

    it('account added found in list', () => {
      cy.contains('Test Banco')
    })

    it('edit account added', () => {
      console.log(cy.get('#test_table_accounts'))
    })


  })
})
