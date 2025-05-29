describe('Login de Usuario', () => {
    beforeEach(() => {
      // Te aseguras de que el usuario exista antes de hacer login
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/usuarios/registro',
        failOnStatusCode: false,
        body: {
          nombreUsuario: 'nuevoUsuario123',
          correoElectronico: 'nuevo@correo.com',
          contrasenia: 'Test1234@',
          tipoUsuario: 'cliente',
          terminosYCondiciones: true
        }
      });
    });
  
    it('Debe iniciar sesión correctamente', () => {
      cy.visit('/login');
  
      cy.get('input[placeholder="Nombre de usuario"]').type('nuevoUsuario123');
      cy.get('input[placeholder="Contraseña"]').type('Test1234@');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
  