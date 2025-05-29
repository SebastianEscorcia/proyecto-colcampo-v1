describe('Registro de Usuario', () => {
    it('Debe registrar un usuario nuevo correctamente', () => {
      cy.visit('/registro');
  
      cy.get('input[placeholder="Nombre de usuario"]').type('nuevoUsuario123');
      cy.get('select#tipoUsuario').select('cliente');
      cy.get('input[placeholder="Correo Electrónico"]').type('nuevo@correo.com');
      cy.get('input[placeholder="Contraseña"]').type('Test1234@');
      cy.get('input[placeholder="Confirmar Contraseña"]').type('Test1234@');
      cy.get('input[type="checkbox"]').check();
      cy.get('button[type="submit"]').click();
  
      cy.url().should('not.include', '/registro'); // Redirige tras éxito
    });
  });
  