Cypress.Commands.add('loginYRedirigeA', (rutaRelativa = '/') => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/usuarios/registro',
      failOnStatusCode: false,
      body: {
        nombreUsuario: 'campesino123',
        correoElectronico: 'campesino@correo.com',
        contrasenia: 'Test1234@',
        tipoUsuario: 'campesino',
        terminosYCondiciones: true
      }
    }).then(() => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/usuarios/login',
        body: {
          nombreUsuario: 'campesino123',
          contrasenia: 'Test1234@'
        }
      }).then((response) => {
        const token = response.body.token;
        cy.visit(rutaRelativa, {
          onBeforeLoad(win) {
            win.localStorage.setItem("token", token);
          }
        });
      });
    });
  });
  
  Cypress.Commands.add('loginClienteYRedirigeA', (rutaRelativa = '/') => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/usuarios/registro',
      failOnStatusCode: false,
      body: {
        nombreUsuario: 'cliente123',
        correoElectronico: 'cliente@correo.com',
        contrasenia: 'Test1234@',
        tipoUsuario: 'cliente',
        terminosYCondiciones: true
      }
    }).then(() => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/usuarios/login',
        body: {
          nombreUsuario: 'cliente123',
          contrasenia: 'Test1234@'
        }
      }).then((response) => {
        const token = response.body.token;
        cy.visit(rutaRelativa, {
          onBeforeLoad(win) {
            win.localStorage.setItem("token", token);
          }
        });
      });
    });
  });
  