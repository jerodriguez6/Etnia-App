import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Web3 from 'web3';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaCog } from 'react-icons/fa';

// Imágenes locales
import ethLogo from '../assets/images/eth-logo.png';
import bnbLogo from '../assets/images/bnb-logo.png';
import usdtLogo from '../assets/images/usdt-logo.png';
import maticLogo from '../assets/images/matic-logo.png';
import swapImage from '../assets/images/img5.png';

// Estilos para el contenedor principal
const SwapSection = styled.div`
  display: flex;
  flex-direction: column; /* Cambiado a columna para apilar las secciones */
  align-items: center; /* Centramos todo el contenido */
  justify-content: flex-start;
  margin: 2rem auto;
  max-width: 1000px;
  gap: 2rem;
  background: #1a1a1a; /* Color del header */
  padding: 2rem;
  border-radius: var(--border-radius);
  min-height: 80vh;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const SwapContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const SwapLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 100%;
  gap: 1rem;
`;

const SwapRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 400px;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
  margin-top: 3.5rem;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const SwapImage = styled(motion.img)`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  box-shadow: var(--shadow-light);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.03);
    box-shadow: var(--shadow-hover);
  }
  @media (max-width: 768px) {
    max-height: 350px;
  }
`;

const SwapTitle = styled(motion.h1)`
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-dark);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  font-family: 'violet_sansregular', sans-serif;
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const SwapImageTitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-dark);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
  margin-top: 0.5rem;
  text-align: center;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  font-family: 'violet_sansregular', sans-serif;
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const SwapTabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
`;

const Tab = styled.button`
  background: ${(props) => (props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
  color: ${(props) => (props.active ? 'var(--text-dark)' : 'var(--text-light)')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'violet_sansregular', sans-serif;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-dark);
  }
`;

const SettingsIcon = styled(FaCog)`
  color: var(--text-light);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: var(--text-dark);
    transform: rotate(90deg);
  }
`;

const SwapContainer = styled(motion.div)`
  width: 100%;
  padding: 1rem;
  background: var(--background-light);
  color: var(--text-dark);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  text-align: center;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: calc(var(--border-radius) + 2px);
    border: 2px solid transparent;
    border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
    z-index: -1;
  }
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: var(--glow-effect);
    transform: translateY(-3px);
  }
`;

const SwapForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TokenInputContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.6rem;
  border-radius: var(--border-radius);
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TokenInputLabel = styled.label`
  font-size: 0.8rem;
  color: var(--text-light);
  opacity: 0.8;
  text-align: left;
  font-family: 'violet_sansregular', sans-serif;
`;

const TokenSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const TokenSelect = styled(motion.select)`
  width: 100%;
  padding: 0.4rem 2rem 0.4rem 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  background: transparent;
  color: var(--text-dark);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  appearance: none;
  cursor: pointer;
  font-family: 'violet_sansregular', sans-serif;
  border-image: ${(props) =>
    props.selected ? 'linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1' : 'none'};
  &:focus {
    box-shadow: var(--shadow-light);
    border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: scale(1.02);
  }
  option {
    background: rgba(26, 26, 26, 0.95);
    color: var(--text-dark);
    backdrop-filter: blur(5px);
    border: none;
    font-family: 'violet_sansregular', sans-serif;
  }
`;

const TokenLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const TokenInput = styled(motion.input)`
  padding: 0.4rem;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  background: transparent;
  color: var(--text-dark);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'violet_sansregular', sans-serif;
  &:focus {
    box-shadow: var(--shadow-light);
    border-color: var(--secondary-color);
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: scale(1.02);
  }
`;

const SwapArrowContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 40px;
  height: 40px;
  background: var(--background-light);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  margin: -20px auto;
  z-index: 1;
  border: 1px solid var(--primary-color);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const SwapArrowUp = styled(FaArrowUp)`
  font-size: 1rem;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

const SwapArrowDown = styled(FaArrowDown)`
  font-size: 1rem;
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(2px);
  }
`;

const SwapInfo = styled.div`
  margin: 0.5rem 0;
  p {
    display: flex;
    justify-content: space-between;
    margin: 0.2rem 0;
    color: var(--text-light);
    font-size: 0.75rem;
    font-family: 'violet_sansregular', sans-serif;
  }
`;

const SwapButton = styled(motion.button)`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: var(--text-dark);
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-top: 0.5rem;
  width: 100%;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-light);
  font-family: 'violet_sansregular', sans-serif;
  &:hover {
    background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-light);
  }
`;

const TransactionHistory = styled.div`
  width: 100%;
  max-width: 400px; /* Mantenemos el mismo ancho que SwapContainer */
  background: var(--background-light);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin: 0 auto; /* Centramos horizontalmente */
  box-shadow: var(--shadow-light);
  text-align: center; /* Centramos el contenido interno */
`;

const HistoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'violet_sansregular', sans-serif;
`;

const TransactionList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
`;

const TransactionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: var(--text-light);
  font-family: 'violet_sansregular', sans-serif;
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TransactionAmount = styled.span`
  color: var(--text-light);
`;

const TransactionDate = styled.span`
  font-size: 0.7rem;
  color: var(--text-light);
  opacity: 0.6;
