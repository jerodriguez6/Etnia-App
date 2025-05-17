import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

// Importamos las imágenes de Launchpads.jsx
import pool1Image from '../assets/images/pool1.jpg';
import pool2Image from '../assets/images/pool2.jpg';
import pool3Image from '../assets/images/pool3.jpg';
import pool4Image from '../assets/images/pool4.png';
import pool5Image from '../assets/images/pool5.png';
import pool6Image from '../assets/images/pool6.png';

// Importamos los logos de las blockchains
import ethereumLogo from '../assets/images/eth-logo.png';
import bscLogo from '../assets/images/bnb-logo.png';
import solanaLogo from '../assets/images/sol-logo.png';
import polygonLogo from '../assets/images/polygon-logo.png';

// Importamos la imagen del asistente IA
import botImage from '../assets/images/bot1.png';

// Importamos el video
import videoFile from '../assets/videos/video1.mp4';

// URLs de los logotipos de USDT y USDC
const usdtLogo = 'https://assets.coingecko.com/coins/images/325/large/Tether.png';
const usdcLogo = 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png';

// Animación para los puntos
const dotAnimation = keyframes`
  0%, 20% { opacity: 0.4; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
  60% { opacity: 0.4; transform: translateY(0); }
  100% { opacity: 0.4; transform: translateY(0); }
`;

// Animación para el desplazamiento del carrusel
const slideAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const LoadingDots = styled.div`
  display: none;
  margin-top: 0.5rem;
  text-align: center;

  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
    gap: 0.3rem;
  }
`;

const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: ${dotAnimation} 1.5s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const PageContainer = styled.div`
  background: #00000a;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding: 1.5rem 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

const CreatePresaleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const VideoContainer = styled(motion.div)`
  margin-top: 1.5rem;
  max-width: 600px;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  box-shadow: var(--shadow-light);
  border-radius: var(--border-radius);
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 450px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    margin-top: 1rem;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CreatePresaleButton = styled(motion.button)`
  background: var(--primary-color);
  color: var(--text-dark);
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: var(--secondary-color);
    box-shadow: var(--shadow-hover);
  }

  &.form-open {
    background: var(--gray-light);
    &:hover {
      background: var(--secondary-color);
      box-shadow: var(--shadow-hover);
    }
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

const CreateContainer = styled(motion.div)`
  background: var(--background-light);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  width: 100%;
  max-width: 800px;
  margin: 2rem 0;

  @media (max-width: 768px) {
    max-width: 98%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 1rem;
  }
`;

const PresaleTitle = styled.h1`
  color: var(--text-dark);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const StepContainer = styled.div`
  margin-bottom: 1rem;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  border-radius: var(--border-radius);
  background: var(--background-dark);
  box-shadow: var(--shadow-light);

  @media (max-width: 480px) {
    margin-bottom: 0.8rem;
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--gray-light);
  cursor: pointer;
  color: var(--text-light);
  font-size: 1.2rem;
  border-radius: 6px 6px 0 0;

  &:hover {
    background: var(--gray-light);
    filter: brightness(1.2);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--text-dark);
  margin-right: 0.6rem;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    margin-right: 0.4rem;
  }
`;

