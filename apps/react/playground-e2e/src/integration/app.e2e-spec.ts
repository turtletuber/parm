const storyRoute = '/iframe.html?id=useviewportsize--default';
describe('react-playground', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit(storyRoute);
  });
 
  it('should display viewport dimensions', () => {
    cy.get('.app').contains('1024px / 768px');
    cy.matchImageSnapshot();
  });

  it('should react to viewport dimensions changes', () => {
    cy.viewport(1023, 769);
    cy.get('.app').contains('1023px / 768px');
  });
});