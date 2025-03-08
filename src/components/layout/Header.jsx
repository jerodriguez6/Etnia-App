// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import { useTheme } from '../../context/ThemeContext'; // Ruta correcta
import logo from '../../assets/images/sv.png'; // Ajusta según el nombre real de tu logo
import ethereumLogo from '../../assets/images/eth-logo.png'; // Ícono de Ethereum (agrega otros logos según necesites)
import polygonLogo from '../../assets/images/polygon-logo.png'; // Ícono de Polygon
import bscLogo from '../../assets/images/bnb-logo.png'; // Ícono de Binance Smart Chain

const HeaderStyled = styled(motion.header)`
  background: ${props => props.theme.background};
  padding: 1rem 2rem;
  color: ${props => props.theme.text};
  box-shadow: var(--shadow-light);
  position: fixed; /* Fijar el encabezado */
  top: 0; /* Posicionar en la parte superior */
  left: 0; /* Alinear a la izquierda */
  width: 100%; /* Ocupar todo el ancho de la pantalla */
  z-index: 1000; /* Asegurar que esté por encima de otros elementos */
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem; // Espacio entre el logo y el texto
`;

const LogoText = styled(motion.span)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  text-shadow: 0 0 10px rgba(255, 64, 255, 0.4);
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: var(--primary-color);
    text-shadow: var(--glow-effect);
  }
`;

const ConnectButton = styled(motion.button)`
  background: var(--primary-color);
  color: ${props => props.theme.text};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background: var(--secondary-color);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
    transform: translateY(-2px);
  }
`;

const ConnectedText = styled(motion.span)`
  color: ${props => props.theme.text};
  font-weight: 600;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
`;

const ThemeToggle = styled(motion.button)`
  background: var(--primary-color);
  color: ${props => props.theme.text};
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background: var(--secondary-color);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
    transform: translateY(-2px);
  }
`;

const BlockchainLogo = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 1rem;
  filter: drop-shadow(var(--glow-effect));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  width: 300px;
  text-align: center;
`;

const NetworkOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-color);
  }
`;

const NetworkLogo = styled.img`
  width: 25px;
  height: 25px;
`;

// Definiciones de las animaciones
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const navItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

function Header() {
  const [walletStatus, setWalletStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected', 'error'
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [selectedNetwork, setSelectedNetwork] = useState(null); // Red seleccionada
  const location = useLocation();
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleConnectWallet = async () => {
    setWalletStatus('connecting');
    try {
      // Simulación de conexión de wallet (puedes reemplazar con wagmi/web3-react)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula demora
      setWalletStatus('connected');
      alert('Wallet connected successfully!');
    } catch (error) {
      setWalletStatus('error');
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const networks = [
    { name: 'Ethereum', logo: ethereumLogo },
    { name: 'Polygon', logo: polygonLogo },
    { name: 'Binance Smart Chain', logo: bscLogo },
  ];

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setIsModalOpen(false);
    alert(`Selected network: ${network.name}`);
  };

  return (
    <>
      <HeaderStyled
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        theme={theme}
      >
        <Nav>
          {/* Contenedor del logo y el texto */}
          <LogoContainer
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="ETNIA Launchpad" style={{ height: '50px', filter: 'drop-shadow(var(--glow-effect)) brightness(1.2)' }} />
            </Link>
            {/* Texto ETNIA */}
            <LogoText variants={logoVariants}>ETNIA</LogoText>
          </LogoContainer>
          <NavLinks
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <StyledLink to="/" data-tooltip-id="nav-tooltip" data-tooltip-content="Go to Home" theme={theme}>
              Home
            </StyledLink>
            <StyledLink to="/launchpads" data-tooltip-id="nav-tooltip" data-tooltip-content="View Launchpads" theme={theme}>
              Launchpad List
            </StyledLink>
            <StyledLink to="/create" data-tooltip-id="nav-tooltip" data-tooltip-content="Create a New Pool" theme={theme}>
              Create a Sale
            </StyledLink>
            {/* Ícono de red blockchain */}
            <BlockchainLogo
              src={selectedNetwork?.logo || ethereumLogo} // Muestra la red seleccionada o Ethereum por defecto
              alt="Blockchain Network"
              onClick={() => setIsModalOpen(true)}
            />
            {walletStatus === 'connected' ? (
              <ConnectedText
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                theme={theme}
              >
                Connected
              </ConnectedText>
            ) : walletStatus === 'error' ? (
              <ConnectedText
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                theme={theme}
                style={{ color: 'var(--secondary-color)' }}
              >
                Connection Failed
              </ConnectedText>
            ) : walletStatus === 'connecting' ? (
              <ConnectedText
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                theme={theme}
              >
                Connecting...
              </ConnectedText>
            ) : (
              <ConnectButton
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConnectWallet}
                data-tooltip-id="nav-tooltip"
                data-tooltip-content="Connect Your Wallet"
                theme={theme}
              >
                Connect Wallet
              </ConnectButton>
            )}
            <ThemeToggle
              onClick={toggleTheme}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-tooltip-id="nav-tooltip"
              data-tooltip-content={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              theme={theme}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </ThemeToggle>
          </NavLinks>
        </Nav>
      </HeaderStyled>
      <Tooltip id="nav-tooltip" place="bottom" effect="solid" />

      {/* Modal para seleccionar redes */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
            <h3>Select Network</h3>
            {networks.map((network, index) => (
              <NetworkOption key={index} onClick={() => handleNetworkSelect(network)}>
                <NetworkLogo src={network.logo} alt={`${network.name} Logo`} />
                <span>{network.name}</span>
              </NetworkOption>
            ))}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

export default Header;