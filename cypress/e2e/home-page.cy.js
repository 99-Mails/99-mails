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

context("[REGRESSION]", () => {
  it("should be able to reset the session", () => {
    cy.get("[data-testid='reset-session-btn']").as("Reset");

    cy.get("@Reset").should("exist").click();
    cy.get('[data-testid="loading-spinner"]').as("Loading");

    cy.get("@Loading").should("not.exist");
    cy.get('[data-testid="email-address"]').should("contain", /^\S+@\S+\.\S+$/);
  });

  it("should be able to delete address", () => {
    cy.get('[data-testid="email-address"]').should("contain", /^\S+@\S+\.\S+$/);

    cy.get("[data-testid='delete-address']").as("Delete");
    cy.get("@Delete").should("exist").click();

    cy.get("[data-testid='alert-dialog-accept']").should("exist").as("Delete");
    cy.get("@Delete").click();

    cy.get('[role="alert"]').should("be.visible");

    cy.get('[data-testid="email-address"]').should("not.exist");
  });
});
