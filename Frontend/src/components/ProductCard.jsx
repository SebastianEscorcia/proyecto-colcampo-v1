import '../Styles/productcard.css'

function ProductCard({ producto }) {

  return (
    <div className="product-card">
      <img
        src={producto.foto}
        alt={producto.nombre}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{producto.nombre}</h3>
        <p className="product-price">${producto.precio}</p>
        <p className="product-description">{producto.descripcion}</p>
        
      </div>
    </div>
  );
}

export default ProductCard;
