import Navbar from "../components/NavBar";
import FormularioRegistro from '../components/FormularioRegistro'
import Footer from '../components/Footer'

function Registro() {
  //const { register, handleSubmit } = useForm();
  return (
    <div>
      <Navbar/>
      <FormularioRegistro/>
      <Footer/>
    </div>
  );
}

export default Registro;
