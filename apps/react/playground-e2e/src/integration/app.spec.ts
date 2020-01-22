describe('react-playground', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit('/');
  });
 
  it('should display viewport dimensions', () => {
    cy.get('.app').contains('1024px / 768px');
  });
});