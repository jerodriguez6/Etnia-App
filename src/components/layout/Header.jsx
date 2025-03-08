import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/images/sv.png';
import ethereumLogo from '../../assets/images/eth-logo.png';
import polygonLogo from '../../assets/images/polygon-logo.png';
import bscLogo from '../../assets/images/bnb-logo.png';
import { ethers } from 'ethers';

// Componentes estilizados
const HeaderStyled = styled(motion.header)`
  background: ${props => props.theme.background};
  padding: 1rem 2rem;
  color: ${props => props.theme.text};
  box-shadow: var(--shadow-light);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
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
  gap: 0.8rem;
`;

const LogoText = styled(motion.span)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  text-shadow: 0 0 10px rgba(255, 64, 255, 0.4);
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    right: 2rem;
    background: var(--background-light);
    box-shadow: var(--shadow-light);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    z-index: 1001;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid var(--primary-color);
    min-width: 200px;
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

const ConnectButton = styled(motion.button)`
  background: var(--primary-color);
  color: ${props => props.theme.text};
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 0 8px rgba(255, 64, 255, 0.4);
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: var(--secondary-color);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileConnectButton = styled(ConnectButton)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    text-align: center;
  }
`;

const ConnectedText = styled(motion.span)`
  color: ${props => props.theme.text};
  font-weight: 600;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WalletContainer = styled.div`
  position: relative;
`;

const WalletButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gray-light);
  color: ${props => props.theme.text};
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
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

const WalletIcon = styled.span`
  font-size: 1.2rem;
`;

const WalletDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--background-light);
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  z-index: 1002;
  padding: 0.5rem;
  min-width: 150px;
`;

const DisconnectButton = styled.button`
  background: transparent;
  color: ${props => props.theme.text};
  border: none;
  padding: 0.5rem;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

const MobileWalletButton = styled(WalletButton)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: center;
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

const MobileThemeToggle = styled(ThemeToggle)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    text-align: center;
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
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: var(--primary-color);
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
  border: 1px solid var(--primary-color);
`;

const NetworkOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
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

const WalletModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

const WalletModalContent = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  width: 300px;
  text-align: center;
  border: 1px solid var(--primary-color);
`;

const WalletOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary-color);
  }
`;

const WalletLogo = styled.img`
  width: 25px;
  height: 25px;
`;

// Animaciones
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
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
};

const dropdownVariants = {
  hidden: { opacity: 0, scaleY: 0, transformOrigin: 'top' },
  visible: { opacity: 1, scaleY: 1, transition: { duration: 0.2, ease: 'easeOut' } },
};

