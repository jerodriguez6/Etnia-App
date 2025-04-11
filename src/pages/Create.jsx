import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
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
import videoFile from '../assets/videos/video.mp4'; // Asegúrate de tener tu video aquí

// Animación para los puntos
const dotAnimation = keyframes`
  0%, 20% { opacity: 0.4; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
  60% { opacity: 0.4; transform: translateY(0); }
  100% { opacity: 0.4; transform: translateY(0); }
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
  background: #1a1a1a;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #00d4ff, #ff00ff) 1; /* Gradiente más suave */
  border-radius: 4px; /* Bordes más suaves */
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2); /* Sombra más sutil */
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
`;

const StyledCancelButton = styled(StyledButton)`
  background: linear-gradient(45deg, #444, #666);
  border-image: linear-gradient(45deg, #444, #666) 1;

  &:hover {
    box-shadow: 0 0 10px rgba(255, 64, 255, 0.4);
  }
`;

const CreatePresaleButton = styled(StyledButton)`
  padding: 0.8rem 1.5rem; /* Reducido para un tamaño más pequeño */
  font-size: 1rem; /* Texto más pequeño */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;

  &.form-open {
    background: transparent;
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
    &:hover {
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
      transform: translateY(-2px);
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

const CreatePresaleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0; /* Reducido */
  background: #1a1a1a;
  padding: 0.5rem; /* Reducido */
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin: 0.8rem 0;
    padding: 0.4rem;
  }

  @media (max-width: 480px) {
    margin: 0.5rem 0;
    padding: 0.3rem;
  }
`;

const VideoContainer = styled(motion.div)`
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const JoinNowButton = styled(StyledButton)`
  background: transparent;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%);

  &:hover {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
    transform: translateY(-5px);
  }

  @media (max-width: 480px) {
    padding: 0.2rem 0.5rem;
    font-size: 0.5rem;
  }
`;

const FeaturedSection = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding: 1rem 0;
  position: relative;
  z-index: 2;
  background: #1a1a1a;
  width: 100%;
  box-sizing: border-box;

  .slick-slider {
    width: 100%;
    box-sizing: border-box;
  }

  .slick-list {
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    padding: 0 0.5rem;
    display: flex !important;
    justify-content: center;
    align-items: center;
    min-height: 150px;
  }

  .slick-dots {
    margin-top: 1rem;
    li button:before {
      color: var(--text-light);
      font-size: 12px;
      opacity: 0.5;
    }
    li.slick-active button:before {
      opacity: 1;
      color: var(--primary-color);
    }
  }

  @media (max-width: 768px) {
    margin: 2rem auto 0;
    padding: 0.5rem 0;
    .slick-slide {
      padding: 0 0.3rem;
      min-height: 130px;
    }
  }

  @media (max-width: 480px) {
    margin: 1rem auto 0;
    padding: 0.5rem 0;
    .slick-slider {
      padding: 0;
    }
    .slick-slide {
      padding: 0 0.1rem;
      min-height: 100px;
    }
    .slick-list {
      overflow: hidden;
    }
  }
`;

const SectionTitle = styled.h2`
  color: var(--text-light);
  text-shadow: 0 0 10px rgba(255, 64, 255, 0.6);
  margin: 0 auto 1.5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  position: relative;
  z-index: 3;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 0.5rem auto;
    padding: 0 0.5rem;
  }
`;

const CarouselCard = styled(motion.div)`
  background: #1a1a1a;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  border-radius: 0;
  padding: 0.6rem;
  margin: 0 auto;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: var(--text-light);
  text-align: center;
  min-height: 150px;
  width: 200px;
  clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
  }

  @media (max-width: 1024px) {
    width: 180px;
    min-height: 140px;
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 160px;
    min-height: 130px;
    padding: 0.4rem;
  }

  @media (max-width: 480px) {
    width: 140px;
    min-height: 100px;
    padding: 0.3rem;
    clip-path: polygon(5% 0, 100% 0, 100% 85%, 95% 100%, 0 100%, 0 5%);
  }
`;

const CardImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 0 auto 0.4rem;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.3);

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    margin-bottom: 0.3rem;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    margin-bottom: 0.2rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.5);
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.55rem;
    margin-bottom: 0.1rem;
    line-height: 1;
  }
`;

const CardDetail = styled.p`
  font-size: 0.65rem;
  margin: 0.1rem 0;
  color: #ffffff;
  text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.45rem;
    margin: 0.05rem 0;
    line-height: 1;
  }
`;

const NetworkLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.55rem;
  color: #ffffff;
  background: #2a2a2a;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  margin-top: 0.3rem;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 0.5rem;
    padding: 0.15rem 0.4rem;
    margin-top: 0.2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.4rem;
    padding: 0.1rem 0.3rem;
    margin-top: 0.1rem;
  }
`;

const AIAssistantContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #1a1a1a;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  z-index: 1000;
  color: var(--text-light);
  font-family: 'Roboto', sans-serif;
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
    font-size: 0.8rem;
    bottom: 5px;
    right: 5px;
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
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
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
  vertical-align: middle;

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
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.5);

  &:hover {
    color: var(--primary-color);
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const AIAssistantMessage = styled.div`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);

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
  text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);

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
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
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
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;

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
  background: #2a2a2a;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  padding: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-light);
  text-align: center;

  &:hover {
    background: #3a3a3a;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
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
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);

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

const CreateContainer = styled(motion.div)`
  max-width: 800px; /* Reducido para un tamaño más proporcional */
  margin: 1rem auto; /* Reducido */
  padding: 1.5rem; /* Reducido */
  background: #1a1a1a;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #00d4ff, #ff00ff) 1; /* Gradiente más suave */
  border-radius: 8px; /* Bordes más suaves */
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); /* Sombra más sutil */
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    max-width: 98%;
    margin: 0.8rem auto;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    margin: 0.5rem auto;
    padding: 0.8rem;
  }
`;

const PresaleTitle = styled.h1`
  color: var(--text-dark);
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
  margin-bottom: 1rem; /* Reducido */
  text-align: center;
  font-size: 1.8rem; /* Reducido */
  font-weight: bold;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const StepContainer = styled.div`
  margin-bottom: 1rem; /* Reducido */
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #00d4ff, #ff00ff) 1;
  border-radius: 8px;
  background: #1a1a1a;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);

  @media (max-width: 480px) {
    margin-bottom: 0.8rem;
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem; /* Reducido */
  background: #333; /* Fondo más oscuro para un look profesional */
  cursor: pointer;
  color: var(--text-light);
  font-size: 1.2rem; /* Reducido */
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  border-radius: 6px 6px 0 0;

  &:hover {
    background: #444;
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
  width: 24px; /* Reducido */
  height: 24px; /* Reducido */
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  margin-right: 0.6rem;
  font-size: 0.9rem; /* Reducido */

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    margin-right: 0.4rem;
  }
`;

const StepContent = styled(motion.div)`
  padding: 1rem; /* Reducido */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; /* Reducido */
  background: #1a1a1a;
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
  gap: 0.5rem; /* Reducido */
`;

const Label = styled.label`
  color: var(--text-dark);
  font-size: 0.9rem; /* Reducido */
  text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Input = styled(motion.input)`
  padding: 0.6rem; /* Reducido */
  font-size: 0.9rem; /* Reducido */
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  background: #2a2a2a;
  color: var(--text-dark);
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
    border-color: var(--secondary-color);
  }

  &:invalid {
    border-color: #dc3545;
    box-shadow: 0 0 5px rgba(220, 53, 69, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    font-size: 0.8rem;
  }
`;

const Select = styled(motion.select)`
  padding: 0.6rem; /* Reducido */
  font-size: 0.9rem; /* Reducido */
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  background: #2a2a2a;
  color: var(--text-dark);
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
    border-color: var(--secondary-color);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    font-size: 0.8rem;
  }
`;

const ErrorMessage = styled.p`
  color: var(--primary-color);
  font-size: 0.8rem; /* Reducido */
  margin-top: -0.3rem;
  margin-bottom: 0.3rem;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin-top: -0.2rem;
    margin-bottom: 0.2rem;
  }
