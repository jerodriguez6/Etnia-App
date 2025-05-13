import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import Button from '../components/common/Button';
import Web3 from 'web3';
import { mockPools } from '../data/mockPools'; // Importamos los datos centralizados

Modal.setAppElement('#root');

const MainContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  background: ${(props) => props.theme.background};
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    margin: 1rem auto;
  }
`;

const LeftSection = styled.div`
  flex: 2;
  color: ${(props) => props.theme.text};
`;

const RightSection = styled.div`
  flex: 1;
  background: rgba(255, 64, 255, 0.1);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.2);
`;

const Banner = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #00c4ff, #ff00ff);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const TokenInfo = styled.div`
  margin-bottom: 1rem;
  p {
    margin: 0.5rem 0;
    strong {
      color: ${(props) => props.theme.textDark || '#fff'};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  a {
    color: var(--primary-color);
    font-size: 1.5rem;
    transition: color 0.3s ease;
    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const VideoPromo = styled.div`
  margin: 1rem 0;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-light);
`;

const Timer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
  div {
    background: ${(props) => props.theme.backgroundDark || '#222'};
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-align: center;
    color: ${(props) => props.theme.text};
    span:first-child {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
    }
    span:last-child {
      font-size: 0.8rem;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: var(--gray-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  margin: 1rem 0;
`;

const Progress = styled.div`
  height: 100%;
  background: var(--primary-color);
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

const SaleInfo = styled.div`
  margin: 1rem 0;
  p {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    color: ${(props) => props.theme.text};
  }
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.background};
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  max-width: 500px;
  margin: 0 auto;
`;

const ModalInput = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: var(--shadow-hover);
    border-color: var(--primary-color);
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

function PoolDetail() {
  const { id } = useParams();
  const pool = mockPools.find((p) => p.id === parseInt(id));
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [investment, setInvestment] = useState('');
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (pool?.status === 'Live' && pool?.saleEndDate) {
        setTimeLeft(calculateTimeLeft(pool.saleEndDate));
      } else if (pool?.status === 'Upcoming' && pool?.saleStartDate) {
        setTimeLeft(calculateTimeLeft(pool.saleStartDate));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [pool]);

  if (!pool) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-dark)', padding: '2rem' }}>
        Pool not found
      </div>
    );
  }

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleParticipate = () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }
    if (investment.trim() && parseFloat(investment) > 0) {
      alert(`Participated in ${pool.name} with ${investment} USDT!`);
      setInvestment('');
      closeModal();
    } else {
      alert('Please enter a valid investment amount.');
    }
  };

  return (
    <MainContainer variants={containerVariants} initial="hidden" animate="visible" theme={theme}>
      {/* Sección Izquierda: Detalles del Proyecto */}
      <LeftSection theme={theme}>
        <Banner>{pool.bannerText}</Banner>
        <h1>{pool.name} Presale</h1>
        <TokenInfo>
          <h3>About</h3>
          <p>{pool.description}</p>
        </TokenInfo>
        <SocialLinks>
          <a href={pool.website} target="_blank" rel="noopener noreferrer">
            🌐 Website
          </a>
          <a href={pool.whitepaper} target="_blank" rel="noopener noreferrer">
            📄 Whitepaper
          </a>
          <a href={pool.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a href={pool.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </SocialLinks>
        <TokenInfo>
          <h3>Token</h3>
          <p>
            <strong>Address:</strong> {pool.tokenAddress}{' '}
            <span style={{ color: 'red' }}>(Do not send tokens to this address)</span>
          </p>
        </TokenInfo>
        <TokenInfo>
          <h3>Tokenomics</h3>
          <p>
            <strong>Total Supply:</strong> {pool.tokenomics.totalSupply}
          </p>
          <p>
            <strong>Presale Allocation:</strong> {pool.tokenomics.presaleAllocation}
          </p>
          <p>
            <strong>Liquidity:</strong> {pool.tokenomics.liquidity}
          </p>
          <p>
            <strong>Team:</strong> {pool.tokenomics.team}
          </p>
          <p>
            <strong>Marketing:</strong> {pool.tokenomics.marketing}
          </p>
        </TokenInfo>
        <VideoPromo>
          <ReactPlayer
            url={pool.video}
            controls
            width="100%"
            height="auto"
            style={{ borderRadius: 'var(--border-radius)' }}
          />
        </VideoPromo>
      </LeftSection>

      {/* Sección Derecha: Compra y Contador */}
      <RightSection theme={theme}>
        <h3>{pool.status === 'Live' ? 'Presale Ends in' : 'Presale Starts in'}</h3>
        {timeLeft.days !== undefined ? (
          <Timer theme={theme}>
            <div>
              <span>{timeLeft.days}</span>
              <span>Days</span>
            </div>
            <div>
              <span>{timeLeft.hours}</span>
              <span>Hrs</span>
            </div>
            <div>
              <span>{timeLeft.minutes}</span>
              <span>Mins</span>
            </div>
            <div>
              <span>{timeLeft.seconds}</span>
              <span>Secs</span>
            </div>
          </Timer>
        ) : (
          <p>Calculating...</p>
        )}
        <SaleInfo theme={theme}>
          <p>
            <span>{pool.totalRaised}</span>
            <span>{pool.target}</span>
          </p>
          <ProgressBar>
            <Progress progress={pool.progress} />
          </ProgressBar>
          <p>
            <span>Status</span>
            <span>{pool.status}</span>
          </p>
          <p>
            <span>Sale Type</span>
            <span>{pool.saleType}</span>
          </p>
          <p>
            <span>Unsold Tokens</span>
            <span>{pool.unsoldTokens}</span>
          </p>
          <p>
            <span>Min Buy</span>
            <span>{pool.minBuy}</span>
          </p>
          <p>
            <span>Max Buy</span>
            <span>{pool.maxBuy}</span>
          </p>
          <p>
            <span>Current Raised</span>
            <span>
              {pool.totalRaised} ({pool.progress}%)
            </span>
          </p>
          <p>
            <span>Total Contributors</span>
            <span>{pool.participants}</span>
          </p>
        </SaleInfo>
        {pool.status === 'Live' ? (
          account ? (
            <Button
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              theme={theme}
              style={{ width: '100%', background: '#ff4081', color: '#fff' }}
            >
              Participate Now
            </Button>
          ) : (
            <Button
              onClick={connectWallet}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              theme={theme}
              style={{ width: '100%', background: '#ff4081', color: '#fff' }}
            >
              Connect Wallet
            </Button>
          )
        ) : (
          <Button
            disabled
            style={{ width: '100%', background: '#ccc', color: '#666' }}
            theme={theme}
          >
            {pool.status === 'Upcoming' ? 'Coming Soon' : 'Sale Ended'}
          </Button>
        )}
      </RightSection>

      {/* Modal para Participar */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000 },
          content: { background: 'none', border: 'none', padding: 0, inset: '20px' },
        }}
      >
        <ModalContent theme={theme}>
          <h2>Participate in {pool.name}</h2>
          <p>Enter your investment amount in USDT:</p>
          <ModalInput
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder="e.g., 100"
            min="1"
            step="0.01"
            theme={theme}
          />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Button onClick={handleParticipate} theme={theme}>
              Confirm
            </Button>
            <Button
              onClick={closeModal}
              style={{ background: 'var(--secondary-color)' }}
              theme={theme}
            >
              Cancel
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </MainContainer>
  );
}

export default PoolDetail;