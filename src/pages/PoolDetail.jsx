import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player'; // Importación por defecto
import Modal from 'react-modal';
import Button from '../components/common/Button';

Modal.setAppElement('#root'); // Necesario para accesibilidad

const DetailContainer = styled(motion.div)`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.theme.background};
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem auto;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin: 0.5rem auto;
  }
`;

const PoolInfo = styled.div`
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: var(--gray-light);
  border-radius: var(--border-radius);
  overflow: hidden;

  @media (max-width: 480px) {
    height: 15px;
  }
`;

const Progress = styled.div`
  height: 100%;
  background: var(--primary-color);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const StatsSection = styled.div`
  background: rgba(0, 255, 255, 0.1);
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.2);
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const Gallery = styled.div`
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const VideoPromo = styled.div`
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-light);

  @media (max-width: 768px) {
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const ModalContent = styled.div`
  background: ${props => props.theme.background};
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 300px;
  }
`;

const ModalInput = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: var(--shadow-hover);
    border-color: var(--primary-color);
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const mockPools = [
  { 
    id: 1, 
    name: 'Project Alpha', 
    totalRaised: '$500,000', 
    progress: 75, 
    status: 'Live', 
    description: 'A decentralized finance project aiming to revolutionize staking.', 
    target: '$1,000,000', 
    startDate: '2025-01-01', 
    endDate: '2025-03-31', 
    participants: 150, 
    images: ['/assets/images/pool1-1.jpg', '/assets/images/pool1-2.jpg', '/assets/images/pool1-3.jpg'],
    video: '/assets/videos/pool1-promo.mp4'
  },
  { 
    id: 2, 
    name: 'Project Beta', 
    totalRaised: '$250,000', 
    progress: 40, 
    status: 'Ended', 
    description: 'A gaming token for blockchain-based games.', 
    target: '$500,000', 
    startDate: '2024-12-01', 
    endDate: '2025-02-28', 
    participants: 80, 
    images: ['/assets/images/pool2-1.jpg', '/assets/images/pool2-2.jpg'],
    video: '/assets/videos/pool2-promo.mp4'
  },
];

function PoolDetail() {
  const { id } = useParams();
  const pool = mockPools.find(p => p.id === parseInt(id));
  const { theme } = useTheme();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [investment, setInvestment] = useState('');

  if (!pool) {
    return <div style={{ textAlign: 'center', color: 'var(--text-dark)', padding: '2rem' }}>Pool not found</div>;
  }

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleParticipate = () => {
    if (investment.trim() && parseFloat(investment) > 0) {
      alert(`Participated in ${pool.name} with $${investment}!`);
      setInvestment('');
      closeModal();
    } else {
      alert('Please enter a valid investment amount.');
    }
  };

  return (
    <DetailContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      theme={theme}
    >
      <h1>{pool.name}</h1>
      <PoolInfo>
        <p><strong>Status:</strong> {pool.status}</p>
        <p><strong>Total Raised:</strong> {pool.totalRaised}</p>
        <p><strong>Target:</strong> {pool.target}</p>
        <p><strong>Progress:</strong> {pool.progress}%</p>
        <p><strong>Description:</strong> {pool.description}</p>
        <p><strong>Start Date:</strong> {pool.startDate}</p>
        <p><strong>End Date:</strong> {pool.endDate}</p>
        <p><strong>Participants:</strong> {pool.participants}</p>
        <ProgressBar>
          <Progress progress={pool.progress} />
        </ProgressBar>
      </PoolInfo>
      <Gallery>
        <Slider {...sliderSettings}>
          {pool.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`${pool.name} Image ${index + 1}`} style={{ width: '100%', borderRadius: 'var(--border-radius)', boxShadow: '0 0 10px rgba(255, 64, 255, 0.3)' }} />
            </div>
          ))}
        </Slider>
      </Gallery>
      <VideoPromo>
        <ReactPlayer
          url={pool.video}
          controls
          width="100%"
          height="auto"
          style={{ borderRadius: 'var(--border-radius)' }}
        />
      </VideoPromo>
      <StatsSection theme={theme}>
        <h3>Pool Statistics</h3>
        <p>Average Investment: ~${(parseFloat(pool.totalRaised.replace('$', '').replace(',', '')) / pool.participants).toFixed(2)}</p>
        <p>Remaining Time: {pool.status === 'Live' ? '30 days' : 'Completed'}</p>
      </StatsSection>
      <Button
        onClick={openModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        theme={theme}
      >
        Participate Now
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000 },
          content: { 
            background: 'none', 
            border: 'none', 
            padding: 0,
            inset: '20px',
          },
        }}
      >
        <ModalContent theme={theme}>
          <h2>Participate in {pool.name}</h2>
          <p>Enter your investment amount in USD:</p>
          <ModalInput
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder="e.g., 1000"
            min="1"
            step="0.01"
            theme={theme}
          />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Button onClick={handleParticipate} theme={theme}>Confirm</Button>
            <Button onClick={closeModal} style={{ background: 'var(--secondary-color)' }} theme={theme}>Cancel</Button>
          </div>
        </ModalContent>
      </Modal>
    </DetailContainer>
  );
}

export default PoolDetail; // Asegúrate de que esta línea esté presente y sea correcta