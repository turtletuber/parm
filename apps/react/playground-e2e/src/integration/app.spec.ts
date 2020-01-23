const getOptions = { timeout: 10000 };
describe('react-playground', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit('/?path=/story/useviewportsize--default');
  });
 
  it('should display viewport dimensions', () => {
    cy.get('#element', getOptions).contains('1024px / 768px');
  });

  it('should react to viewport dimensions changes', () => {
    cy.viewport(1023, 769);
    cy.get('#element', getOptions).contains('1023px / 768px');
  });
});