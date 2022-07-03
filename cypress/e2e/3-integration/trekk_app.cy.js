describe('Trekk App', () => {

    it('frontend can be opened', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Buenos Aires')
    });

    it('login can be opened', () => {
        cy.visit('http://localhost:3000/login')
        cy.contains('Ingrese a su cuenta')
    });

    it('user cannot login', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[placeholder="Email"]').type('caca@caca.com')
        cy.get('[placeholder="Contraseña"]').type('caca')
        cy.get('#form-login-submit-button').click()
        cy.contains('Ingrese a su cuenta')
    });

    it('user can login', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('[placeholder="Email"]').type('santiagomauhourat@hotmail.com')
        cy.get('[placeholder="Contraseña"]').type('123123')
        cy.get('#form-login-submit-button').click()
         
        // Verify the app redirected you to the homepage
        cy.location().should((loc) => {
            expect(loc.toString()).to.eq(
                'http://localhost:3000/dashboard'
            )
        })

        cy.contains('Dashboard')
    });    

});