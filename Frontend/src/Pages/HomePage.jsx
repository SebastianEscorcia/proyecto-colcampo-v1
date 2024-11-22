import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductList from '../components/ProductsList'
function HomePage({addToCart,cart}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar cart={cart}/>
      <div className="flex-grow">
          <ProductList addToCart={addToCart}/>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
