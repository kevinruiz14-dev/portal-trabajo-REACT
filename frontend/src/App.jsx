import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '2rem' }}>
        <Routes>
          <Route path="/" element={
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginTop: '4rem' }}>
              <h2>Home en Construcción</h2>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Aquí irá el buscador principal.</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;