declare namespace Cypress {
  interface Chainable<Subject> {
    toMatchImageSnapshot(): void;
  }
}