import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Web3 from 'web3';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { FaCog, FaGlobe, FaTwitter, FaEthereum } from 'react-icons/fa'; // Icons for config, website, Twitter, and Etherscan

// Imágenes locales
import ethLogo from '../assets/images/eth-logo.png';
import bnbLogo from '../assets/images/bnb-logo.png';
import usdtLogo from '../assets/images/usdt-logo.png';
import maticLogo from '../assets/images/matic-logo.png';
import svLogo from '../assets/images/sv.png';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Estilos para el contenedor principal
const SwapSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
 // background: var(--background-dark);
  padding: 2rem;
  box-sizing: border-box;
`;

const SwapContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
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
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
`;

const TokenOverview = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--shadow-light);
  color: var(--text-dark);
`;

const TokenTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TokenStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatItem = styled.div`
  flex: 1;
  min-width: 150px;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: var(--text-light);
  opacity: 0.7;
`;

const StatValue = styled.div`
  font-size: 1rem;
  color: var(--text-dark);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: var(--text-light);
  font-size: 1.2rem;
  transition: color 0.3s ease;
  &:hover {
    color: var(--primary-color);
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--shadow-light);
  color: var(--text-dark);
  margin-top: 1rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 1rem;
`;

const TransactionHistory = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: var(--shadow-light);
`;

const HistoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 1rem;
`;

const TransactionTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  color: var(--text-light);
  min-width: 600px;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const TableHeader = styled.th`
  padding: 0.5rem;
  text-align: left;
  color: var(--text-dark);
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TableRow = styled.tr`
  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }
`;

const TableCell = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SwapTabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ConfigIcon = styled.div`
  color: var(--text-light);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: var(--primary-color);
  }
`;

const Tab = styled.button`
  background: ${(props) => (props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
  color: var(--text-light);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SwapContainer = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  color: var(--text-dark);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-5px);
  }
`;

const SwapForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TokenInputContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TokenInputLabel = styled.label`
  font-size: 0.9rem;
  color: var(--text-light);
  text-align: left;
`;

const TokenSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const TokenSelect = styled.select`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  background: transparent;
  color: var(--text-dark);
  font-size: 0.9rem;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  option {
    background: var(--background-dark);
    color: var(--text-dark);
  }
`;

const TokenLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const TokenInput = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: var(--border-radius);
  background: transparent;
  color: var(--text-dark);
  font-size: 1.2rem;
  outline: none;
  width: 100%;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SwapArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  margin: -15px auto;
  z-index: 1;
`;

const SwapArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid var(--text-light);
`;

