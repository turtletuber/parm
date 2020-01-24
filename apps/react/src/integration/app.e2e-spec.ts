const storyRoute = '/iframe.html?id=useviewportsize--default';
const isHeadless = Cypress.env('headless');
describe('react-playground', () => {
  
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit(storyRoute);
  });
 
  it('should display viewport dimensions', () => {
    cy.get('.app').contains('1024px / 768px');
    if (isHeadless === true) {
      console.log('its headless');
      cy.matchImageSnapshot();
    } else {
      console.log('its not headless');
    }
  });
});