const StepContent = styled(motion.div)`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: var(--background-dark);
  border-radius: 0 0 6px 6px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.8rem;
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    gap: 0.6rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-light);
  font-size: 0.9rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Input = styled(motion.input)`
  padding: 0.8rem;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: var(--background-dark);
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: var(--shadow-hover);
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
`;

const Select = styled(motion.select)`
  padding: 0.8rem;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: var(--background-dark);
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: var(--shadow-hover);
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
  cursor: pointer;

  input[type="radio"] {
    accent-color: var(--primary-color);
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const TokenIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const ErrorMessage = styled.p`
  color: var(--primary-color);
  font-size: 0.8rem;
  margin-top: 0.2rem;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const SubmitButton = styled(motion.button)`
  background: var(--primary-color);
  color: var(--text-dark);
  padding: 0.8rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: var(--secondary-color);
    box-shadow: var(--shadow-hover);
  }

  &:disabled {
    background: var(--gray-light);
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
`;

const CancelButton = styled(motion.button)`
  background: var(--gray-light);
  color: var(--text-light);
  padding: 0.8rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: var(--secondary-color);
    color: var(--text-dark);
    box-shadow: var(--shadow-hover);
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
`;

const FeaturedSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 3rem 0;
  overflow: hidden;
  position: relative;
`;

const SectionTitle = styled.h2`
  color: var(--text-dark);
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  letter-spacing: 0.05rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  width: ${(props) => props.cardCount * 360}px;
  animation: ${slideAnimation} 40s linear infinite;
  animation-play-state: running;

  &:hover {
    animation-play-state: paused;
  }

  @media (max-width: 768px) {
    width: ${(props) => props.cardCount * 320}px;
  }

  @media (max-width: 480px) {
    width: ${(props) => props.cardCount * 280}px;
  }
`;

const FeaturedCard = styled(motion.div)`
  background: var(--background-light);
  padding: 0.8rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  color: var(--text-dark);
  flex: 0 0 auto;
  width: fit-content;
  height: 100px;
  margin: 0 0.8rem;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  clip-path: polygon(
    8px 0,
    calc(100% - 8px) 0,
    100% 8px,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    8px 100%,
    0 calc(100% - 8px),
    0 8px
  );

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
  }

  @media (max-width: 768px) {
    height: 90px;
    padding: 0.6rem;
    margin: 0 0.6rem;
  }

  @media (max-width: 480px) {
    height: 80px;
    padding: 0.5rem;
    margin: 0 0.5rem;
  }
`;

const CardImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  text-align: left;
`;

const CardTitle = styled.h3`
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
  color: var(--text-dark);
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const NetworkLogo = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-top: 0.2rem;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
`;

const JoinNowButton = styled(motion.button)`
  background: var(--primary-color);
  color: var(--text-dark);
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  clip-path: polygon(
    4px 0,
    calc(100% - 4px) 0,
    100% 4px,
    100% calc(100% - 4px),
    calc(100% - 4px) 100%,
    4px 100%,
    0 calc(100% - 4px),
    0 4px
  );

  &:hover {
    background: var(--secondary-color);
    box-shadow: var(--shadow-hover);
  }

  @media (max-width: 768px) {
    padding: 0.2rem 0.4rem;
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    padding: 0.15rem 0.35rem;
    font-size: 0.6rem;
  }
`;

const AIAssistantContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--background-light);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  border-radius: var(--border-radius);
  padding: 1rem;
  max-width: 300px;
  box-shadow: var(--shadow-light);
  z-index: 1000;
  color: var(--text-light);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    max-width: 250px;
    padding: 0.8rem;
    bottom: 10px;
    right: 10px;
  }

  @media (max-width: 480px) {
    max-width: 200px;
    padding: 0.6rem;
    bottom: 5px;
    right: 5px;
    font-size: 0.8rem;
  }
`;

const AIAssistantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const AIAssistantTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const BotIcon = styled.img`
  width: 24px;
  height: 24px;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const MinimizeButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const AIAssistantMessage = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--text-light);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SuggestionList = styled.ul`
  margin: 0;
  padding-left: 1rem;
  list-style-type: disc;
`;

const SuggestionItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-light);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

const ModalContent = styled(motion.div)`
  background: var(--background-light);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  max-width: 800px;
  width: 90%;
  text-align: center;
  z-index: 10002;
  position: relative;

  @media (max-width: 480px) {
    width: 95%;
    padding: 1rem;
    max-height: 80vh;
    overflow-y: auto;
  }
`;

const ModalTitle = styled.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const BlockchainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

const BlockchainCard = styled(motion.div)`
  background: var(--background-dark);
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  padding: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-light);
  text-align: center;

  &:hover {
    background: var(--gray-light);
    box-shadow: var(--shadow-hover);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const BlockchainLogo = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 auto 0.4rem;
  border-radius: 50%;
  box-shadow: var(--shadow-light);

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin-bottom: 0.3rem;
  }
`;

const BlockchainTitle = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  color: var(--text-dark);

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-bottom: 0.3rem;
  }
`;

