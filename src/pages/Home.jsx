// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import PoolCard from '../components/launchpad/PoolCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player';
import analyticsImage from '../assets/images/analytics.jpg';
import secureImage from '../assets/images/secure.jpg';
import communityImage from '../assets/images/community.jpg';
import launchpadIntroVideo from '../assets/videos/home.mp4';
import pool1Image from '../assets/images/pool1.jpg';
import pool2Image from '../assets/images/pool2.jpg';
import pool3Image from '../assets/images/pool3.jpg';
import ethLogo from '../assets/images/eth-logo.png';
import bnbLogo from '../assets/images/bnb-logo.png';
import solLogo from '../assets/images/sol-logo.png';

const HomeContainer = styled(motion.div)`
  padding: 2rem;
  background: ${props => props.theme.background};
  min-height: calc(100vh - 200px);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(255, 64, 255, 0.1), rgba(0, 255, 255, 0.1));
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  min-height: 400px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 300px;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    min-height: 200px;
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 110%;
  height: 200%;
  z-index: 0;
  overflow: hidden;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const Title = styled.h1`
  color: ${props => props.theme.text};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 64, 255, 0.6);
  position: relative;
  z-index: 2;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.text};
  font-size: 1.2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: ${props => props.theme.background};
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 64, 255, 0.05);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }

  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 64, 255, 0.3) 0%, transparent 70%);
    z-index: 0;
    transition: transform 0.5s ease;
  }

  &:hover:before {
    transform: translate(25%, 25%);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 250px;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    min-height: 200px;
  }
`;

const FeatureImageContainer = styled.div`
  width: 100%;
  max-width: 200px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const FeatureImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.5);

  @media (max-width: 768px) {
    max-width: 150px;
  }

  @media (max-width: 480px) {
    max-width: 120px;
  }
`;

const FeaturedPools = styled.div`
  padding: 2rem;
  background: ${props => props.theme.background};
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);

  h2 {
    color: ${props => props.theme.text};
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const featureVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
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
    totalRaised: '$250,000', 
    progress: 40, 
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
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

function Home() {
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
    <HomeContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      theme={theme}
    >
      <HeroSection>
        <VideoBackground>
          <ReactPlayer
            url={launchpadIntroVideo}
            playing
            loop
            muted
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
          />
        </VideoBackground>
        <VideoOverlay />
        <Title theme={theme}>Welcome to ETNIA Launchpad</Title>
        <Subtitle theme={theme}>
          Discover the future of blockchain fundraising with our cutting-edge launchpad platform.
        </Subtitle>
      </HeroSection>

      <FeaturesSection theme={theme}>
        <FeatureCard
          variants={featureVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          theme={theme}
        >
          <FeatureImageContainer>
            <FeatureImage src={secureImage} alt="Secure Transactions" />
          </FeatureImageContainer>
          <h2>Secure Transactions</h2>
          <p>Ensure your investments are safe with our advanced security protocols.</p>
        </FeatureCard>
        <FeatureCard
          variants={featureVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          theme={theme}
        >
          <FeatureImageContainer>
            <FeatureImage src={analyticsImage} alt="Real-Time Analytics" />
          </FeatureImageContainer>
          <h2>Real-Time Analytics</h2>
          <p>Track pool performance with live data and insights.</p>
        </FeatureCard>
        <FeatureCard
          variants={featureVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          theme={theme}
        >
          <FeatureImageContainer>
            <FeatureImage src={communityImage} alt="Community-Driven" />
          </FeatureImageContainer>
          <h2>Community-Driven</h2>
          <p>Join a vibrant community of innovators and investors.</p>
        </FeatureCard>
      </FeaturesSection>

      <FeaturedPools theme={theme}>
        <h2>Featured Launchpads</h2>
        <Slider {...sliderSettings}>
          {mockPools.map((pool, index) => (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <PoolCard pool={pool} timeLeft={timeLeft[pool.id]} />
            </motion.div>
          ))}
        </Slider>
      </FeaturedPools>
    </HomeContainer>
  );
}

export default Home;