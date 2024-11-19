import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductList from '../components/ProductsList'
function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
          <ProductList/>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