`;

const TransactionStatus = styled.span`
  font-size: 0.75rem;
  color: ${(props) => (props.status === 'Completed' ? '#00ff00' : '#ff0000')};
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Swap() {
  const { theme } = useTheme();
  const [account, setAccount] = useState(null);
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [activeTab, setActiveTab] = useState('swap');

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', logo: ethLogo },
    { symbol: 'BNB', name: 'Binance Coin', logo: bnbLogo },
    { symbol: 'USDT', name: 'Tether', logo: usdtLogo },
    { symbol: 'MATIC', name: 'Polygon', logo: maticLogo },
  ];

  const transactionHistory = [
    {
      from: 'ETH',
      to: 'SOL',
      amount: '0.5 ETH → 12.4 SOL',
      date: 'May 14, 2025, 01:30 AM',
      status: 'Completed',
    },
    {
      from: 'BNB',
      to: 'USDT',
      amount: '1.2 BNB → 580 USDT',
      date: 'May 13, 2025, 11:45 PM',
      status: 'Completed',
    },
    {
      from: 'MATIC',
      to: 'ETH',
      amount: '100 MATIC → 0.03 ETH',
      date: 'May 13, 2025, 09:15 PM',
      status: 'Failed',
    },
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Error connecting wallet. Please try again.');
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleSwap = () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }
    if (!fromToken || !toToken || !fromAmount) {
      alert('Please fill in all fields.');
      return;
    }
    alert('Swap functionality coming soon!');
  };

  const handleSettingsClick = () => {
    alert('Settings functionality coming soon!');
  };

  const getTokenLogo = (symbol) => {
    const token = tokens.find((t) => t.symbol === symbol);
    return token ? token.logo : null;
  };

  return (
    <SwapSection theme={theme}>
      {/* Contenedor para SwapLeft y SwapRight */}
      <SwapContent>
        <SwapLeft>
          <SwapTitle
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            theme={theme}
          >
            Intercambia en Cualquier Momento
          </SwapTitle>

          <SwapTabsContainer>
            <Tabs>
              <Tab
                active={activeTab === 'swap'}
                onClick={() => setActiveTab('swap')}
              >
                Swap
              </Tab>
              <Tab
                active={activeTab === 'limit'}
                onClick={() => setActiveTab('limit')}
              >
                Limit
              </Tab>
            </Tabs>
            <SettingsIcon onClick={handleSettingsClick} />
          </SwapTabsContainer>

          <SwapContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            theme={theme}
          >
            <SwapForm>
              <TokenInputContainer>
                <TokenInputLabel>From</TokenInputLabel>
                <TokenSelectContainer>
                  <TokenSelect
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    theme={theme}
                    selected={!!fromToken}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <option value="">Select Token</option>
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.name} ({token.symbol})
                      </option>
                    ))}
                  </TokenSelect>
                  {fromToken && (
                    <TokenLogo src={getTokenLogo(fromToken)} alt={`${fromToken} logo`} />
                  )}
                </TokenSelectContainer>
                <TokenInput
                  type="number"
                  placeholder="Amount"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  theme={theme}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                />
              </TokenInputContainer>

              <SwapArrowContainer
                theme={theme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SwapArrowUp />
                <SwapArrowDown />
              </SwapArrowContainer>

              <TokenInputContainer>
                <TokenInputLabel>To</TokenInputLabel>
                <TokenSelectContainer>
                  <TokenSelect
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    theme={theme}
                    selected={!!toToken}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <option value="">Select Token</option>
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.name} ({token.symbol})
                      </option>
                    ))}
                  </TokenSelect>
                  {toToken && (
                    <TokenLogo src={getTokenLogo(toToken)} alt={`${toToken} logo`} />
                  )}
                </TokenSelectContainer>
                <TokenInput
                  type="number"
                  placeholder="Estimated Amount"
                  value={toAmount}
                  readOnly
                  theme={theme}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                />
              </TokenInputContainer>

              <SwapInfo theme={theme}>
                <p>
                  <span>Estimated Output</span>
                  <span>{toAmount || '0.00'} {toToken || 'Token'}</span>
                </p>
                <p>
                  <span>Price Impact</span>
                  <span>Coming soon</span>
                </p>
                <p>
                  <span>Slippage Tolerance</span>
                  <span>0.5%</span>
                </p>
              </SwapInfo>

              {account ? (
                <SwapButton
                  onClick={handleSwap}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Swap
                </SwapButton>
              ) : (
                <SwapButton
                  onClick={connectWallet}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect Wallet
                </SwapButton>
              )}
            </SwapForm>
          </SwapContainer>
        </SwapLeft>

        <SwapRight>
          <SwapImage
            src={swapImage}
            alt="Swap Image"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <SwapImageTitle
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            theme={theme}
          >
            Tu Puerta a las Criptomonedas
          </SwapImageTitle>
        </SwapRight>
      </SwapContent>

      {/* TransactionHistory ahora está fuera de SwapLeft */}
      <TransactionHistory>
        <HistoryTitle>Transaction History</HistoryTitle>
        <TransactionList>
          {transactionHistory.map((tx, index) => (
            <TransactionItem key={index}>
              <TransactionDetails>
                <TransactionAmount>{tx.amount}</TransactionAmount>
                <TransactionDate>{tx.date}</TransactionDate>
              </TransactionDetails>
              <TransactionStatus status={tx.status}>{tx.status}</TransactionStatus>
            </TransactionItem>
          ))}
        </TransactionList>
      </TransactionHistory>
    </SwapSection>
  );
}

export default Swap;