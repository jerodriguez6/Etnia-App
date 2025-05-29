import { Suspense, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ThemeProvider } from './context/ThemeContext';
import { Particles } from "@tsparticles/react";
import { loadSlim } from 'tsparticles-slim';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import { ErrorBoundary } from 'react-error-boundary';

// Componentes
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Launchpad from './pages/Launchpad';
import Create from './pages/Create';
import PoolDetail from './pages/PoolDetail';
import Swap from './pages/Swap'; // Importamos el nuevo componente Swap
import Agent from './pages/Agent'; // Import the new Agent component

// Estilos para el contenedor principal
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 1;
  margin-top: 80px;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
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
  }
  &.page-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
  }
`;

const LoadingFallback = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
);

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <PageTransition key={location.pathname} classNames="page" timeout={500}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/launchpads" element={<Launchpad />} />
            <Route path="/create" element={<Create />} />
            <Route path="/pools/:id" element={<PoolDetail />} />
            <Route path="/swap" element={<Swap />} /> {/* Nueva ruta para Swap */}
            <Route path="/agent" element={<Agent />} /> {/* Add the new route */}
          </Routes>
        </Suspense>
      </PageTransition>
    </TransitionGroup>
  );
};

function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <AppContainer>
          <ParticlesContainer>
            <Particles id="tsparticles" init={particlesInit} options={{
              background: { color: { value: 'transparent' } },
              fpsLimit: 120,
              interactivity: {
                events: { onHover: { enable: false }, onClick: { enable: false } },
              },
              particles: {
                color: { value: ['#ff40ff', '#00ffff'] },
                links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.5, width: 1 },
                move: { enable: true, speed: 2 },
                number: { density: { enable: true, area: 800 }, value: 80 },
                opacity: { value: 0.5 },
                shape: { type: 'circle' },
                size: { value: { min: 1, max: 5 } },
              },
              detectRetina: true,
            }} />
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