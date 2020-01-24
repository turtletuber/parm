const storyRoute = '/iframe.html?id=useviewportsize--default';
describe('react-use-viewport-size', () => {
  
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit(storyRoute);
  });
 
  it('should display viewport dimensions', () => {
    cy.get('.app').contains('1024px / 768px');
    cy.get('.app').toMatchImageSnapshot();
  });
});