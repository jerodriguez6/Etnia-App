// src/components/launchpad/PoolCard.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProgressBar from '../common/ProgressBar';

const CardWrapper = styled(motion.div)`
  position: relative;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1; /* Borde con gradiente */
  border-radius: 10px; /* Mantenemos un borde redondeado base */
  transition: all 0.3s ease;

  /* Cortes diagonales más grandes en las esquinas superior izquierda e inferior derecha */
  clip-path: polygon(
    40px 0, /* Corte más grande en la esquina superior izquierda */
    100% 0, /* Esquina superior derecha */
    100% calc(100% - 40px), /* Corte más grande en la esquina inferior derecha */
    calc(100% - 40px) 100%, /* Punta sobresaliente en la esquina inferior derecha */
    0 100%, /* Esquina inferior izquierda */
    0 40px /* Vuelve al inicio del corte diagonal */
  );

  &:hover {
    transform: translateY(-5px); /* Elevación al hacer hover */
  }
`;

const Card = styled.div`
  position: relative;
  background: ${props => props.theme.backgroundDark || props.theme.background};
  box-shadow: var(--shadow-light); /* Sombra inicial con cian neón */
  padding: 1rem;
  width: 100%;
  color: ${props => props.theme.text};
  text-align: center;
  overflow: hidden;
  opacity: 0.9; /* Opacidad inicial para efecto de hover */

  /* Efecto de fondo dinámico con gradiente radial */
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
    opacity: 1; /* Aumenta la opacidad al hacer hover */
    box-shadow: var(--shadow-hover); /* Sombra más intensa con rosa neón */
  }

  &:hover:before {
    transform: translate(25%, 25%);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  margin-bottom: 1rem;
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.3); /* Sombra rosa neón en la imagen */

  @media (max-width: 768px) {
    height: 120px;
  }

  @media (max-width: 480px) {
    height: 100px;
  }
`;

const BlockchainLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  vertical-align: middle;
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.5)); /* Resplandor cian en el logo */
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
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color)); /* Gradiente igual que el borde */
  color: var(--text-dark);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1; /* Borde con gradiente */
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

  /* Cortes diagonales en las esquinas superior izquierda e inferior derecha */
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
    background: linear-gradient(45deg, var(--secondary-color), var(--primary-color)); /* Invierte el gradiente al hacer hover */
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
        {pool.image && <CardImage src={pool.image} alt={pool.name} />}
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
        <ViewButton onClick={onView}>View</ViewButton>
      </Card>
    </CardWrapper>
  );
}

export default PoolCard;