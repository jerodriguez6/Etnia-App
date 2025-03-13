// src/pages/Launchpads.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import PoolCard from '../components/launchpad/PoolCard';
import pool1Image from '../assets/images/pool1.jpg';
import pool2Image from '../assets/images/pool2.jpg';
import pool3Image from '../assets/images/pool3.jpg';
import pool4Image from '../assets/images/pool4.png';
import pool5Image from '../assets/images/pool5.png';
import pool6Image from '../assets/images/pool6.png';
import ethLogo from '../assets/images/eth-logo.png';
import bnbLogo from '../assets/images/bnb-logo.png';
import solLogo from '../assets/images/sol-logo.png';

const LaunchpadsContainer = styled(motion.div)`
  padding: 2rem;
  background: ${props => props.theme.background};
  min-height: calc(100vh - 200px);

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.text};

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;

    h1 {
      font-size: 1.5rem;
    }
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;

  span {
    font-size: 1rem;
    background: rgba(255, 64, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    gap: 1rem;

    span {
      font-size: 0.9rem;
      padding: 0.3rem 0.7rem;
    }
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  select,
  input {
    padding: 0.5rem;
    background: ${props => props.theme.backgroundDark || props.theme.background};
    color: ${props => props.theme.text};
    border: 1px solid rgba(255, 64, 255, 0.3);
    border-radius: 5px;
    outline: none;
  }

  input {
    width: 200px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    input {
      width: 100%;
    }
  }
`;

const PoolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

// Modal Styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: var(--background-light);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--glow-effect);
  max-width: 600px;
  width: 90%;
  color: var(--text-light);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ModalLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
`;

const ModalTitle = styled.h2`
  color: var(--text-dark);
  text-shadow: var(--shadow-light);
  font-size: 1.5rem;
`;

const ModalDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ModalLabel = styled.span`
  color: var(--text-dark);
  font-weight: bold;
`;

const ModalValue = styled.span`
  color: var(--text-light);
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 10px;
  background: var(--primary-color);
  border-radius: 5px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: var(--primary-color);
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--secondary-color);
  }
`;

const CloseButton = styled.button`
  background: var(--secondary-color);
  color: var(--text-dark);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: var(--shadow-light);
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-color);
    box-shadow: var(--shadow-hover);
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  }

  return timeLeft;
};

// Mock data updated with additional details
const mockPools = [
  {
    id: 1,
    name: 'ShadowLoom',
    totalRaised: '0 ETH',
    progress: 0,
    status: 'Upcoming',
    image: pool1Image,
    blockchainLogo: ethLogo,
    blockchain: 'Ethereum',
    saleStartDate: '2025-03-15T18:00:00',
    saleEndDate: null,
    softHard: '250 - 1,000 ETH',
    liquidity: '36% - 365 days',
    presaleRate: '1 ETH = 5,000 Tokens',
    tokenAddress: '0x1234...abcd',
    socialLinks: {
      telegram: 'https://telegram.me/shadowloom',
      twitter: 'https://twitter.com/shadowloom',
    },
  },
  {
    id: 2,
    name: 'Blub',
    totalRaised: '117.9646 BNB',
    progress: 235.92,
    status: 'Live',
    image: pool2Image,
    blockchainLogo: bnbLogo,
    blockchain: 'Binance Smart Chain',
    saleStartDate: '2025-03-06T12:00:00',
    saleEndDate: '2025-03-10T18:00:00',
    softHard: '0.5 BNB',
    liquidity: '51% - 190 days',
    presaleRate: '1 BNB = 10,000 Tokens',
    tokenAddress: '0x5678...efgh',
    socialLinks: {
      telegram: 'https://telegram.me/blub',
      twitter: 'https://twitter.com/blub',
    },
  },
  {
    id: 3,
    name: 'SolanaStar',
    totalRaised: '0 SOL',
    progress: 0,
    status: 'Upcoming',
    image: pool3Image,
    blockchainLogo: solLogo,
    blockchain: 'Solana',
    saleStartDate: '2025-03-20T12:00:00',
    saleEndDate: null,
    softHard: '500 - 2,000 SOL',
    liquidity: '40% - 300 days',
    presaleRate: '1 SOL = 20,000 Tokens',
    tokenAddress: '0x9abc...1234',
    socialLinks: {
      telegram: 'https://telegram.me/solanastar',
      twitter: 'https://twitter.com/solanastar',
    },
  },
  {
    id: 4,
    name: 'MoonEth',
    totalRaised: '300 ETH',
    progress: 60,
    status: 'Live',
    image: pool4Image,
    blockchainLogo: ethLogo,
    blockchain: 'Ethereum',
    saleStartDate: '2025-03-06T10:00:00',
    saleEndDate: '2025-03-12T18:00:00',
    softHard: '500 - 1,500 ETH',
    liquidity: '45% - 400 days',
    presaleRate: '1 ETH = 8,000 Tokens',
    tokenAddress: '0xdef1...5678',
    socialLinks: {
      telegram: 'https://telegram.me/mooneth',
      twitter: 'https://twitter.com/mooneth',
    },
  },
  {
    id: 5,
    name: 'BNBBoost',
    totalRaised: '50 BNB',
    progress: 10,
    status: 'Ended',
    image: pool5Image,
    blockchainLogo: bnbLogo,
    blockchain: 'Binance Smart Chain',
    saleStartDate: '2025-03-01T12:00:00',
    saleEndDate: '2025-03-05T18:00:00',
    softHard: '500 - 1,000 BNB',
    liquidity: '30% - 200 days',
    presaleRate: '1 BNB = 15,000 Tokens',
    tokenAddress: '0x2345...9abc',
    socialLinks: {
      telegram: 'https://telegram.me/bnbboost',
      twitter: 'https://twitter.com/bnbboost',
    },
  },
  {
    id: 6,
    name: 'SolRise',
    totalRaised: '100 SOL',
    progress: 20,
    status: 'Live',
    image: pool6Image,
    blockchainLogo: solLogo,
    blockchain: 'Solana',
    saleStartDate: '2025-03-06T14:00:00',
    saleEndDate: '2025-03-15T18:00:00',
    softHard: '300 - 1,200 SOL',
    liquidity: '50% - 350 days',
    presaleRate: '1 SOL = 25,000 Tokens',
    tokenAddress: '0x6789...def1',
    socialLinks: {
      telegram: 'https://telegram.me/solrise',
      twitter: 'https://twitter.com/solrise',
    },
  },
];