`;

const Summary = styled(motion.div)`
  background: #1a1a1a;
  padding: 1.5rem; /* Reducido */
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #00d4ff, #ff00ff) 1;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  margin-top: 1rem; /* Reducido */
  display: block;

  h3 {
    font-size: 1.5rem; /* Reducido */
    margin-bottom: 1rem;
    text-align: center;
    color: var(--text-dark);
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  }

  p {
    font-size: 0.9rem; /* Reducido */
    margin: 0.3rem 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 0.8rem;

    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    margin-top: 0.5rem;

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
  background: #2a2a2a;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  color: var(--text-light);

  h4 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
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

// Animaciones
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
    description: 'Ultra-fast, low fees, high scalability. Perfect for memecoins.',
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

function AIAssistant({ formData, errors, activeField, showSummary }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showSummary) {
      setMessage(
        <div>
          <p>¡Tu presale está listo para ser creado! Aquí tienes algunas sugerencias para que sea más exitoso:</p>
          <SuggestionList>
            <SuggestionItem><strong>Auditoría del Contrato:</strong> Asegúrate de que tu contrato esté auditado.</SuggestionItem>
            <SuggestionItem><strong>Redes Sociales:</strong> Publica tu proyecto en Twitter y Telegram.</SuggestionItem>
            <SuggestionItem><strong>Comunidad:</strong> Crea una comunidad activa en Discord o Telegram.</SuggestionItem>
            <SuggestionItem><strong>Precio:</strong> Revisa que el precio sea competitivo para {formData.selectedChain}.</SuggestionItem>
            <SuggestionItem><strong>Documentación:</strong> Proporciona un whitepaper claro.</SuggestionItem>
          </SuggestionList>
        </div>
      );
      return;
    }

    if (!formData.selectedChain) {
      setMessage('Por favor, selecciona una blockchain para comenzar.');
      return;
    }

    switch (activeField) {
      case 'projectName':
        setMessage('Ingresa el nombre de tu proyecto.');
        break;
      case 'tokenSymbol':
        setMessage('Ingresa el símbolo de tu token (ejemplo: SSTAR).');
        break;
      case 'tokenAddress':
        setMessage(`Ingresa la dirección del contrato para ${formData.selectedChain}.`);
        break;
      case 'salePrice':
        setMessage(`Define el precio de venta por token en ${formData.selectedChain}.`);
        break;
      case 'totalTokens':
        setMessage('Ingresa la cantidad total de tokens para la venta.');
        break;
      case 'minPurchase':
        setMessage('Define la compra mínima por usuario.');
        break;
      case 'maxPurchase':
        setMessage('Define la compra máxima por usuario.');
        break;
      case 'startDate':
        setMessage('Selecciona la fecha y hora de inicio del presale.');
        break;
      case 'endDate':
        setMessage('Selecciona la fecha y hora de finalización.');
        break;
      case 'liquidityUnlockTime':
        setMessage('Selecciona la fecha de desbloqueo de liquidez.');
        break;
      case 'creatorWallet':
        setMessage(`Ingresa la dirección de tu billetera para ${formData.selectedChain}.`);
        break;
      case 'logoUrl':
        setMessage('Ingresa la URL del logo de tu proyecto.');
        break;
      case 'website':
        setMessage('Ingresa la URL de la página web.');
        break;
      case 'twitter':
        setMessage('Ingresa la URL de Twitter.');
        break;
      case 'telegram':
        setMessage('Ingresa la URL de Telegram.');
        break;
      case 'purchaseToken':
        setMessage('Selecciona el token de compra.');
        break;
      default:
        setMessage(`¡Hola! Estoy aquí para ayudarte a crear tu presale en ${formData.selectedChain}.`);
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
        <StyledButton onClick={() => setIsMinimized(false)}>
          <BotIcon src={botImage} alt="IA Assistant" /> IA Asistente
        </StyledButton>
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
          <BotIcon src={botImage} alt="IA Assistant" /> IA Asistente
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
              onClick={() => onSelect(chain.name)}
            >
              <BlockchainLogo src={chain.logo} alt={`${chain.name} logo`} />
              <BlockchainTitle>{chain.name}</BlockchainTitle>
              <BlockchainDescription>{chain.description}</BlockchainDescription>
            </BlockchainCard>
          ))}
        </BlockchainGrid>
        <StyledCancelButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          Cancel
        </StyledCancelButton>
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
    creatorWallet: '',
    selectedChain: '',
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
    purchaseToken: false,
  });
  const [showVideo, setShowVideo] = useState(true); // Estado para controlar la visibilidad del video
  const { theme } = useTheme();
  const [contractAddress, setContractAddress] = useState('');

  const featuredPresales = [
    {
      name: 'SolanaStar',
      symbol: 'SSTAR',
      price: '0.03 SOL',
      progress: '0%',
      endDate: '2025-03-20',
      image: pool3Image,
      network: 'SOL',
    },
    {
      name: 'MoonEth',
      symbol: 'METH',
      price: '0.04 ETH',
      progress: '60%',
      endDate: '2025-03-12',
      image: pool4Image,
      network: 'ETH',
    },
    {
      name: 'BNBBoost',
      symbol: 'BNBB',
      price: '0.01 BNB',
      progress: '10%',
      endDate: '2025-03-05',
      image: pool5Image,
      network: 'BSC',
    },
    {
      name: 'SolRise',
      symbol: 'SRISE',
      price: '0.02 SOL',
      progress: '20%',
      endDate: '2025-03-15',
      image: pool6Image,
      network: 'SOL',
    },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease',
    pauseOnHover: false,
    arrows: true,
    centerMode: false,
    variableWidth: false,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false,
          variableWidth: false,
          centerPadding: '0px',
        },
      },
    ],
  };

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
    if (!formData.creatorWallet.trim()) newErrors.creatorWallet = 'Creator wallet address is required';
    if (!formData.selectedChain) newErrors.selectedChain = 'Please select a blockchain';
    if (!formData.logoUrl.trim()) newErrors.logoUrl = 'Logo URL is required';
    if (!formData.website.trim()) newErrors.website = 'Website URL is required';
    if (!formData.purchaseToken) newErrors.purchaseToken = 'Please select a purchase token';

    if (formData.selectedChain && formData.creatorWallet) {
      if (formData.selectedChain === 'Ethereum' && !formData.creatorWallet.startsWith('0x')) {
        newErrors.creatorWallet = 'Ethereum wallet address must start with 0x';
      }
      if (formData.selectedChain === 'Binance Smart Chain' && !formData.creatorWallet.startsWith('0x')) {
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
      creatorWallet: '',
      selectedChain: '',
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
    setShowVideo(true); // Volver a mostrar el video después de confirmar
  };

  const handleSelectChain = (chain) => {
    setFormData({ ...formData, selectedChain: chain });
    setIsModalOpen(false);
    setShowVideo(false); // Ocultar el video cuando se selecciona una cadena
  };

  const handleCreatePresaleClick = () => {
    if (formData.selectedChain) {
      // Si el formulario está abierto, cerrarlo
      setFormData({ ...formData, selectedChain: '' });
      setShowSummary(false);
      setErrors({});
      setActiveField(null);
      setContractAddress('');
      setShowVideo(true); // Mostrar el video al cancelar
    } else {
      // Si el formulario está cerrado, abrir el modal
      setIsModalOpen(true);
    }
  };

  const toggleStep = (step) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  return (
    <PageContainer>
      <FeaturedSection>
        <SectionTitle>Featured Presales</SectionTitle>
        <Slider {...carouselSettings}>
          {featuredPresales.map((presale, index) => (
            <CarouselCard
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <CardImage src={presale.image} alt={`${presale.name} logo`} />
              <CardTitle>{presale.name}</CardTitle>
              <CardDetail>Symbol: {presale.symbol}</CardDetail>
              <CardDetail>Price: {presale.price}</CardDetail>
              <CardDetail>Progress: {presale.progress}</CardDetail>
              <NetworkLabel>
                <span>{presale.network}</span>
              </NetworkLabel>
              <JoinNowButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </JoinNowButton>
            </CarouselCard>
          ))}
        </Slider>
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

        {/* Video que se muestra inicialmente */}
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
            <PresaleTitle>Create a Sale on {formData.selectedChain}</PresaleTitle>

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
                      value={formData.projectName}
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

              <StepContainer>
                <StepHeader onClick={() => toggleStep('purchaseToken')}>
                  <div>
                    <StepNumber>7</StepNumber> Purchase Token Selection
                  </div>
                  <span>{expandedSteps.purchaseToken ? '▼' : '▶'}</span>
                </StepHeader>
                <StepContent
                  variants={stepContentVariants}
                  initial="hidden"
                  animate={expandedSteps.purchaseToken ? 'visible' : 'hidden'}
                >
                  <FormGroup>
                    <Label>Purchase Token</Label>
                    <Select
                      name="purchaseToken"
                      value={formData.purchaseToken}
                      onChange={handleChange}
                      onFocus={() => handleFocus('purchaseToken')}
                      required
                    >
                      <option value="">Select Purchase Token</option>
                      <option value={blockchains.find(chain => chain.name === formData.selectedChain)?.nativeToken}>
                        {blockchains.find(chain => chain.name === formData.selectedChain)?.nativeToken} (Native Token)
                      </option>
                      <option value={blockchains.find(chain => chain.name === formData.selectedChain)?.stableToken}>
                        {blockchains.find(chain => chain.name === formData.selectedChain)?.stableToken} (Stablecoin)
                      </option>
                    </Select>
                    {errors.purchaseToken && <ErrorMessage>{errors.purchaseToken}</ErrorMessage>}
                  </FormGroup>
                </StepContent>
              </StepContainer>

              <StyledButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{ display: 'block', margin: '1rem auto 0', padding: '0.6rem 1.2rem', fontSize: '1rem' }}
              >
                Preview Pool
              </StyledButton>
            </form>

            <Summary
              variants={summaryVariants}
              initial="hidden"
              animate={showSummary ? 'visible' : 'hidden'}
              theme={theme}
            >
              <h3>Presale Summary</h3>
              <p><strong>Blockchain:</strong> {formData.selectedChain}</p>
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
              <StyledButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirm}
              >
                Confirm Creation
              </StyledButton>
              <StyledCancelButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSummary(false)}
                style={{ marginLeft: '1rem' }}
              >
                Cancel
              </StyledCancelButton>
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