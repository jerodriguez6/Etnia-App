import { useState, useEffect } from 'react'; // Eliminamos la importación redundante de React
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom'; // Añadimos useNavigate para redirigir
import PoolCard from '../components/launchpad/PoolCard';
import { mockPools } from '../data/mockPools'; // Importamos los datos centralizados

const LaunchpadsContainer = styled(motion.div)`
  padding: 2rem;
  background: #1a1a1a;
  background: ${(props) => props.theme.background};
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
  color: ${(props) => props.theme.text};

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
    background: ${(props) => props.theme.backgroundDark || props.theme.background};
    color: ${(props) => props.theme.text};
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

// Loading Styles
const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const LoadingRing = styled(motion.div)`
  width: 100px;
  height: 100px;
  border: 4px solid transparent;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  position: relative;
`;

const LoadingText = styled(motion.div)`
  position: absolute;
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const loadingVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const textVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
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

function Launchpads() {
  const { theme } = useTheme();
  const navigate = useNavigate(); // Hook para redirigir
  const [timeLeft, setTimeLeft] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const timer = setInterval(() => {
      const newTimeLeft = {};
      mockPools.forEach((pool) => {
        if (pool.status === 'Upcoming' && pool.saleStartDate) {
          newTimeLeft[pool.id] = calculateTimeLeft(pool.saleStartDate);
        } else if (pool.status === 'Live' && pool.saleEndDate) {
          newTimeLeft[pool.id] = calculateTimeLeft(pool.saleEndDate);
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(timer);
    };
  }, []);

  const handleViewPool = (pool) => {
    navigate(`/pools/${pool.id}`); // Redirige a la página de detalle del pool
  };

  if (isLoading) {
    return (
      <LoadingOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <LoadingRing variants={loadingVariants} animate="animate">
          <LoadingText variants={textVariants} animate="animate">
            Loading
          </LoadingText>
        </LoadingRing>
      </LoadingOverlay>
    );
  }

  return (
    <LaunchpadsContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      theme={theme}
    >
      <HeaderSection theme={theme}>
        <h1>LAUNCHPADS</h1>
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
              onView={() => handleViewPool(pool)} // Redirige al hacer clic en "View"
            />
          </motion.div>
        ))}
      </PoolsGrid>
    </LaunchpadsContainer>
  );
}

export default Launchpads;