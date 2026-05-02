describe('Kanban Board', () => {
    it('Deve mover uma tarefa de Todo paa Done e atualizar o board', () => {
        cy.startDesktop()
        cy.submitLogin('papito@webdojo.com', 'katana123')

        cy.contains('Kanban').click()

        cy.contains('div[draggable=true]', 'Documentar API')
    })
})