import { getGreeting } from '../support/app.po';

describe('{your-app}', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to {your-app}!');
  });
});