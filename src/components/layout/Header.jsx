import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/images/sv.png';
import ethereumLogo from '../../assets/images/eth-logo.png';
import polygonLogo from '../../assets/images/polygon-logo.png';
import bscLogo from '../../assets/images/bnb-logo.png';
import {
  ThirdwebProvider,
  ConnectWallet,
  embeddedWallet,
  metamaskWallet,
  smartWallet,
} from '@thirdweb-dev/react';
import { Ethereum, Polygon, Binance } from '@thirdweb-dev/chains';

// Definición manual de Polygon Amoy (sin cambios)
const PolygonAmoy = {
  chainId: 80002,
  name: 'Polygon Amoy',
  rpc: ['https://rpc-amoy.polygon.technology/'],
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  explorers: ['https://amoy.polygonscan.com/'],
  testnet: true,
};

// Styled Components
const HeaderStyled = styled(motion.header)`
  background: ${props => props.isScrolled 
    ? `rgba(${props.theme.background.replace('rgb(', '').replace(')', '')}, 0.9)` 
    : props.theme.background}; // Restauramos el color original del tema
  padding: 1rem 2rem;
  color: ${props => props.theme.text};
  box-shadow: var(--shadow-light);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  backdrop-filter: blur(${props => props.blur}px); // Efecto borroso detrás del header
  transition: background 0.3s ease, backdrop-filter 0.3s ease; // Transición suave
`;

// Resto de los styled components sin cambios
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const LogoText = styled(motion.span)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  text-shadow: 0 0 10px rgba(255, 64, 255, 0.4);
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
  transition: color 0.3s ease, text-shadow 0.3s ease;
  display: block;
  padding: 0.5rem 0;
  text-align: center;
  &:hover {
    color: var(--primary-color);
    text-shadow: var(--glow-effect);
  }
`;

const ThemeToggle = styled(motion.button)`
  background: transparent;
  color: ${props => props.theme.text};
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 0 6px rgba(255, 64, 255, 0.3);
  transition: all 0.3s ease;
  &:hover {
    background: var(--primary-color);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
    transform: translateY(-1px);
  }
  @media (max-width: 768px) {
    display: none;
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

const HamburgerButton = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
`;

const HamburgerLine = styled(motion.span)`
  width: 2rem;
  height: 0.25rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.5), 0 0 12px rgba(255, 64, 255, 0.3);
  transition: all 0.3s ease;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  border-left: 2px solid var(--primary-color);
  box-shadow: -5px 0 15px rgba(0, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  z-index: 1000;
`;

const MobileMenuLink = styled(StyledLink)`
  font-size: 1.2rem;
  margin: 1rem 0;
  text-align: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 64, 255, 0.2);
  &:hover {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
`;

const MobileThemeToggle = styled(ThemeToggle)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    margin: 1rem 0;
  }
`;

const MobileBlockchainLogo = styled(BlockchainLogo)`
  margin: 1rem 0;
`;

// Animaciones (sin cambios)
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

const mobileMenuVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const hamburgerVariants = {
  open: { rotate: 45, y: 6 },
  closed: { rotate: 0, y: 0 },
};

const hamburgerMiddleVariants = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
};

const hamburgerBottomVariants = {
  open: { rotate: -45, y: -6 },
  closed: { rotate: 0, y: 0 },
};

// Configuración de Thirdweb (sin cambios)
const supportedChains = [Ethereum, Polygon, Binance, PolygonAmoy];
const clientId = "243d848db8bb3a11167e6b53bfc7e2d4";

const loginOptions = [
  "email",
  "google",
  "apple",
  "facebook",
];

const socialLoginOptions = [
  "google",
  "apple",
  "facebook",
];

const supportedWallets = [
  smartWallet(embeddedWallet(), {
    factoryAddress: "0x680a07eca9964a78dea68b3ecde8136e56398741",
    gasless: true,
  }),
  embeddedWallet({
    auth: {
      options: loginOptions,
    },
  }),
  metamaskWallet(),
];

