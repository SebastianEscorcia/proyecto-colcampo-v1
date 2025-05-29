describe('Registro de Producto', () => {
    it('Debe registrar un producto correctamente', () => {
      cy.loginYRedirigeA('/vender');
  
      cy.contains('Registrar Producto', { timeout: 10000 }).should('be.visible');
  
      cy.get('input[name="nombre"]').type('Papa');
      cy.get('input[name="Descripcion"]').type('Papa criolla');
      cy.get('input[name="Precio"]').type('3000');
      cy.get('select[name="unidadDeMedida"]').select('kilogramos');
      cy.get('input[name="cantidad"]').type('10');
      cy.get('input[name="CodigoProducto"]').type('PAPA123');
      cy.get('select[name="Categoria"]').select('verduras');
      cy.get('input[type="file"]').selectFile('cypress/fixtures/foto.png');
  
      cy.get('button[type="submit"]').click();
  
      cy.on('window:alert', (msg) => {
        expect(msg).to.include('Producto registrado exitosamente');
      });
    });
  });
  