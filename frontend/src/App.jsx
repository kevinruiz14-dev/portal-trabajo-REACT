import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Dashboardlayout from './layouts/Dashboardlayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SeleccionTipoRegistro from './pages/auth/SeleccionTipoRegistro';
import RegisterUsuario from './pages/auth/RegisterUsuario';
import RegisterEmpresa from "./pages/auth/RegisterEmpresa";
import DetalleEmpleo from './pages/empleo/DetalleEmpleo';
import Dashboard from './pages/usuario/Dashboard';
function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<SeleccionTipoRegistro />} />
          <Route path="/register-usuario" element={<RegisterUsuario />} />
          <Route path="/register-empresa" element={<RegisterEmpresa />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
