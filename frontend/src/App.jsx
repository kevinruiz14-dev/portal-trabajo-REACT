import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Dashboardlayout from './layouts/Dashboardlayout';
import Home from './pages/Home';
import DetalleEmpleo from './pages/empleo/DetalleEmpleo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/empleo/:id" element={<DetalleEmpleo />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
        <Route path="/dashboard/*" element={
          <Dashboardlayout>
            <Routes>
              <Route path="/" element={<h2>Bienvenido al Panel</h2>} />
              <Route path="/perfil" element={<h2>Mi Perfil</h2>} />
            </Routes>
          </Dashboardlayout>
        } />
      </Routes>
    </Router>
  );
}
export default App;