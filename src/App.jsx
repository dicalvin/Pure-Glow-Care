import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SiteProvider } from './contexts/SiteContext';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import Admin from './pages/Admin';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <SiteProvider>
      <div className="app-wrapper">
        <div className="app-bg" aria-hidden>
          <AnimatedBackground intensity={0.45} />
        </div>
        <Navbar />
        <main className="app-main">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </SiteProvider>
  );
}

export default App;
