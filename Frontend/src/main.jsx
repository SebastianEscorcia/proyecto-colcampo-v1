import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthUsuarioContext';
import { ProductoProvider } from './context/ProductContext'; // Importa tu proveedor de contexto de productos

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ProductoProvider> 
          <App />
        </ProductoProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
);
