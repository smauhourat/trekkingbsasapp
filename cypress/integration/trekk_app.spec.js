describe('Trekk App', () => {
    it('frontend can be opened', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Buenos Aires')
    });
});