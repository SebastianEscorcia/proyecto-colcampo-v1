import { useEffect, useState } from 'react'
import '../Styles/carrito.css'
import etiquetaIcono from '../assets/etiqueta.png'
import pesoIcono from '../assets/escala-de-peso.png'
import menosIcon from '../assets/menos.png'
import masIcon from '../assets/mas-positivo-suma-simbolo-matematico.png'

export default function Carrito({decreaseQuantity,increaseQuantity,removeFromCart,cart}) {

	const [productsCart,setProductCart]=useState([])

	useEffect(() => {
		async function fetchData() {
			const products = JSON.parse(localStorage.getItem('cart'));
			setProductCart(products);
		}
		fetchData();
	}, [])

	return (
		<div className='container-cart'>
			<h2>Productos añadidos</h2>
		{cart.length === 0 ? 
			<h2>no hay productos para mostrar</h2>
		:
		cart.map((product, index) => {
			return (
				<div className='product-cart' key={index}>
					<img src={product.foto} alt="" />
					<div className='product-cart-name-price'>
						<p className="product-name">Nombre: <p>{product.nombre}</p></p>
						<p className="product-price">Precio: <p>${product.precio}</p></p>
					</div>
					<div className='product-cart-info'>
						<p><img src={etiquetaIcono} alt="etiqueta" /> :{' '}{product.categoria}</p>
						<p><img src={pesoIcono} alt="peso" /> :{' '}{product.unidadDeMedida}</p>
					</div>
					<div className='product-cart-mas-detalles'>
						<button
							onClick={()=>increaseQuantity(product.id)}
						> <img src={masIcon} alt="" /></button>
						<p>{product.quantity} {product.unidadDeMedida}</p>
						<button
							onClick={()=>decreaseQuantity(product.id)}
						> <img src={menosIcon} alt="" /></button>
					</div>
					<button className='product-delete'
						onClick={()=>removeFromCart(product.id)}
					>
						X
					</button>
				</div>	
			)
		})

		}
		</div>
	)
}
