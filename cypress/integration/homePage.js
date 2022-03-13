describe("Renders the home page", () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

  it("Renders correctly", () => {
      cy.findByText("Register User").should("exist")
  });

  it("routes to a team's page", () => {
    
  })
});
