import { usarProductoContext } from '../context/ProductContext';
import '../Styles/productlist.css';
import ProductCard from './ProductCard';
import { useEffect,useState } from 'react';

function ProductList({addToCart}) {
  
  
  const { productos } = usarProductoContext();
  if (!Array.isArray(productos) || productos.length === 0) {
    return <p>Cargando Productos...</p>;
  }
  
  return (
    <section className="product-list">
      {productos.map(producto => (
        <ProductCard key={producto.id} producto={producto} addToCart={addToCart}/>
      ))}
    </section>
  );
}

export default ProductList;