const BlockchainDescription = styled.p`
  font-size: 0.7rem;
  color: var(--text-light);

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const Summary = styled(motion.div)`
  background: var(--background-light);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--text-dark);
  }

  p {
    font-size: 0.9rem;
    margin: 0.3rem 0;
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    h3 {
      font-size: 1.3rem;
    }
    p {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    h3 {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const ContractDisplay = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: var(--background-dark);
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  color: var(--text-light);

  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    h4 {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    h4 {
      font-size: 0.8rem;
    }
  }
`;

// Animations
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

const summaryVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const aiAssistantVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const stepContentVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
};

const videoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const blockchains = [
  {
    name: 'Ethereum',
    description: 'High security, extensive dApp ecosystem, higher gas fees.',
    logo: ethereumLogo,
    nativeToken: 'ETH',
    stableToken: 'USDT',
  },
  {
    name: 'Binance Smart Chain',
    description: 'Low gas fees, fast transactions, EVM compatible.',
    logo: bscLogo,
    nativeToken: 'BNB',
    stableToken: 'USDT',
  },
  {
    name: 'Solana',
    description: 'Ultra-fast, low fees, high scalability.',
    logo: solanaLogo,
    nativeToken: 'SOL',
    stableToken: 'USDT',
  },
  {
    name: 'Polygon',
    description: 'Low gas fees, scalable, fast. Ethereum compatible.',
    logo: polygonLogo,
    nativeToken: 'MATIC',
    stableToken: 'USDT',
  },
];

const featuredPresales = [
  {
    name: 'SolanaStar',
    symbol: 'SSTAR',
    price: '0.03 SOL',
    progress: '0%',
    endDate: '2025-03-20',
    image: pool3Image,
    network: 'SOL',
    networkLogo: solanaLogo,
  },
  {
    name: 'MoonEth',
    symbol: 'METH',
    price: '0.04 ETH',
    progress: '60%',
    endDate: '2025-03-12',
    image: pool4Image,
    network: 'ETH',
    networkLogo: ethereumLogo,
  },
  {
    name: 'BNBBoost',
    symbol: 'BNBB',
    price: '0.01 BNB',
    progress: '10%',
    endDate: '2025-03-05',
    image: pool5Image,
    network: 'BSC',
    networkLogo: bscLogo,
  },
  {
    name: 'SolRise',
    symbol: 'SRISE',
    price: '0.02 SOL',
    progress: '20%',
    endDate: '2025-03-15',
    image: pool6Image,
    network: 'SOL',
    networkLogo: solanaLogo,
  },
];

// Duplicamos las tarjetas para crear un efecto de bucle infinito
const doubledPresales = [...featuredPresales, ...featuredPresales];

function AIAssistant({ formData, errors, activeField, showSummary }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showSummary) {
      setMessage(
        <div>
          <p>Your presale is ready to be created! Here are some suggestions:</p>
          <SuggestionList>
            <SuggestionItem><strong>Audit Contract:</strong> Ensure your contract is audited.</SuggestionItem>
            <SuggestionItem><strong>Social Media:</strong> Promote on Twitter and Telegram.</SuggestionItem>
            <SuggestionItem><strong>Community:</strong> Build an active Discord or Telegram community.</SuggestionItem>
            <SuggestionItem><strong>Price:</strong> Ensure the price is competitive for {formData.selectedChain?.name}.</SuggestionItem>
            <SuggestionItem><strong>Documentation:</strong> Provide a clear whitepaper.</SuggestionItem>
          </SuggestionList>
        </div>
      );
      return;
    }

    if (!formData.selectedChain) {
      setMessage('Please select a blockchain to start.');
      return;
    }

    switch (activeField) {
      case 'projectName':
        setMessage('Enter your project name.');
        break;
      case 'tokenSymbol':
        setMessage('Enter your token symbol (e.g., SSTAR).');
        break;
      case 'tokenAddress':
        setMessage(`Enter the contract address for ${formData.selectedChain.name}.`);
        break;
      case 'salePrice':
        setMessage(`Define the sale price per token in ${formData.selectedChain.name}.`);
        break;
      case 'totalTokens':
        setMessage('Enter the total tokens for the sale.');
        break;
      case 'minPurchase':
        setMessage('Define the minimum purchase per user.');
        break;
      case 'maxPurchase':
        setMessage('Define the maximum purchase per user.');
        break;
      case 'startDate':
        setMessage('Select the presale start date and time.');
        break;
      case 'endDate':
        setMessage('Select the presale end date and time.');
        break;
      case 'liquidityUnlockTime':
        setMessage('Select the liquidity unlock date.');
        break;
      case 'liquidityPercentage':
        setMessage('Select the percentage of liquidity to lock (up to 60%).');
        break;
      case 'creatorWallet':
        setMessage(`Enter your wallet address for ${formData.selectedChain.name}.`);
        break;
      case 'logoUrl':
        setMessage('Enter the URL for your project logo.');
        break;
      case 'website':
        setMessage('Enter the website URL.');
        break;
      case 'twitter':
        setMessage('Enter the Twitter URL.');
        break;
      case 'telegram':
        setMessage('Enter the Telegram URL.');
        break;
      case 'purchaseToken':
        setMessage('Select the purchase token.');
        break;
      default:
        setMessage(`Hello! I'm here to help you create your presale on ${formData.selectedChain.name}.`);
    }

    if (errors[activeField]) {
      setMessage(errors[activeField]);
    }
  }, [activeField, formData, errors, showSummary]);

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
      >
        <SubmitButton onClick={() => setIsMinimized(false)}>
          <BotIcon src={botImage} alt="IA Assistant" /> AI Assistant
        </SubmitButton>
      </motion.div>
    );
  }

  return (
    <AIAssistantContainer
      variants={aiAssistantVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <AIAssistantHeader>
        <AIAssistantTitle>
          <BotIcon src={botImage} alt="IA Assistant" /> AI Assistant
        </AIAssistantTitle>
        <MinimizeButton onClick={() => setIsMinimized(true)}>−</MinimizeButton>
      </AIAssistantHeader>
      <AIAssistantMessage>{message}</AIAssistantMessage>
    </AIAssistantContainer>
  );
}

