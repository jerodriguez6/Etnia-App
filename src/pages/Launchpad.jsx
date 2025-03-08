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

  select, input {
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
    };
  }

  return timeLeft;
};

const mockPools = [
  { 
    id: 1, 
    name: 'ShadowLoom', 
    totalRaised: '0 ETH', 
    progress: 0, 
    status: 'Upcoming', 
    image: pool1Image,
    blockchainLogo: ethLogo,
    saleStartDate: '2025-03-15T18:00:00',
    saleEndDate: null,
    softHard: '250 - 1,000 ETH',
    liquidity: '36% - 365 days',
  },
  { 
    id: 2, 
    name: 'Blub', 
    totalRaised: '117.9646 BNB', 
    progress: 235.92, 
    status: 'Live', 
    image: pool2Image,
    blockchainLogo: bnbLogo,
    saleStartDate: '2025-03-06T12:00:00',
    saleEndDate: '2025-03-10T18:00:00',
    softHard: '0.5 BNB',
    liquidity: '51% - 190 days',
  },
  { 
    id: 3, 
    name: 'SolanaStar', 
    totalRaised: '0 SOL', 
    progress: 0, 
    status: 'Upcoming', 
    image: pool3Image,
    blockchainLogo: solLogo,
    saleStartDate: '2025-03-20T12:00:00',
    saleEndDate: null,
    softHard: '500 - 2,000 SOL',
    liquidity: '40% - 300 days',
  },
  { 
    id: 4, 
    name: 'MoonEth', 
    totalRaised: '300 ETH', 
    progress: 60, 
    status: 'Live', 
    image: pool4Image,
    blockchainLogo: ethLogo,
    saleStartDate: '2025-03-06T10:00:00',
    saleEndDate: '2025-03-12T18:00:00',
    softHard: '500 - 1,500 ETH',
    liquidity: '45% - 400 days',
  },
  { 
    id: 5, 
    name: 'BNBBoost', 
    totalRaised: '50 BNB', 
    progress: 10, 
    status: 'Ended', 
    image: pool5Image,
    blockchainLogo: bnbLogo,
    saleStartDate: '2025-03-01T12:00:00',
    saleEndDate: '2025-03-05T18:00:00',
    softHard: '500 - 1,000 BNB',
    liquidity: '30% - 200 days',
  },
  { 
    id: 6, 
    name: 'SolRise', 
    totalRaised: '100 SOL', 
    progress: 20, 
    status: 'Live', 
    image: pool6Image,
    blockchainLogo: solLogo,
    saleStartDate: '2025-03-06T14:00:00',
    saleEndDate: '2025-03-15T18:00:00',
    softHard: '300 - 1,200 SOL',
    liquidity: '50% - 350 days',
  },
];

function Launchpads() {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({});

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
            <PoolCard pool={pool} timeLeft={timeLeft[pool.id]} />
          </motion.div>
        ))}
      </PoolsGrid>
    </LaunchpadsContainer>
  );
}

export default Launchpads;