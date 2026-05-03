describe('Login', () => {

  beforeEach(() => {
    cy.startDesktop()
    cy.submitLogin('papito@webdojo.com', 'katana123')
  })

  it('Deve logar com sucesso', () => {



    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

  })

  it('Não deve logar com e-mail não cadastrado', () => {
    cy.startDesktop()

    cy.submitLogin('papo@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it('Não deve logar com senha não cadastrado', () => {
    cy.startDesktop()

    cy.submitLogin('papito@webdojo.com', 'katana3')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it('Deve logar com sucesso no Mobile', () => {

    cy.startMobile()

    cy.submitLogin('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

  })

})