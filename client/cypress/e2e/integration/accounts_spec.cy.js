describe('Trekk App - Accounts', () => {
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

        it('account added found in list', () => {
            cy.contains('Test Banco')
        })

        it('edit account added', () => {
            cy.get('#test_table_accounts tbody')
                .contains('tr', 'Test Banco')
                .then((row) => {
                    cy.wrap(row).find('button[name="test_delete_row"]').click()
                })
        })

    })
})