// Componente principal del Header
function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Estado para detectar scroll
  const [blur, setBlur] = useState(0); // Estado para el efecto borroso
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const networks = [
    { name: 'Ethereum', logo: ethereumLogo, chainId: 1 },
    { name: 'Polygon', logo: polygonLogo, chainId: 137 },
    { name: 'Binance Smart Chain', logo: bscLogo, chainId: 56 },
    { name: 'Polygon Amoy', logo: polygonLogo, chainId: 80002 },
  ];

  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) { // Activa el efecto después de 50px de scroll
        setIsScrolled(true);
        setBlur(8); // Aplica un desenfoque de 8px
      } else {
        setIsScrolled(false);
        setBlur(0); // Sin desenfoque cuando está arriba
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Limpiar el evento
  }, []);

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setIsModalOpen(false);
    alert(`Selected network: ${network.name}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const connectWalletStyle = {
    background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
    border: '2px solid transparent',
    borderImage: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1',
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 5px rgba(0, 255, 255, 0.1)',
    color: 'white',
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    padding: '12px 24px',
    fontSize: '16px',
    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
  };

  return (
    <ThirdwebProvider
      clientId={clientId}
      supportedChains={supportedChains}
      supportedWallets={supportedWallets}
      activeChain={PolygonAmoy}
    >
      <HeaderStyled
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        theme={theme}
        isScrolled={isScrolled} // Pasamos el estado de scroll
        blur={blur} // Pasamos el valor de blur
      >
        <Nav>
          <LogoContainer
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="ETNIA Launchpad"
                style={{ height: '50px', filter: 'drop-shadow(var(--glow-effect)) brightness(1.2)' }}
              />
            </Link>
            <LogoText variants={logoVariants}>ETN-IA</LogoText>
          </LogoContainer>
          <NavLinks variants={navItemVariants} initial="hidden" animate="visible">
            <StyledLink
              to="/"
              data-tooltip-id="nav-tooltip"
              data-tooltip-content="Go to Home"
              theme={theme}
            >
              Home
            </StyledLink>
            <StyledLink
              to="/launchpads"
              data-tooltip-id="nav-tooltip"
              data-tooltip-content="View Launchpads"
              theme={theme}
            >
              Launchpad List
            </StyledLink>
            <StyledLink
              to="/create"
              data-tooltip-id="nav-tooltip"
              data-tooltip-content="Create a New Pool"
              theme={theme}
            >
              Create a Sale
            </StyledLink>
            <BlockchainLogo
              src={selectedNetwork?.logo || polygonLogo}
              alt="Blockchain Network"
              onClick={() => setIsModalOpen(true)}
            />
            <ConnectWallet
              theme="dark"
              btnTitle="Connect"
              modalSize="wide"
              auth={{
                loginOptional: false,
                socials: socialLoginOptions,
              }}
              style={connectWalletStyle}
            />
            <ThemeToggle
              onClick={toggleTheme}
              variants={navItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-tooltip-id="nav-tooltip"
              data-tooltip-content={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              theme={theme}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </ThemeToggle>
          </NavLinks>
          <HamburgerButton onClick={toggleMobileMenu}>
            <HamburgerLine
              variants={hamburgerVariants}
              animate={isMobileMenuOpen ? 'open' : 'closed'}
            />
            <HamburgerLine
              variants={hamburgerMiddleVariants}
              animate={isMobileMenuOpen ? 'open' : 'closed'}
            />
            <HamburgerLine
              variants={hamburgerBottomVariants}
              animate={isMobileMenuOpen ? 'open' : 'closed'}
            />
          </HamburgerButton>
        </Nav>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MobileMenuLink to="/" onClick={toggleMobileMenu} theme={theme}>
                Home
              </MobileMenuLink>
              <MobileMenuLink to="/launchpads" onClick={toggleMobileMenu} theme={theme}>
                Launchpad List
              </MobileMenuLink>
              <MobileMenuLink to="/create" onClick={toggleMobileMenu} theme={theme}>
                Create a Sale
              </MobileMenuLink>
              <MobileBlockchainLogo
                src={selectedNetwork?.logo || polygonLogo}
                alt="Blockchain Network"
                onClick={() => {
                  setIsModalOpen(true);
                  toggleMobileMenu();
                }}
              />
              <ConnectWallet
                theme="dark"
                btnTitle="Connect"
                modalSize="wide"
                auth={{
                  loginOptional: false,
                  socials: socialLoginOptions,
                }}
                style={connectWalletStyle}
              />
              <MobileThemeToggle
                onClick={() => {
                  toggleTheme();
                  toggleMobileMenu();
                }}
                theme={theme}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </MobileThemeToggle>
            </MobileMenu>
          )}
        </AnimatePresence>
        <Tooltip id="nav-tooltip" place="bottom" effect="solid" />
      </HeaderStyled>
    </ThirdwebProvider>
  );
}

export default Header;