const SwapButton = styled.button`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: var(--text-dark);
  padding: 0.8rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.3s ease;
  box-shadow: var(--shadow-light);
  &:hover {
    background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
    box-shadow: var(--shadow-hover);
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Swap() {
  const { theme } = useTheme();
  const [account, setAccount] = useState(null);
  const [fromToken, setFromToken] = useState('ETNIA');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [chartData, setChartData] = useState(null);
  const [tokenStats, setTokenStats] = useState({
    price: 'Loading...',
    marketCap: 'Loading...',
    volume24h: 'Loading...',
  });
  const [socialLinks, setSocialLinks] = useState({
    website: '',
    twitter: '',
    etherscan: '',
  });

  const tokens = [
    { symbol: 'ETNIA', name: 'Etnia', logo: svLogo, coingeckoId: 'ripple' },
    { symbol: 'ETH', name: 'Ethereum', logo: ethLogo, coingeckoId: 'ethereum' },
    { symbol: 'BNB', name: 'Binance Coin', logo: bnbLogo, coingeckoId: 'binancecoin' },
    { symbol: 'USDT', name: 'Tether', logo: usdtLogo, coingeckoId: 'tether' },
    { symbol: 'MATIC', name: 'Polygon', logo: maticLogo, coingeckoId: 'matic-network' },
  ];

  // Datos simulados para el historial de transacciones (al estilo Uniswap)
  const transactionHistory = [
    {
      type: 'Swap',
      totalValue: '$150.00',
      tokenAmount: '100 ETNIA',
      account: '0x9151...EcC5',
      time: '1h ago',
    },
    {
      type: 'Swap',
      totalValue: '$580.00',
      tokenAmount: '1.2 BNB',
      account: '0x9151...EcC5',
      time: '2h ago',
    },
    {
      type: 'Swap',
      totalValue: '$45.00',
      tokenAmount: '100 MATIC',
      account: '0x9151...EcC5',
      time: '3h ago',
    },
  ];

  // Fetch token stats and social links
  useEffect(() => {
    const fetchTokenStats = async () => {
      const token = tokens.find((t) => t.symbol === fromToken);
      if (!token) return;

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${token.coingeckoId}`
        );
        const data = response.data;
        setTokenStats({
          price: `$${data.market_data.current_price.usd.toFixed(2)}`,
          marketCap: `$${data.market_data.market_cap.usd.toLocaleString()}`,
          volume24h: `$${data.market_data.total_volume.usd.toLocaleString()}`,
        });

        // Fetch social links
        const website = data.links.homepage[0] || '';
        const twitter = data.links.twitter_screen_name
          ? `https://twitter.com/${data.links.twitter_screen_name}`
          : '';
        const etherscan =
          data.links.blockchain_site?.find((site) => site.includes('etherscan')) || '';

        setSocialLinks({
          website,
          twitter,
          etherscan,
        });
      } catch (error) {
        console.error('Error fetching token stats:', error);
        setTokenStats({
          price: 'Error',
          marketCap: 'Error',
          volume24h: 'Error',
        });
        setSocialLinks({
          website: '',
          twitter: '',
          etherscan: '',
        });
      }
    };

    fetchTokenStats();
  }, [fromToken]);

  // Fetch chart data for the selected token
  useEffect(() => {
    const fetchChartData = async () => {
      const token = tokens.find((t) => t.symbol === fromToken);
      if (!token) return;

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${token.coingeckoId}/market_chart?vs_currency=usd&days=7`
        );
        const prices = response.data.prices;
        const labels = prices.map(([timestamp]) =>
          new Date(timestamp).toLocaleDateString()
        );
        const priceValues = prices.map(([, price]) => price);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `${fromToken} Price (USD)`,
              data: priceValues,
              borderColor: 'rgba(255, 64, 255, 1)',
              backgroundColor: 'rgba(255, 64, 255, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData(null);
      }
    };

    fetchChartData();
  }, [fromToken]);

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

  const getTokenLogo = (symbol) => {
    const token = tokens.find((t) => t.symbol === symbol);
    return token ? token.logo : null;
  };

  return (
    <SwapSection theme={theme}>
      <SwapContent>
        <SwapLeft>
          <SwapTabsContainer>
            <Tab active={true}>Swap</Tab>
            <Tab active={false}>Pool</Tab>
            <ConfigIcon>
              <FaCog />
            </ConfigIcon>
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
                <TokenInput
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                />
                <TokenSelectContainer>
                  <TokenSelect value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </TokenSelect>
                  {fromToken && getTokenLogo(fromToken) && (
                    <TokenLogo src={getTokenLogo(fromToken)} alt={`${fromToken} logo`} />
                  )}
                </TokenSelectContainer>
              </TokenInputContainer>

              <SwapArrowContainer>
                <SwapArrow />
              </SwapArrowContainer>

              <TokenInputContainer>
                <TokenInputLabel>To</TokenInputLabel>
                <TokenInput type="number" placeholder="0.0" readOnly />
                <TokenSelectContainer>
                  <TokenSelect value={toToken} onChange={(e) => setToToken(e.target.value)}>
                    <option value="">Select a token</option>
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </TokenSelect>
                  {toToken && getTokenLogo(toToken) && (
                    <TokenLogo src={getTokenLogo(toToken)} alt={`${toToken} logo`} />
                  )}
                </TokenSelectContainer>
              </TokenInputContainer>

              <SwapButton onClick={connectWallet}>Connect Wallet</SwapButton>
            </SwapForm>
          </SwapContainer>
        </SwapLeft>

        <SwapRight>
          <TokenOverview>
            <TokenTitle>
              {fromToken}
              {getTokenLogo(fromToken) && (
                <img
                  src={getTokenLogo(fromToken)}
                  alt={`${fromToken} logo`}
                  style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                />
              )}
            </TokenTitle>
            <TokenStats>
              <StatItem>
                <StatLabel>Price</StatLabel>
                <StatValue>{tokenStats.price}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Market Cap</StatLabel>
                <StatValue>{tokenStats.marketCap}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>24h Volume</StatLabel>
                <StatValue>{tokenStats.volume24h}</StatValue>
              </StatItem>
            </TokenStats>
            <SocialLinks>
              {socialLinks.website && (
                <SocialLink href={socialLinks.website} target="_blank" rel="noopener noreferrer">
                  <FaGlobe />
                </SocialLink>
              )}
              {socialLinks.twitter && (
                <SocialLink href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </SocialLink>
              )}
              {socialLinks.etherscan && (
                <SocialLink href={socialLinks.etherscan} target="_blank" rel="noopener noreferrer">
                  <FaEthereum />
                </SocialLink>
              )}
            </SocialLinks>
          </TokenOverview>

          <ChartContainer>
            <ChartTitle>{fromToken} Price Chart</ChartTitle>
            {chartData ? (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      labels: { color: 'rgba(255, 255, 255, 0.8)' }, // Grayish white
                    },
                    tooltip: {
                      enabled: true,
                      titleColor: 'rgba(255, 255, 255, 0.8)',
                      bodyColor: 'rgba(255, 255, 255, 0.8)',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    },
                  },
                  scales: {
                    x: {
                      ticks: { color: 'rgba(255, 255, 255, 0.8)' }, // Grayish white for dates
                      grid: { display: false },
                    },
                    y: {
                      ticks: { color: 'rgba(255, 255, 255, 0.8)' }, // Grayish white for prices
                      grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    },
                  },
                }}
              />
            ) : (
              <p>Loading chart...</p>
            )}
          </ChartContainer>

          <TransactionHistory>
            <HistoryTitle>Transactions</HistoryTitle>
            <TransactionTableWrapper>
              <TransactionTable>
                <thead>
                  <tr>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Total Value</TableHeader>
                    <TableHeader>Token Amount</TableHeader>
                    <TableHeader>Account</TableHeader>
                    <TableHeader>Time</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{tx.totalValue}</TableCell>
                      <TableCell>{tx.tokenAmount}</TableCell>
                      <TableCell>{tx.account}</TableCell>
                      <TableCell>{tx.time}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </TransactionTable>
            </TransactionTableWrapper>
          </TransactionHistory>
        </SwapRight>
      </SwapContent>
    </SwapSection>
  );
}

export default Swap;