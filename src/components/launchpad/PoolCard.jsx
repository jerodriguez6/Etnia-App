// src/components/launchpad/PoolCard.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProgressBar from '../common/ProgressBar';

const Card = styled(motion.div)`
  background: ${props => props.theme.backgroundDark || props.theme.background};
  border: 1px solid rgba(255, 64, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2);
  padding: 1rem;
  width: 100%;
  color: ${props => props.theme.text};
  text-align: center;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 255, 255, 0.4);
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  margin-bottom: 1rem;

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

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ViewButton = styled.button`
  background: var(--primary-color);
  color: var(--text-dark);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-light);
  font-weight: bold;

  &:hover {
    background: var(--secondary-color);
    box-shadow: var(--shadow-hover);
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
    <Card
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
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
      <Detail>Total Raised: {pool.totalRaised}</Detail>
      <ProgressBar progress={pool.progress} />
      <Detail>Soft/Hard: {pool.softHard}</Detail>
      <Detail>Liquidity: {pool.liquidity}</Detail>
      <ViewButton onClick={onView}>View</ViewButton>
    </Card>
  );
}

export default PoolCard;