function BlockchainModal({ isOpen, onClose, onSelect }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
        <ModalTitle>Select Chain</ModalTitle>
        <BlockchainGrid>
          {blockchains.map((chain, index) => (
            <BlockchainCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              onClick={() => onSelect(chain)}
            >
              <BlockchainLogo src={chain.logo} alt={`${chain.name} logo`} />
              <BlockchainTitle>{chain.name}</BlockchainTitle>
              <BlockchainDescription>{chain.description}</BlockchainDescription>
            </BlockchainCard>
          ))}
        </BlockchainGrid>
        <CancelButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          Cancel
        </CancelButton>
      </ModalContent>
    </ModalOverlay>
  );
}

function CreatePresale() {
  const [formData, setFormData] = useState({
    launchType: '',
    projectName: '',
    tokenSymbol: '',
    tokenAddress: '',
    salePrice: '',
    totalTokens: '',
    minPurchase: '',
    maxPurchase: '',
    startDate: '',
    endDate: '',
    liquidityUnlockTime: '',
    liquidityPercentage: '',
    creatorWallet: '',
    selectedChain: null,
    logoUrl: '',
    website: '',
    twitter: '',
    telegram: '',
    purchaseToken: '',
  });

  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState({
    launchType: true,
    tokenInfo: false,
    presaleInfo: false,
    tokenDistribution: false,
    presaleTimings: false,
    projectInfo: false,
  });
  const [showVideo, setShowVideo] = useState(true);
  const { theme } = useTheme();
  const [contractAddress, setContractAddress] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.launchType) newErrors.launchType = 'Launch type is required';
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required';
    if (!formData.tokenAddress.trim()) newErrors.tokenAddress = 'Token address is required';
    if (!formData.salePrice.trim()) newErrors.salePrice = 'Sale price is required';
    if (!formData.totalTokens.trim()) newErrors.totalTokens = 'Total tokens is required';
    if (!formData.minPurchase.trim()) newErrors.minPurchase = 'Minimum purchase is required';
    if (!formData.maxPurchase.trim()) newErrors.maxPurchase = 'Maximum purchase is required';
    if (!formData.startDate.trim()) newErrors.startDate = 'Start date is required';
    if (!formData.endDate.trim()) newErrors.endDate = 'End date is required';
    if (!formData.liquidityUnlockTime.trim()) newErrors.liquidityUnlockTime = 'Liquidity unlock time is required';
    if (!formData.liquidityPercentage.trim()) newErrors.liquidityPercentage = 'Liquidity percentage is required';
    if (parseFloat(formData.liquidityPercentage) > 60) newErrors.liquidityPercentage = 'Liquidity percentage cannot exceed 60%';
    if (!formData.creatorWallet.trim()) newErrors.creatorWallet = 'Creator wallet address is required';
    if (!formData.selectedChain) newErrors.selectedChain = 'Please select a blockchain';
    if (!formData.logoUrl.trim()) newErrors.logoUrl = 'Logo URL is required';
    if (!formData.website.trim()) newErrors.website = 'Website URL is required';
    if (!formData.purchaseToken) newErrors.purchaseToken = 'Please select a purchase token';

    if (formData.selectedChain && formData.creatorWallet) {
      if (formData.selectedChain.name === 'Ethereum' && !formData.creatorWallet.startsWith('0x')) {
        newErrors.creatorWallet = 'Ethereum wallet address must start with 0x';
      }
      if (formData.selectedChain.name === 'Binance Smart Chain' && !formData.creatorWallet.startsWith('0x')) {
        newErrors.creatorWallet = 'BSC wallet address must start with 0x';
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setShowSummary(true);
      setContractAddress(`0x${Math.random().toString(16).slice(2, 42)}`);
    } else {
      setErrors(newErrors);
      setShowSummary(false);
    }
  };

  const handleConfirm = () => {
    console.log('Presale Created:', formData);
    alert('Presale created successfully!');
    setFormData({
      launchType: '',
      projectName: '',
      tokenSymbol: '',
      tokenAddress: '',
      salePrice: '',
      totalTokens: '',
      minPurchase: '',
      maxPurchase: '',
      startDate: '',
      endDate: '',
      liquidityUnlockTime: '',
      liquidityPercentage: '',
      creatorWallet: '',
      selectedChain: null,
      logoUrl: '',
      website: '',
      twitter: '',
      telegram: '',
      purchaseToken: '',
    });
    setErrors({});
    setShowSummary(false);
    setActiveField(null);
    setContractAddress('');
    setShowVideo(true);
  };

  const handleSelectChain = (chain) => {
    setFormData({ ...formData, selectedChain: chain, purchaseToken: '' });
    setIsModalOpen(false);
    setShowVideo(false);
  };

  const handleCreatePresaleClick = () => {
    if (formData.selectedChain) {
      setFormData({
        launchType: '',
        projectName: '',
        tokenSymbol: '',
        tokenAddress: '',
        salePrice: '',
        totalTokens: '',
        minPurchase: '',
        maxPurchase: '',
        startDate: '',
        endDate: '',
        liquidityUnlockTime: '',
        liquidityPercentage: '',
        creatorWallet: '',
        selectedChain: null,
        logoUrl: '',
        website: '',
        twitter: '',
        telegram: '',
        purchaseToken: '',
      });
      setErrors({});
      setShowSummary(false);
      setActiveField(null);
      setContractAddress('');
      setShowVideo(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const toggleStep = (step) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  const getNativeTokenLogo = () => {
    if (!formData.selectedChain) return '';
    switch (formData.selectedChain.name) {
      case 'Ethereum':
        return ethereumLogo;
      case 'Binance Smart Chain':
        return bscLogo;
      case 'Solana':
        return solanaLogo;
      case 'Polygon':
        return polygonLogo;
      default:
        return '';
    }
  };

  return (
    <PageContainer>
      <FeaturedSection>
        <SectionTitle>FEATURED PRESALES</SectionTitle>
        <CarouselContainer>
          <CarouselTrack
            cardCount={doubledPresales.length}
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          >
            {doubledPresales.map((presale, index) => (
              <FeaturedCard
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
              >
                <CardImage src={presale.image} alt={`${presale.name} logo`} />
                <CardContent>
                  <CardTitle>{presale.name}</CardTitle>
                  <NetworkLogo src={presale.networkLogo} alt={`${presale.network} logo`} />
                </CardContent>
                <JoinNowButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Now
                </JoinNowButton>
              </FeaturedCard>
            ))}
          </CarouselTrack>
        </CarouselContainer>
      </FeaturedSection>

      <CreatePresaleContainer>
        <CreatePresaleButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreatePresaleClick}
          className={formData.selectedChain ? 'form-open' : ''}
        >
          {formData.selectedChain ? (
            <>
              <span>✖</span> Cancel Creation
            </>
          ) : (
            'Create Presale'
          )}
        </CreatePresaleButton>

        <AnimatePresence>
          {showVideo && !formData.selectedChain && (
            <VideoContainer
              variants={videoVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Video autoPlay loop muted>
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </Video>
            </VideoContainer>
          )}
        </AnimatePresence>

        {!formData.selectedChain && (
          <LoadingDots>
            <Dot delay={0} />
            <Dot delay={0.2} />
            <Dot delay={0.4} />
          </LoadingDots>
        )}
      </CreatePresaleContainer>

      <BlockchainModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectChain}
      />

      {formData.selectedChain && (
        <>
          <CreateContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            theme={theme}
          >
            <PresaleTitle>Create a Sale on {formData.selectedChain.name}</PresaleTitle>

            <form onSubmit={handleSubmit}>
              <StepContainer>
                <StepHeader onClick={() => toggleStep('launchType')}>
                  <div>
                    <StepNumber>1</StepNumber> Select Launch Type
                  </div>
                  <span>{expandedSteps.launchType ? '▼' : '▶'}</span>
                </StepHeader>
                <StepContent
                  variants={stepContentVariants}
                  initial="hidden"
                  animate={expandedSteps.launchType ? 'visible' : 'hidden'}
                >
                  <FormGroup>
                    <Label>Launch Type</Label>
                    <Select
                      name="launchType"
                      value={formData.launchType}
                      onChange={handleChange}
                      onFocus={() => handleFocus('launchType')}
                      required
                    >
                      <option value="">Select Launch Type</option>
                      <option value="presale">Presale</option>
                      <option value="fairlaunch">Fair Launch</option>
                    </Select>
                    {errors.launchType && <ErrorMessage>{errors.launchType}</ErrorMessage>}
                  </FormGroup>
                </StepContent>
              </StepContainer>

              <StepContainer>
                <StepHeader onClick={() => toggleStep('tokenInfo')}>
                  <div>
                    <StepNumber>2</StepNumber> Token Information
                  </div>
                  <span>{expandedSteps.tokenInfo ? '▼' : '▶'}</span>
                </StepHeader>
                <StepContent
                  variants={stepContentVariants}
                  initial="hidden"
                  animate={expandedSteps.tokenInfo ? 'visible' : 'hidden'}
                >
                  <FormGroup>
                    <Label>Project Name</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="text"
                      name="projectName"
                      placeholder="Enter project name"
                      value={formData.projectName}
                      onChange={handleChange}
                      onFocus={() => handleFocus('projectName')}
                      required
                    />
                    {errors.projectName && <ErrorMessage>{errors.projectName}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Token Symbol</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="text"
                      name="tokenSymbol"
                      placeholder="Enter token symbol"
                      value={formData.tokenSymbol}
                      onChange={handleChange}
                      onFocus={() => handleFocus('tokenSymbol')}
                      required
                    />
                    {errors.tokenSymbol && <ErrorMessage>{errors.tokenSymbol}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Token Contract Address</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="text"
                      name="tokenAddress"
                      placeholder="Enter token contract address"
                      value={formData.tokenAddress}
                      onChange={handleChange}
                      onFocus={() => handleFocus('tokenAddress')}
                      required
                    />
                    {errors.tokenAddress && <ErrorMessage>{errors.tokenAddress}</ErrorMessage>}
                  </FormGroup>
                </StepContent>
              </StepContainer>

              <StepContainer>
                <StepHeader onClick={() => toggleStep('presaleInfo')}>
                  <div>
                    <StepNumber>3</StepNumber> Presale Information
                  </div>
                  <span>{expandedSteps.presaleInfo ? '▼' : '▶'}</span>
                </StepHeader>
                <StepContent
                  variants={stepContentVariants}
                  initial="hidden"
                  animate={expandedSteps.presaleInfo ? 'visible' : 'hidden'}
                >
                  <FormGroup>
                    <Label>Sale Price per Token</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="number"
                      step="0.000001"
                      name="salePrice"
                      placeholder="Enter sale price"
                      value={formData.salePrice}
                      onChange={handleChange}
                      onFocus={() => handleFocus('salePrice')}
                      required
                    />
                    {errors.salePrice && <ErrorMessage>{errors.salePrice}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Total Tokens for Sale</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="number"
                      step="0.000001"
                      name="totalTokens"
                      placeholder="Enter total tokens"
                      value={formData.totalTokens}
                      onChange={handleChange}
                      onFocus={() => handleFocus('totalTokens')}
                      required
                    />
                    {errors.totalTokens && <ErrorMessage>{errors.totalTokens}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Minimum Purchase</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="number"
                      step="0.000001"
                      name="minPurchase"
                      placeholder="Enter minimum purchase"
                      value={formData.minPurchase}
                      onChange={handleChange}
                      onFocus={() => handleFocus('minPurchase')}
                      required
                    />
                    {errors.minPurchase && <ErrorMessage>{errors.minPurchase}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Maximum Purchase</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="number"
                      step="0.000001"
                      name="maxPurchase"
                      placeholder="Enter maximum purchase"
                      value={formData.maxPurchase}
                      onChange={handleChange}
                      onFocus={() => handleFocus('maxPurchase')}
                      required
                    />
                    {errors.maxPurchase && <ErrorMessage>{errors.maxPurchase}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Select Purchase Token</Label>
                    <PaymentOption>
                      <input
                        type="radio"
                        name="purchaseToken"
                        value={formData.selectedChain.nativeToken}
                        checked={formData.purchaseToken === formData.selectedChain.nativeToken}
                        onChange={handleChange}
                        onFocus={() => handleFocus('purchaseToken')}
                      />
                      <TokenIcon src={getNativeTokenLogo()} alt={formData.selectedChain.nativeToken} />
                      {formData.selectedChain.nativeToken} (Native Token)
                    </PaymentOption>
                    <PaymentOption>
                      <input
                        type="radio"
                        name="purchaseToken"
                        value="USDT"
                        checked={formData.purchaseToken === 'USDT'}
                        onChange={handleChange}
                        onFocus={() => handleFocus('purchaseToken')}
                      />
                      <TokenIcon src={usdtLogo} alt="USDT" />
                      USDT
                    </PaymentOption>
                    <PaymentOption>
                      <input
                        type="radio"
                        name="purchaseToken"
                        value="USDC"
                        checked={formData.purchaseToken === 'USDC'}
                        onChange={handleChange}
                        onFocus={() => handleFocus('purchaseToken')}
                      />
                      <TokenIcon src={usdcLogo} alt="USDC" />
                      USDC
                    </PaymentOption>
                    {errors.purchaseToken && <ErrorMessage>{errors.purchaseToken}</ErrorMessage>}
                  </FormGroup>
                </StepContent>
              </StepContainer>

              <StepContainer>
                <StepHeader onClick={() => toggleStep('tokenDistribution')}>
                  <div>
                    <StepNumber>4</StepNumber> Token Distribution
                  </div>
                  <span>{expandedSteps.tokenDistribution ? '▼' : '▶'}</span>
                </StepHeader>
                <StepContent
                  variants={stepContentVariants}
                  initial="hidden"
                  animate={expandedSteps.tokenDistribution ? 'visible' : 'hidden'}
                >
                  <FormGroup>
                    <Label>Creator Wallet Address</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="text"
                      name="creatorWallet"
                      placeholder="Enter creator wallet address"
                      value={formData.creatorWallet}
                      onChange={handleChange}
                      onFocus={() => handleFocus('creatorWallet')}
                      required
                    />
                    {errors.creatorWallet && <ErrorMessage>{errors.creatorWallet}</ErrorMessage>}
                  </FormGroup>
                </StepContent>
              </StepContainer>

              <StepContainer>
                <StepHeader onClick={() => toggleStep('presaleTimings')}>
                  <div>
                    <StepNumber>5</StepNumber> Presale Timings
                  </div>
                  <span>{expandedSteps.presaleTimings ? '▼' : '▶'}</span>
                </StepHeader>
                <StepContent
                  variants={stepContentVariants}
                  initial="hidden"
                  animate={expandedSteps.presaleTimings ? 'visible' : 'hidden'}
                >
                  <FormGroup>
                    <Label>Presale Start Time</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      onFocus={() => handleFocus('startDate')}
                      required
                    />
                    {errors.startDate && <ErrorMessage>{errors.startDate}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Presale End Time</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      onFocus={() => handleFocus('endDate')}
                      required
                    />
                    {errors.endDate && <ErrorMessage>{errors.endDate}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Liquidity Unlock Time</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="datetime-local"
                      name="liquidityUnlockTime"
                      value={formData.liquidityUnlockTime}
                      onChange={handleChange}
                      onFocus={() => handleFocus('liquidityUnlockTime')}
                      required
                    />
                    {errors.liquidityUnlockTime && <ErrorMessage>{errors.liquidityUnlockTime}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Liquidity Lock Percentage (Max 60%)</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="number"
                      min="0"
                      max="60"
                      name="liquidityPercentage"
                      placeholder="Enter percentage (0-60)"
                      value={formData.liquidityPercentage}
                      onChange={handleChange}
                      onFocus={() => handleFocus('liquidityPercentage')}
                      required
                    />
                    {errors.liquidityPercentage && <ErrorMessage>{errors.liquidityPercentage}</ErrorMessage>}
                  </FormGroup>
                </StepContent>
              </StepContainer>

              <StepContainer>
                <StepHeader onClick={() => toggleStep('projectInfo')}>
                  <div>
                    <StepNumber>6</StepNumber> Project Information
                  </div>
                  <span>{expandedSteps.projectInfo ? '▼' : '▶'}</span>
                </StepHeader>
                <StepContent
                  variants={stepContentVariants}
                  initial="hidden"
                  animate={expandedSteps.projectInfo ? 'visible' : 'hidden'}
                >
                  <FormGroup>
                    <Label>Logo URL</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="url"
                      name="logoUrl"
                      placeholder="Enter logo URL"
                      value={formData.logoUrl}
                      onChange={handleChange}
                      onFocus={() => handleFocus('logoUrl')}
                      required
                    />
                    {errors.logoUrl && <ErrorMessage>{errors.logoUrl}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Website URL</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="url"
                      name="website"
                      placeholder="Enter website URL"
                      value={formData.website}
                      onChange={handleChange}
                      onFocus={() => handleFocus('website')}
                      required
                    />
                    {errors.website && <ErrorMessage>{errors.website}</ErrorMessage>}
                  </FormGroup>
                  <FormGroup>
                    <Label>Twitter URL (Optional)</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="url"
                      name="twitter"
                      placeholder="Enter Twitter URL"
                      value={formData.twitter}
                      onChange={handleChange}
                      onFocus={() => handleFocus('twitter')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Telegram URL (Optional)</Label>
                    <Input
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                      type="url"
                      name="telegram"
                      placeholder="Enter Telegram URL"
                      value={formData.telegram}
                      onChange={handleChange}
                      onFocus={() => handleFocus('telegram')}
                    />
                  </FormGroup>
                </StepContent>
              </StepContainer>

              <SubmitButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{ display: 'block', margin: '1rem auto 0' }}
              >
                Preview Pool
              </SubmitButton>
            </form>

            <Summary
              variants={summaryVariants}
              initial="hidden"
              animate={showSummary ? 'visible' : 'hidden'}
              theme={theme}
            >
              <h3>Presale Summary</h3>
              <p><strong>Blockchain:</strong> {formData.selectedChain?.name}</p>
              <p><strong>Launch Type:</strong> {formData.launchType}</p>
              <p><strong>Project Name:</strong> {formData.projectName}</p>
              <p><strong>Token Symbol:</strong> {formData.tokenSymbol}</p>
              <p><strong>Token Address:</strong> {formData.tokenAddress}</p>
              <p><strong>Sale Price:</strong> {formData.salePrice}</p>
              <p><strong>Total Tokens:</strong> {formData.totalTokens}</p>
              <p><strong>Min Purchase:</strong> {formData.minPurchase}</p>
              <p><strong>Max Purchase:</strong> {formData.maxPurchase}</p>
              <p><strong>Start Date:</strong> {formData.startDate}</p>
              <p><strong>End Date:</strong> {formData.endDate}</p>
              <p><strong>Liquidity Unlock Time:</strong> {formData.liquidityUnlockTime}</p>
              <p><strong>Liquidity Lock Percentage:</strong> {formData.liquidityPercentage}%</p>
              <p><strong>Creator Wallet:</strong> {formData.creatorWallet}</p>
              <p><strong>Logo URL:</strong> {formData.logoUrl}</p>
              <p><strong>Website:</strong> {formData.website}</p>
              {formData.twitter && <p><strong>Twitter:</strong> {formData.twitter}</p>}
              {formData.telegram && <p><strong>Telegram:</strong> {formData.telegram}</p>}
              <p><strong>Purchase Token:</strong> {formData.purchaseToken}</p>
              {contractAddress && (
                <ContractDisplay>
                  <h4>Presale Contract Address</h4>
                  <p>{contractAddress}</p>
                </ContractDisplay>
              )}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                <SubmitButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                >
                  Confirm Creation
                </SubmitButton>
                <CancelButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSummary(false)}
                >
                  Cancel
                </CancelButton>
              </div>
            </Summary>
          </CreateContainer>

          <AIAssistant
            formData={formData}
            errors={errors}
            activeField={activeField}
            showSummary={showSummary}
          />
        </>
      )}
    </PageContainer>
  );
}

export default CreatePresale;