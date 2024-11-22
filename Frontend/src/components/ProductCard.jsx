import '../Styles/productcard.css';
import etiquetaIcono from '../assets/etiqueta.png';
import pesoIcono from '../assets/escala-de-peso.png';
import cantidadIcono from '../assets/cajas.png';

function ProductCard({ producto,addToCart }) {


  return (
    <div className="product-card">
      <img
        src={producto.foto}
        alt={producto.nombre}
        className="product-image"
      />
      <div className="product-info">
        <div className='container-product-name-price'>
          <h3 className="product-name">{producto.nombre}</h3>
          <p className="product-price">${producto.precio}</p>
        </div>
        <div className='container-more-info'>
          <p>Descripción:</p>
          <div>
            <p className="product-description">{producto.descripcion}</p>
          </div>
          <div className='container-info-product-details'>
            <p><img src={etiquetaIcono} alt="etiqueta" />:{' '}{producto.categoria}</p>
            <p><img src={pesoIcono} alt="peso" />:{' '}{producto.unidadDeMedida}</p>
            <p><img src={cantidadIcono} alt="" />:{' '}{producto.cantidad}</p>
          </div>
        </div>

        <button className='product-button-add-to-cart'
          onClick={() => addToCart(producto) }
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
