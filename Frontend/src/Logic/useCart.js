import { useState,useEffect } from "react"
export const useCart = ()=>{
	const initialCart = () => {
		const localStorageCart = localStorage.getItem('cart')
		return localStorageCart ? JSON.parse(localStorageCart) : []
	}
	const [cart, setCart] = useState(initialCart)
	
	  // Guardar el carrito en el localStorage cada vez que cambie
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])
	console.log(cart)
	  //funciona de añadir al carrito
	function addToCart(item) {
		const itemExists = cart.findIndex(guitar => guitar.id === item.id)
		if(itemExists >= 0 ) { // existe en el carrito
			if(cart[itemExists].quantity >= cart[itemExists].cantidad) return
			const updatedCart = [...cart]
			updatedCart[itemExists].quantity++
			setCart(updatedCart)
		} else {
			const newItem  = {...item, quantity : 1}
			setCart([...cart, newItem])
		}
	}
	function removeFromCart(id) {
		setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
	}
	
	function decreaseQuantity(id) {
		const updatedCart = cart.map( item => {
			if(item.id === id && item.quantity > 1) {
				return {
					...item,
					quantity: item.quantity - 1
				}
			}
			return item
		})
		setCart(updatedCart)
	}
	
	function increaseQuantity(id) {
		const updatedCart = cart.map( item => {
			if(item.id === id && item.quantity < item.cantidad) {
				return {
					...item,
					quantity: item.quantity + 1
				}
			}
			return item
		})
		setCart(updatedCart)
	}
	return {
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,        
    }
}