function Header() {
  const [walletStatus, setWalletStatus] = useState('disconnected');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const location = useLocation();
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const connectWallet = async (walletType) => {
    try {
      let provider;
      if (walletType === 'MetaMask' && window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
      } else if (walletType === 'Coinbase' && window.ethereum?.isCoinbaseWallet) {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
      } else {
        alert('Wallet not detected or not supported.');
        return;
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setWalletStatus('connected');
      setIsWalletModalOpen(false);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setWalletStatus('error');
      setIsWalletModalOpen(false);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const disconnectWallet = () => {
    setWalletStatus('disconnected');
    setWalletAddress(null);
    setIsWalletDropdownOpen(false);
  };

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const toggleWalletDropdown = () => {
    setIsWalletDropdownOpen(!isWalletDropdownOpen);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setWalletStatus('disconnected');
          setWalletAddress(null);
        } else {
          setWalletAddress(accounts[0]);
          setWalletStatus('connected');
        }
      });
    }
  }, []);

  return (
    <>
      <HeaderStyled
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        theme={theme}
      >
        <Nav>
          <LogoContainer
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Link to="/">
              <img src={logo} alt="ETNIA Launchpad" style={{ height: '50px', filter: 'drop-shadow(var(--glow-effect)) brightness(1.2)' }} />
            </Link>
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
            <BlockchainLogo
              src={selectedNetwork?.logo || ethereumLogo}
              alt="Blockchain Network"
              onClick={() => setIsModalOpen(true)}
            />
            {walletStatus === 'connected' ? (
              <WalletContainer>
                <WalletButton
                  onClick={toggleWalletDropdown}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  theme={theme}
                >
                  <WalletIcon>👛</WalletIcon>
                  <span>{`${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`}</span>
                </WalletButton>
                <AnimatePresence>
                  {isWalletDropdownOpen && (
                    <WalletDropdown
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      theme={theme}
                    >
                      <DisconnectButton onClick={disconnectWallet} theme={theme}>
                        Disconnect
                      </DisconnectButton>
                    </WalletDropdown>
                  )}
                </AnimatePresence>
              </WalletContainer>
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
              whileTap={{ scale: 0.95}}
              data-tooltip-id="nav-tooltip"
              data-tooltip-content={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              theme={theme}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </ThemeToggle>
          </NavLinks>
          <HamburgerButton
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? '✖' : '☰'}
          </HamburgerButton>
        </Nav>
        <MobileMenu
          variants={mobileMenuVariants}
          initial="hidden"
          animate={isMenuOpen ? 'visible' : 'hidden'}
          theme={theme}
          isOpen={isMenuOpen}
        >
          <StyledLink to="/" onClick={toggleMenu} theme={theme}>
            Home
          </StyledLink>
          <StyledLink to="/launchpads" onClick={toggleMenu} theme={theme}>
            Launchpad List
          </StyledLink>
          <StyledLink to="/create" onClick={toggleMenu} theme={theme}>
            Create a Sale
          </StyledLink>
          {walletStatus === 'connected' ? (
            <WalletContainer>
              <MobileWalletButton
                onClick={toggleWalletDropdown}
                theme={theme}
              >
                <WalletIcon>👛</WalletIcon>
                <span>{`${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`}</span>
              </MobileWalletButton>
              <AnimatePresence>
                {isWalletDropdownOpen && (
                  <WalletDropdown
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    theme={theme}
                  >
                    <DisconnectButton onClick={disconnectWallet} theme={theme}>
                      Disconnect
                    </DisconnectButton>
                  </WalletDropdown>
                )}
              </AnimatePresence>
            </WalletContainer>
          ) : walletStatus === 'error' ? (
            <ConnectedText
              theme={theme}
              style={{ color: 'var(--secondary-color)' }}
            >
              Connection Failed
            </ConnectedText>
          ) : walletStatus === 'connecting' ? (
            <ConnectedText theme={theme}>
              Connecting...
            </ConnectedText>
          ) : (
            <MobileConnectButton
              onClick={handleConnectWallet}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              theme={theme}
            >
              Connect Wallet
            </MobileConnectButton>
          )}
          <MobileThemeToggle
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            theme={theme}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </MobileThemeToggle>
        </MobileMenu>
      </HeaderStyled>
      <Tooltip id="nav-tooltip" place="bottom" effect="solid" />

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

      {isWalletModalOpen && (
        <WalletModalOverlay onClick={() => setIsWalletModalOpen(false)}>
          <WalletModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
            <h3>Connect Wallet</h3>
            <WalletOption onClick={() => connectWallet('MetaMask')}>
              <WalletLogo src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask Logo" />
              <span>MetaMask</span>
            </WalletOption>
            <WalletOption onClick={() => connectWallet('Coinbase')}>
              <WalletLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Coinbase_Icon.png/915px-Coinbase_Icon.png" alt="Coinbase Wallet Logo" />
              <span>Coinbase Wallet</span>
            </WalletOption>
            <button
              onClick={() => setIsWalletModalOpen(false)}
              style={{
                marginTop: '1rem',
                background: 'transparent',
                border: '1px solid var(--primary-color)',
                color: props => props.theme.text,
                padding: '0.5rem 1rem',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </WalletModalContent>
        </WalletModalOverlay>
      )}
    </>
  );
}

export default Header;