// src/App.js
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { Particles } from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import Home from './pages/Home';
import Launchpad from './pages/Launchpad';
import Create from './pages/Create';
import PoolDetail from './pages/PoolDetail'; // Verifica que esta importación sea correcta
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Estilos para el contenedor principal
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
  margin-top: 80px; /* Espacio entre el Header y el contenido */
  padding: 0 rem; /* Relleno horizontal opcional */

  @media (max-width: 768px) {
    margin-top: 80px; /* Ajusta el espacio en pantallas más pequeñas */
    padding: 1rem;
  }

  @media (max-width: 480px) {
    margin-top: 60px; /* Ajusta el espacio en pantallas móviles */
    padding: 0.5rem;
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;

  @media (max-width: 768px) {
    height: 80vh;
  }

  @media (max-width: 480px) {
    height: 70vh;
  }
`;

const PageTransition = styled(CSSTransition)`
  &.page-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  &.page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
  }
  &.page-exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.page-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
  }
`;

const LoadingFallback = () => (
  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dark)' }}>
    Loading...
  </div>
);

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ background: 'var(--background-light)', padding: '2rem', textAlign: 'center', zIndex: 1000 }}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary} style={{ background: 'var(--primary-color)', color: 'var(--text-light)', padding: '0.8rem 1.5rem', border: 'none', borderRadius: 'var(--border-radius)', cursor: 'pointer' }}>
        Try again
      </button>
    </div>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <PageTransition
        key={location.pathname}
        classNames="page"
        timeout={500}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/launchpads" element={<Launchpad />} />
            <Route path="/create" element={<Create />} />
            <Route path="/pools/:id" element={<PoolDetail />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </TransitionGroup>
  );
};

function App() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <ThemeProvider>
      <Router>
        <AppContainer>
          <ParticlesContainer>
            <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                background: { color: { value: 'transparent' } },
                fpsLimit: 120,
                interactivity: {
                  events: { onHover: { enable: false, mode: 'repulse' }, onClick: { enable: false, mode: 'push' } },
                },
                particles: {
                  color: { value: ['#ff40ff', '#00ffff'] },
                  links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.5, width: 1 },
                  move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 2, straight: false },
                  number: { density: { enable: true, area: 800 }, value: 80 },
                  opacity: { value: 0.5 },
                  shape: { type: 'circle' },
                  size: { value: { min: 1, max: 5 } },
                },
                detectRetina: true,
              }}
            />
          </ParticlesContainer>
          <Header />
          <MainContent>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AnimatedRoutes />
            </ErrorBoundary>
          </MainContent>
          <Footer />
          <Tooltip id="pool-tooltip" place="bottom" effect="solid" />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;