describe('quiz app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('quiz settings', () => {
    it('can select the number of questions', () => {
      cy.get('[data-cy=number-of-questions-select]').select('20').should('have.value', '20')
    })

    it('can select the category', () => {
      cy.get('[data-cy=category-select]')
        .select('General Knowledge')
        .should('have.value', 'General Knowledge')
    })

    it('can select the difficulty', () => {
      cy.get('[data-cy=difficulty-select]').select('Easy').should('have.value', 'easy')
    })
  })
})
