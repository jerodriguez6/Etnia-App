import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProgressBar from '../common/ProgressBar';

const CardWrapper = styled(motion.div)`
  position: relative;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  border-radius: 10px;
  transition: all 0.3s ease;
  clip-path: polygon(
    40px 0,
    100% 0,
    100% calc(100% - 40px),
    calc(100% - 40px) 100%,
    0 100%,
    0 40px
  );

  &:hover {
    transform: translateY(-5px);
  }
`;

const Card = styled.div`
  position: relative;
  background: ${props => props.theme.backgroundDark || props.theme.background};
  box-shadow: var(--shadow-light);
  width: 100%;
  color: ${props => props.theme.text};
  text-align: center;
  overflow: hidden;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  height: 400px; /* Altura fija para mantener proporciones consistentes */

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 64, 255, 0.2) 0%, transparent 70%);
    z-index: 0;
    transition: transform 0.5s ease;
  }

  &:hover {
    opacity: 1;
    box-shadow: var(--shadow-hover);
  }

  &:hover:before {
    transform: translate(25%, 25%);
  }

  @media (max-width: 768px) {
    height: 350px; /* Ajustamos la altura para tablet */
  }

  @media (max-width: 480px) {
    height: 320px; /* Ajustamos la altura para móvil */
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 50%; /* La imagen ocupa exactamente la mitad superior de la tarjeta */
  overflow: hidden;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%; /* La imagen ocupa todo el contenedor */
  object-fit: cover; /* Ajusta la imagen para cubrir el contenedor sin distorsionarse */
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.3);
`;

const CardContent = styled.div`
  flex: 1; /* El contenido ocupa la mitad inferior de la tarjeta */
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const BlockchainLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  vertical-align: middle;
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.5));
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dark);
  text-shadow: var(--shadow-light);

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CardStatus = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  display: inline-block;
  background: ${props => {
    switch (props.status) {
      case 'Upcoming':
        return 'rgba(255, 215, 0, 0.2)';
      case 'Live':
        return 'rgba(0, 255, 0, 0.2)';
      case 'Ended':
        return 'rgba(255, 0, 0, 0.2)';
      default:
        return 'rgba(255, 255, 255, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Upcoming':
        return '#ffd700';
      case 'Live':
        return '#00ff00';
      case 'Ended':
        return '#ff0000';
      default:
        return '#ffffff';
    }
  }};

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Timer = styled.div`
  font-size: 0.8rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const Detail = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.textLight || props.theme.text};
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: var(--text-dark);
`;

const DetailValue = styled.span`
  color: ${props => props.theme.textLight || props.theme.text};
`;

const ProgressContainer = styled.div`
  margin: 0.5rem 0;
  padding: 0 0.5rem;
`;

const ViewButton = styled.button`
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: var(--text-dark);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-light);
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
  clip-path: polygon(
    5px 0,
    100% 0,
    100% calc(100% - 5px),
    calc(100% - 5px) 100%,
    0 100%,
    0 5px
  );

  &:hover {
    opacity: 1;
    background: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function PoolCard({ pool, timeLeft, onView }) {
  const formatTimeLeft = (time) => {
    if (!time) return '';
    const { days, hours, minutes } = time;
    if (pool.status === 'Upcoming') {
      return days > 0 ? `${days}d ${hours}h ${minutes}m` : hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    } else if (pool.status === 'Live') {
      return days > 0 ? `${days}d ${hours}h ${minutes}m` : hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
    return pool.saleEndDate ? new Date(pool.saleEndDate).toLocaleDateString() : 'Ended';
  };

  return (
    <CardWrapper
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card>
        {pool.image && (
          <CardImageContainer>
            <CardImage src={pool.image} alt={pool.name} />
          </CardImageContainer>
        )}
        <CardContent>
          <div>
            <CardTitle>
              {pool.blockchainLogo && <BlockchainLogo src={pool.blockchainLogo} alt={`${pool.name} blockchain`} />}
              {pool.name}
            </CardTitle>
            <CardStatus status={pool.status}>
              {pool.status === 'Upcoming' ? 'Upcoming' : pool.status === 'Live' ? 'Sale Live' : 'Ended'}
            </CardStatus>
            {pool.status === 'Upcoming' && pool.saleStartDate && (
              <Timer>Sale Starts In: {formatTimeLeft(timeLeft)}</Timer>
            )}
            {pool.status === 'Live' && pool.saleEndDate && (
              <Timer>Sale Ends In: {formatTimeLeft(timeLeft)}</Timer>
            )}
            {pool.status === 'Ended' && pool.saleEndDate && (
              <Timer>Ended: {formatTimeLeft(timeLeft)}</Timer>
            )}
            <Detail>
              <DetailLabel>Total Raised:</DetailLabel>
              <DetailValue>{pool.totalRaised}</DetailValue>
            </Detail>
            <ProgressContainer>
              <ProgressBar progress={pool.progress} />
            </ProgressContainer>
            <Detail>
              <DetailLabel>Soft/Hard:</DetailLabel>
              <DetailValue>{pool.softHard}</DetailValue>
            </Detail>
            <Detail>
              <DetailLabel>Liquidity:</DetailLabel>
              <DetailValue>{pool.liquidity}</DetailValue>
            </Detail>
          </div>
          <ViewButton onClick={onView}>View</ViewButton>
        </CardContent>
      </Card>
    </CardWrapper>
  );
}

export default PoolCard;