describe('Edición de Perfil - Cliente', () => {
    it('Debe permitir actualizar el perfil del cliente', () => {
      cy.loginClienteYRedirigeA('/perfil/datos');
  
      // Espera a que el título aparezca
      cy.contains('Mi perfil', { timeout: 10000 }).should('be.visible');
  
      // Campos que se pueden editar
      cy.get('input[name="nombre"]').clear().type('Luis');
      cy.get('input[name="apellido"]').clear().type('Gómez');
      cy.get('input[name="direccion"]').clear().type('Calle 98');
      cy.get('input[name="numeroDocumento"]').clear().type('1012345678');
      cy.get('input[type="file"]').selectFile('cypress/fixtures/foto.png');
  
      // Enviar el formulario
      cy.get('button[type="submit"]').click();
  
      // Validar redirección según tipo de usuario
      cy.url().should('include', '/perfil'); // o '/vender' si es campesino
    });
  });
  