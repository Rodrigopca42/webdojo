describe('Formulário de Consultoria', () => {

    it('Deve solicitar consultoria individual', () => {
        cy.startDesktop()
        cy.submitLogin('papito@webdojo.com', 'katana123')

        cy.goTo('Formulário', 'Consultoria')

        cy.get('#name').type('Rodrigo Cardoso')

        cy.get('input[placeholder="Digite seu email"]').type('rodrigo@gmail.com')

        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('21985642631')
            .should('have.value', '(21) 98564-2631')

        //cy.get('#consultancyType').select('In Company')
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.get('input[placeholder="000.000.000-00"]').type('09845689305')
            .should('have.value', '098.456.893-05')


        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

        const techs = [
            'Cypress',
            'Selenium',
            'WebDriveIo'
        ]

        techs.forEach((techs) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(techs)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', techs)
                .should('be.visible')

        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário').click()

        cy.get('.modal', {timeout: 7000})
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        
    })

    it('Deve verificar os campos obrigatórios', () => {
        cy.startDesktop()
        cy.submitLogin('papito@webdojo.com', 'katana123')

        cy.goTo('Formulário', 'Consultoria')

        cy.contains('button', 'Enviar formulário').click()

        cy.contains('label', 'Nome Completo *')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')

        cy.contains('label', 'Email *')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')


        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso')
   })


})