// Modal Component
function PoolModal({ isOpen, onClose, pool }) {
  if (!isOpen || !pool) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalLogo src={pool.image} alt={`${pool.name} logo`} />
          <div>
            <ModalTitle>{pool.name}</ModalTitle>
            <ModalValue>{pool.blockchain}</ModalValue>
          </div>
        </ModalHeader>

        <ModalDetail>
          <ModalLabel>Status:</ModalLabel>
          <ModalValue>{pool.status}</ModalValue>
        </ModalDetail>

        <ModalDetail>
          <ModalLabel>Progress:</ModalLabel>
          <ModalValue>{pool.progress}%</ModalValue>
        </ModalDetail>

        <ProgressBarContainer>
          <ProgressBar progress={pool.progress} />
        </ProgressBarContainer>

        <ModalDetail>
          <ModalLabel>Total Raised:</ModalLabel>
          <ModalValue>{pool.totalRaised}</ModalValue>
        </ModalDetail>

        <ModalDetail>
          <ModalLabel>Soft/Hard Cap:</ModalLabel>
          <ModalValue>{pool.softHard}</ModalValue>
        </ModalDetail>

        <ModalDetail>
          <ModalLabel>Liquidity:</ModalLabel>
          <ModalValue>{pool.liquidity}</ModalValue>
        </ModalDetail>

        <ModalDetail>
          <ModalLabel>Presale Rate:</ModalLabel>
          <ModalValue>{pool.presaleRate}</ModalValue>
        </ModalDetail>

        <ModalDetail>
          <ModalLabel>Sale Start:</ModalLabel>
          <ModalValue>{new Date(pool.saleStartDate).toLocaleString()}</ModalValue>
        </ModalDetail>

        <ModalDetail>
          <ModalLabel>Sale End:</ModalLabel>
          <ModalValue>
            {pool.saleEndDate ? new Date(pool.saleEndDate).toLocaleString() : 'TBD'}
          </ModalValue>
        </ModalDetail>

        <ModalDetail>
          <ModalLabel>Token Address:</ModalLabel>
          <ModalValue>
            <a
              href={`https://explorer.example.com/address/${pool.tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--primary-color)' }}
            >
              {pool.tokenAddress}
            </a>
          </ModalValue>
        </ModalDetail>

        <SocialLinks>
          <SocialLink href={pool.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-telegram-plane"></i>
          </SocialLink>
          <SocialLink href={pool.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </SocialLink>
        </SocialLinks>

        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

function Launchpads() {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedPool, setSelectedPool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      mockPools.forEach(pool => {
        if (pool.status === 'Upcoming' && pool.saleStartDate) {
          newTimeLeft[pool.id] = calculateTimeLeft(pool.saleStartDate);
        } else if (pool.status === 'Live' && pool.saleEndDate) {
          newTimeLeft[pool.id] = calculateTimeLeft(pool.saleEndDate);
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleViewPool = (pool) => {
    setSelectedPool(pool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPool(null);
  };

  return (
    <LaunchpadsContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      theme={theme}
    >
      <HeaderSection theme={theme}>
        <h1>Launchpads</h1>
        <Stats>
          <span>Total Pools: 15</span>
          <span>Total Raised: $2,500,000</span>
          <span>Active Pools: 8</span>
        </Stats>
      </HeaderSection>

      <FilterSection theme={theme}>
        <select defaultValue="all">
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="ended">Ended</option>
        </select>
        <input type="text" placeholder="Search pools..." />
      </FilterSection>

      <PoolsGrid>
        {mockPools.map((pool, index) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <PoolCard
              pool={pool}
              timeLeft={timeLeft[pool.id]}
              onView={() => handleViewPool(pool)}
            />
          </motion.div>
        ))}
      </PoolsGrid>

      <PoolModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pool={selectedPool}
      />
    </LaunchpadsContainer>
  );
}

export default Launchpads;