/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("/");
});

context("[SMOKE]", () => {
  it("displays the correct title", () => {
    cy.get('[data-testid="header"]').contains("Disposable email service");
  });

  it("displays loading spinner for address container", () => {
    cy.get('[data-testid="loading-spinner"]').should("not.be.undefined");
  });
});

context("[FUNCTIONAL]", () => {
  it("should generate a random address", () => {
    cy.get('[data-testid="loading-spinner"]').as("Loading");
    cy.get("@Loading").should("not.exist");

    cy.get('[data-testid="email-address"]').should("contain", /^\S+@\S+\.\S+$/);
  });
});
