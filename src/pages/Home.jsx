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
import img7 from '../assets/images/img7.png';
import pool1Image from '../assets/images/pool1.jpg';
import pool2Image from '../assets/images/pool2.jpg';
import pool3Image from '../assets/images/pool3.jpg';
import ethLogo from '../assets/images/eth-logo.png';
import bnbLogo from '../assets/images/bnb-logo.png';
import solLogo from '../assets/images/sol-logo.png';
import microsoftLogo from '../assets/images/microsoft-logo.svg';
import awsLogo from '../assets/images/aws-logo.png';
import sharkLogo from '../assets/images/shark-logo.png';
import googleLogo from '../assets/images/google-logo.svg';
import bnbChainLogo from '../assets/images/bnb-chain-logo.svg';
import tonLogo from '../assets/images/ton-logo.svg';

// Componentes estilizados (sin cambios en las secciones no relacionadas)
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

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 110%;
  height: 200%;
  z-index: 0;
  overflow: hidden;

  @media (min-width: 481px) {
    .react-player {
      display: block;
    }
    .background-image {
      display: none;
    }
  }

  @media (max-width: 480px) {
    background-image: url(${img7});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    .react-player {
      display: none;
    }
    .background-image {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 110%;
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

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: relative;
  z-index: 2;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const StyledCTAButton = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 16px;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 5px rgba(0, 255, 255, 0.1);
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0.9;

  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );

  &:hover {
    opacity: 1;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const BackedBySection = styled.div`
  text-align: center;
  padding: 2rem 0;
  margin-bottom: 2rem;

  h3 {
    color: ${props => props.theme.text};
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0;
  }
`;

const BackedByLogos = styled.div`
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  position: relative;

  .logos-slide {
    display: flex;
    animation: slide 20s linear infinite;
  }

  .logos-slide > div {
    display: flex;
    gap: 4rem;
  }

  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    .logos-slide > div {
      gap: 2rem;
    }
  }

  @media (max-width: 480px) {
    .logos-slide > div {
      gap: 1rem;
    }
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
  filter: grayscale(0%);
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(0%) brightness(1.2);
  }

  @media (max-width: 768px) {
    height: 30px;
  }

  @media (max-width: 480px) {
    height: 25px;
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
  margin-bottom: 2rem;

  h2 {
    color: ${props => props.theme.text};
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .slick-slider {
    padding: 0 1rem;
  }

  .slick-slide {
    padding: 0 0.5rem;
  }

  .slick-dots {
    margin-top: 1rem;
    li button:before {
      color: ${props => props.theme.text};
      font-size: 12px;
      opacity: 0.5;
    }
    li.slick-active button:before {
      opacity: 1;
      color: var(--primary-color);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    h2 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    h2 {
      font-size: 1.2rem;
    }
    .slick-slider {
      padding: 0 0.2rem; /* Reducimos el padding lateral para que las tarjetas ocupen más espacio */
    }
    .slick-slide {
      padding: 0 0.2rem; /* Reducimos el padding entre tarjetas */
    }
  }
`;

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  z-index: 1000;
  display: ${props => (props.isOpen ? 'block' : 'none')};

  @media (max-width: 480px) {
    width: 250px;
    bottom: 10px;
    right: 10px;
  }
`;

const ChatbotHeader = styled.div`
  background: rgba(255, 64, 255, 0.2);
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
`;

const ChatbotBody = styled.div`
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

const ChatbotMessage = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: ${props => (props.isUser ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 64, 255, 0.2)')};
  border-radius: 5px;
  color: #ffffff;
  font-size: 0.9rem;
`;

const ChatbotInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 5px;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ChatbotToggle = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: rgba(0, 255, 255, 0.3);
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

// Animaciones (sin cambios)
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const featureVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const backedByVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const chatbotVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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

const backedByLogos = [
  { src: microsoftLogo, alt: 'Microsoft' },
  { src: awsLogo, alt: 'AWS' },
  { src: sharkLogo, alt: 'SHARK' },
  { src: googleLogo, alt: 'Google for Startups' },
  { src: bnbChainLogo, alt: 'BNB Chain' },
  { src: tonLogo, alt: 'TON' },
];

// Ajustamos las configuraciones del slider para que las tarjetas ocupen más espacio en móvil
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true, // Centramos la tarjeta en la vista móvil
        centerPadding: '10px', // Reducimos el padding para que la tarjeta ocupe más espacio
      },
    },
  ],
};

function Home() {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setTimeout(() => {
        const response = getChatbotResponse(input);
        setMessages(prev => [...prev, { text: response, isUser: false }]);
      }, 500);
      setInput('');
    }
  };

  const getChatbotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('help') || lowerMessage.includes('ayuda')) {
      return '¡Hola! Soy el asistente de ETNIA. Puedo ayudarte a lanzar un proyecto o unirte a una preventa. ¿En qué te ayudo?';
    } else if (lowerMessage.includes('launch') || lowerMessage.includes('lanzar')) {
      return 'Para lanzar un proyecto, ve a "Create a Sale". Necesitarás un token y detalles de la preventa. ¿Quieres más detalles?';
    } else if (lowerMessage.includes('presale') || lowerMessage.includes('preventa')) {
      return 'Mira nuestras preventas destacadas arriba o visita "Launchpad List" para explorar más.';
    } else if (lowerMessage.includes('ai') || lowerMessage.includes('inteligencia')) {
      return 'Nuestra IA analiza mercados en tiempo real para darte insights sobre las mejores preventas. ¡Pregunta por predicciones!';
    } else {
      return 'No estoy seguro de cómo ayudarte con eso. ¿Puedes darme más contexto o preguntar algo sobre ETNIA?';
    }
  };

  return (
    <HomeContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      theme={theme}
    >
      <HeroSection>
        <HeroBackground>
          <ReactPlayer
            className="react-player"
            url={launchpadIntroVideo}
            playing
            loop
            muted
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
          />
          <div className="background-image" />
        </HeroBackground>
        <VideoOverlay />
        <Title theme={theme}>Welcome to ETNIA Launchpad</Title>
        <Subtitle theme={theme}>
          The future of token launches with blockchain security and AI-powered insights.
        </Subtitle>
        <CTAButtons>
          <StyledCTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/launchpad'}
          >
            Explore
          </StyledCTAButton>
          <StyledCTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/create'}
          >
            Create Presale
          </StyledCTAButton>
          <StyledCTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Agent AI
          </StyledCTAButton>
        </CTAButtons>
      </HeroSection>

      <BackedBySection
        theme={theme}
        variants={backedByVariants}
        initial="hidden"
        animate="visible"
      >
        <h3>Backed by</h3>
        <BackedByLogos>
          <div className="logos-slide">
            <div>
              {backedByLogos.map((logo, index) => (
                <motion.div
                  key={`first-${index}`}
                  variants={logoVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <LogoImage src={logo.src} alt={logo.alt} />
                </motion.div>
              ))}
            </div>
            <div>
              {backedByLogos.map((logo, index) => (
                <motion.div
                  key={`second-${index}`}
                  variants={logoVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <LogoImage src={logo.src} alt={logo.alt} />
                </motion.div>
              ))}
            </div>
          </div>
        </BackedByLogos>
      </BackedBySection>

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
              whileHover={{ scale: 1.02 }}
            >
              <PoolCard pool={pool} timeLeft={timeLeft[pool.id]} />
            </motion.div>
          ))}
        </Slider>
      </FeaturedPools>

      <ChatbotContainer
        isOpen={isChatOpen}
        variants={chatbotVariants}
        initial="hidden"
        animate={isChatOpen ? 'visible' : 'hidden'}
      >
        <ChatbotHeader onClick={() => setIsChatOpen(!isChatOpen)}>
          ETNIA AI Assistant
        </ChatbotHeader>
        <ChatbotBody>
          {messages.map((msg, index) => (
            <ChatbotMessage key={index} isUser={msg.isUser}>
              {msg.text}
            </ChatbotMessage>
          ))}
        </ChatbotBody>
        <form onSubmit={handleSendMessage}>
          <ChatbotInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
        </form>
      </ChatbotContainer>
      <ChatbotToggle onClick={() => setIsChatOpen(!isChatOpen)} whileHover={{ scale: 1.1 }}>
        💬
      </ChatbotToggle>
    </HomeContainer>
  );
}

export default Home;