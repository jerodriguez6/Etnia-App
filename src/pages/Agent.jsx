import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import botImage from '../assets/images/token.gif';
import agentBackground from '../assets/images/agent.webp';
import botPng from '../assets/images/ava.png';
import botPng2 from '../assets/images/bot.png';
import bot1Png from '../assets/images/bot1.png';
import svPng from '../assets/images/sv.png';
import { FaHome, FaCoins, FaRobot, FaCog, FaTelegram, FaChartLine, FaVoteYea, FaChartBar, FaWindowMinimize, FaWindowMaximize, FaTwitter, FaDiscord } from 'react-icons/fa';
// Importar el logo de $ETNIA



// Definir URLs de logos de CoinGecko (verifica las URLs exactas en CoinGecko)
const usdtLogo = 'https://assets.coingecko.com/coins/images/325/thumb/Tether.png';
const usdcLogo = 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Keyframes
const pulseGlow = keyframes`
  0% { filter: drop-shadow(0 0 20px rgba(0, 191, 255, 0.7)) drop-shadow(0 0 40px rgba(0, 191, 255, 0.5)); }
  50% { filter: drop-shadow(0 0 30px rgba(0, 191, 255, 0.9)) drop-shadow(0 0 50px rgba(0, 191, 255, 0.7)); }
  100% { filter: drop-shadow(0 0 20px rgba(0, 191, 255, 0.7)) drop-shadow(0 0 40px rgba(0, 191, 255, 0.5)); }
`;

const particleFloat = keyframes`
  0% { transform: translate(0, 0); opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { transform: translate(20px, -120px); opacity: 0; }
`;

const particleFloatAlt = keyframes`
  0% { transform: translate(0, 0); opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { transform: translate(-15px, -100px); opacity: 0; }
`;

const neonFlicker = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
`;

const progressGlow = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 191, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 191, 255, 0.8); }
  100% { box-shadow: 0 0 10px rgba(0, 191, 255, 0.5); }
`;

const scanlineMove = keyframes`
  0% { transform: translateX(-100%); opacity: 0.2; }
  50% { opacity: 0.4; }
  100% { transform: translateX(100%); opacity: 0.2; }
`;

const glitchFlicker = keyframes`
  0% { opacity: 0.1; }
  2% { opacity: 0.15; }
  4% { opacity: 0.1; }
  100% { opacity: 0.1; }
`;

const floatEffect = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

// Theme Variables
const theme = {
  colors: {
    primary: '#00BFFF',
    accent: '#FF5733',
    success: '#00FF99',
    highlight: '#CC00FF',
    bgDark: '#0A0A1A',
    bgSecondary: '#1A1D3A',
    textLight: '#FFFFFF',
    textSecondary: '#B0B0D0',
  },
  transitions: {
    hover: 'all 0.3s ease',
  },
  fontFamily: "'Roboto', sans-serif",
  formDisplay: 'block',
  formWidth: '100%',
};

// Styled Components
const AgentContainer = styled(motion.div)`
  padding: 1rem;
  //background: linear-gradient(135deg, ${theme.colors.bgDark}, ${theme.colors.bgSecondary});
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const DashboardLayout = styled.div`
  display: flex;
  flex: 1;
  min-height: calc(100vh - 200px);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled(motion.div)`
  width: 250px;
  background: rgba(10, 10, 26, 0.95);
  border-right: 2px solid ${theme.colors.primary};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(10px);
  z-index: 2;
  border-radius: 12px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    border-right: none;
    border-bottom: 2px solid ${theme.colors.primary};
    padding: 0.5rem;
  }
`;

const SidebarItem = styled(motion.div)`
  padding: 0.75rem 1rem;
  color: ${theme.colors.textLight};
  font-family: ${theme.fontFamily};
  font-size: 1.1rem;
  cursor: pointer;
  align-items: center;
  display: flex;
  gap: 0.75rem;
  border-radius: 8px;
  transition: ${theme.transitions.hover};

  &:hover {
    color: ${theme.colors.primary};
    text-shadow: 0 0 10px rgba(0, 191, 255, 0.7);
    background: rgba(0, 191, 255, 0.15);
    transform: translateX(5px);
  }

  &.active {
    color: ${theme.colors.accent};
    text-shadow: 0 0 10px rgba(255, 87, 51, 0.7);
    background: rgba(255, 87, 51, 0.2);
    border-left: 4px solid ${theme.colors.accent}};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;

const DashboardSection = styled.div`
  flex: 1;
  padding: 1rem;
  background: rgba(10, 10, 26, 0.85);
  border-radius: 12px;
  margin: 0.5rem;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAB9JREFUGFdjZGBg+M+ABDD4z4AFmBgY/jNgAUwMTH4Ax2oN1rPUuB0AAAAASUVORK5CYII=') repeat;
    opacity: 0.1;
    animation: ${glitchFlicker} 3s infinite;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: ${Math.random() * 100}%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${theme.colors.primary}, transparent);
    animation: ${scanlineMove} 4s infinite;
    opacity: 0;
    z-index: 1;
  }

  & > div:nth-child(1) {
    position: absolute;
    top: ${Math.random() * 100}%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent);
    animation: ${scanlineMove} 5s infinite;
    animation-delay: 1s;
    opacity: 0;
    z-index: 1;
  }

  & > div:nth-child(2) {
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${theme.colors.success};
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: ${particleFloat} 4s infinite;
    opacity: 0;
    z-index: 1;
  }

  & > div:nth-child(3) {
    position: absolute;
    width: 5px;
    height: 5px;
    background: ${theme.colors.highlight};
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: ${particleFloatAlt} 5s infinite;
    animation-delay: 1s;
    opacity: 0;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    margin: 0.25rem;
  }
`;

const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: 0.05rem; /* Reducido de 0.5rem a 0.25rem */
  z-index: 2;
`;

const DashboardTitle = styled.h1`
  font-size: 2.2rem;
  color: ${theme.colors.textLight};
  background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.accent});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  font-weight: 700;
  font-family: ${theme.fontFamily};
  animation: ${neonFlicker} 3s infinite;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const HomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Reducido de 1rem */
  z-index: 2;
  position: relative;
  background: url(${botPng}) center/auto 50% no-repeat, rgba(10, 10, 26, 0.7);
  background-blend-mode: overlay;
  background-position: center;
  padding-top: 20px; /* Reducido de 80px a 20px */
  padding-bottom: 0.5rem; /* Reducido de 1rem */

  @media (max-width: 768px) {
    padding-top: 15px; /* Reducido de 60px */
    background-size: auto 40%;
  }

  @media (max-width: 480px) {
    padding-top: 10px; /* Reducido de 40px */
    background-size: auto 30%;
  }
`;

const HomeContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.5rem; /* Reducido de 1rem */
  padding: 0 0.5rem; /* Reducido de 0.75rem */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 0.25rem; /* Reducido de 0.5rem */
    gap: 0.25rem; /* Reducido de 0.75rem */
  }
`;

const HomeCard = styled(motion.div)`
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, ${theme.colors.accent}, ${theme.colors.highlight}) 1;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  text-align: center;
  z-index: 2;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  transition: ${theme.transitions.hover};

  &:hover {
    box-shadow: 0 0 18px rgba(0, 191, 255, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0, 191, 255, 0.1), rgba(255, 87, 51, 0.1));
    opacity: 0.5;
    z-index: -1;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const CardTitle = styled.h3`
  color: ${theme.colors.accent};
  text-shadow: 0 0 8px rgba(255, 87, 51, 0.5);
  font-family: ${theme.fontFamily};
  font-size: 1.4rem;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CardValue = styled.p`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);
  font-family: ${theme.fontFamily};

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 18px;
  background: ${theme.colors.bgSecondary};
  border-radius: 10px;
  overflow: hidden;
  margin-top: 0.5rem;
  animation: ${progressGlow} 3s infinite;
  z-index: 3;
`;

const ProgressFill = styled.div`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background: ${(props) => (props.growth ? `linear-gradient(45deg, ${theme.colors.success}, ${theme.colors.primary})` : `linear-gradient(45deg, ${theme.colors.accent}, ${theme.colors.highlight})`)};
  transition: width 0.5s ease;
`;

const SentimentText = styled.p`
  color: ${theme.colors.primary};
  font-size: 1rem;
  font-family: ${theme.fontFamily};
  text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ContinueButton = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 15px;
  background: linear-gradient(45deg, ${theme.colors.accent}, ${theme.colors.highlight});
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, ${theme.colors.accent}, ${theme.colors.highlight}) 1;
  box-shadow: 0 0 12px rgba(255, 87, 51, 0.3);
  color: ${theme.colors.textLight};
  font-family: ${theme.fontFamily};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  opacity: 0.9;
  border-radius: 12px;
  margin: 0.5rem auto;
  z-index: 3;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  animation: ${floatEffect} 3s infinite ease-in-out;
  transition: ${theme.transitions.hover};

  &:hover {
    opacity: 1;
    box-shadow: 0 0 20px rgba(255, 87, 51, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.colors.success};
  border-radius: 8px;
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  font-family: ${theme.fontFamily};
  &::placeholder {
    color: ${theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.highlight};
    box-shadow: 0 0 10px rgba(204, 0, 255, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SelectInput = styled.select`
  display: ${theme.formDisplay};
  margin: 0 0 8px 0;
  width: ${theme.formWidth};
  padding: 0.5rem;
  background: ${theme.colors.bgDark};
  border: 1px solid ${theme.colors.primary};
  border-radius: 8px;
  color: ${theme.colors.textLight};
  font-family: ${theme.fontFamily};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.highlight};
    box-shadow: 0 0 10px rgba(204, 0, 255, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ChatWidget = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: rgba(10, 10, 26, 0.9);
  border: 1px solid ${theme.colors.primary};
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
  padding: 1rem;
  z-index: 1000;
  transition: ${theme.transitions.hover};

  @media (max-width: 480px) {
    width: 90%;
    right: 5%;
  }
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChatTitle = styled.div`
  color: ${theme.colors.accent};
  text-shadow: 0 0 8px rgba(255, 87, 51, 0.5);
  font-family: ${theme.fontFamily};
`;

const ChatMessage = styled.div`
  margin-bottom: 0.5rem;
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  font-family: ${theme.fontFamily};

  &.user {
    text-align: right;
    color: ${theme.colors.success};
  }

  &.agent {
    text-align: left;
    color: ${theme.colors.primary};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.colors.primary};
  border-radius: 8px;
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  font-family: ${theme.fontFamily};

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.highlight};
    box-shadow: 0 0 10px rgba(204, 0, 255, 0.3);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const SentimentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  width: 100%; /* Asegurar que ocupe todo el ancho disponible */

  @media (max-width: 800px) {
    flex-direction: column; /* Apilar elementos en columna para mejor legibilidad */
    text-align: center; /* Centrar texto */
    gap: 0.3rem;
    padding: 0.75rem;
    margin: 0.25rem auto; /* Centrar horizontalmente */
    max-width: 90%; /* Limitar ancho para evitar que toque los bordes */
  }
`;

const PresaleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const TokenItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const PurchaseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const AgentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const ProjectLogo = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.colors.textSecondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
`;

const TokenLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin-left: 0.5rem;

  @media (max-width: 800px) {
    width: 30px;
    height: 30px;
  }

  &.small {
    width: 20px;
    height: 20px;
  }
`;


// Estilo para el selector personalizado
const CustomSelect = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0.5rem 0;

  select {
    appearance: none;
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: ${theme.colors.textLight};
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${theme.colors.primary};
    border-radius: 8px;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${theme.colors.accent};
    }
  }

  img {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  @media (max-width: 800px) {
    select {
      padding: 0.5rem;
      font-size: 0.9rem;
    }

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const StakingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(255, 87, 51, 0.1));
  border: 1px solid ${theme.colors.primary};
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(5px);
  animation: ${floatEffect} 3s infinite ease-in-out;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const StakingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ChartContainer = styled.div`
  background: ${theme.colors.bgSecondary};
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.2);
  max-width: 100%;
  margin: 0;

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 0.5rem;
  }
`;

const TokenMarketTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${theme.colors.textLight};
  font-family: ${theme.fontFamily};

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid rgba(0, 191, 255, 0.2);
  }

  th {
    background: rgba(0, 191, 255, 0.1);
    font-weight: 600;
    cursor: pointer;
  }

  td {
    font-size: 0.6rem;
  }

  tr:hover {
    background: rgba(0, 191, 255, 0.05);
  }

  // Ajustes para vista móvil
  @media (max-width: 800px) {
    display: block;
    overflow-x: auto; /* Permite scroll horizontal si es necesario */
    -webkit-overflow-scrolling: touch; /* Mejora el scroll en iOS */
    
    thead {
      display: none; /* Oculta encabezados en móvil para un diseño más compacto */
    }

    tbody {
      display: block;
    }

    tr {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border: 1px solid rgba(0, 191, 255, 0.2);
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3rem 0;
      font-size: 0.85rem;
      border-bottom: none;
      text-align: right;

      &:before {
        content: attr(data-label);
        font-weight: 600;
        color: ${theme.colors.primary};
        text-align: left;
        flex: 1;
      }

      &:first-child {
        font-size: 1rem;
        font-weight: 600;
        justify-content: flex-start;
      }

      // Asegurar que el botón Buy sea visible y funcional
      &:last-child {
        justify-content: center;
        padding: 0.5rem 0;
      }
    }

    // Estilo específico para el contenedor del botón Buy
    td:last-child > div {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;


const GovernanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const VoteButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: nowrap;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const AIAgentCard = styled(motion.div)`
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, ${theme.colors.accent}, ${theme.colors.highlight}) 1;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  text-align: center;
  z-index: 2;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  animation: ${floatEffect} 3s infinite ease-in-out;
  max-width: 280px;
  transition: ${theme.transitions.hover};

  &:hover {
    box-shadow: 0 0 18px rgba(0, 191, 255, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0, 191, 255, 0.1), rgba(255, 87, 51, 0.1));
    opacity: 0.5;
    z-index: -1;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 100%;
  }
`;

const AIAgentImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const SocialLink = styled.a`
  color: ${theme.colors.success};
  text-decoration: none;
  font-size: 1rem;
  margin-top: 1rem;
  display: inline-block;

  &:hover {
    color: ${theme.colors.primary};
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Animations
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Dashboard Component
function Dashboard() {
  const [currentSection, setCurrentSection] = useState('Home');
  const [chatMessages, setChatMessages] = useState([{ message: 'Welcome to your dashboard! How can I assist you today?', type: 'agent' }]);
  const [chatInput, setChatInput] = useState('');
  const [tokenProgress, setTokenProgress] = useState(0);
  const [sentiment, setSentiment] = useState('Analyzing social activity...');
  const [votes, setVotes] = useState({ yes: 0, no: 0 });
  const [userData, setUserData] = useState({
    etniaTokens: 1000,
    credits: 65,
    usdtBalance: 500,
    usdcBalance: 500,
  });
  const [stakingAmount, setStakingAmount] = useState('');
  const [stakedAmount, setStakedAmount] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [stakingPeriod, setStakingPeriod] = useState('3');
  const [presaleConfig, setPresaleConfig] = useState({
    amount: '',
    priceThreshold: '',
  });
  const [buyAmount, setBuyAmount] = useState('');
  const [buyCurrency, setBuyCurrency] = useState('USDT');
  const [walletConnected, setWalletConnected] = useState(false);
  const [presalePurchases, setPresalePurchases] = useState([]);
  const [dexSwaps, setDexSwaps] = useState([]);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [agentActions, setAgentActions] = useState([]);

  // Simulate token sale progress
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate social activity
  useEffect(() => {
    setTimeout(() => {
      setSentiment('Most active social network: Telegram');
    }, 3000);
  }, []);

  // Simulate staking rewards based on period
  useEffect(() => {
    if (stakedAmount > 0) {
      const apy = stakingPeriod === '3' ? 0.03 : stakingPeriod === '6' ? 0.04 : 0.05;
      const interval = setInterval(() => {
        setRewards((prev) => prev + (stakedAmount * apy) / 365);
      }, 86400000);
      return () => clearInterval(interval);
    }
  }, [stakedAmount, stakingPeriod]);

  // Simulate token performance for purchases/swaps
  useEffect(() => {
    const interval = setInterval(() => {
      setPresalePurchases((prev) =>
        prev.map((purchase) => ({
          ...purchase,
          performance: purchase.performance + (Math.random() * 10 - 5),
        }))
      );
      setDexSwaps((prev) =>
        prev.map((swap) => ({
          ...swap,
          performance: swap.performance + (Math.random() * 10 - 5),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate AI agent actions
  useEffect(() => {
    const actions = [
      { action: 'Bought 500 USD ETNIA at $0.10', timestamp: '2023-06-02 17:30' },
      { action: 'Sold 200 USD ETNIA at $0.12', timestamp: '2023-06-02 17:35' },
      { action: 'No activity', timestamp: '2023-06-02 17:40' },
    ];
    setAgentActions(actions);
  }, []);

const handleChatSubmit = (e) => {

  e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { text: chatInput, type: 'user' }]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: 'I can help with that! What would you like to know?', type: 'agent' },
      ]);
    }, 500);
    setChatInput('');
  };

  const handleVote = (vote) => {
    setVotes((prev) => ({
      yes: vote === 'yes' ? prev.yes + 1 : prev.yes,
      no: vote === 'no' ? prev.no + 1 : prev.no,
    }));
  };

  const handleStake = () => {
    const amount = parseFloat(stakingAmount);
    if (amount <= 0 || amount > userData.etniaTokens) {
      alert('Invalid staking amount!');
      return;
    }
    setStakedAmount((prev) => prev + amount);
    setUserData((prevData) => ({
      ...prevData,
      etniaTokens: prevData.etniaTokens - amount,
    }));
    setStakingAmount('');
    alert(`Staked ${amount} $$ETNIA tokens for ${stakingPeriod} months!`);
  };

  const handleClaimRewards = () => {
    setUserData((prevData) => ({
      ...prevData,
      etniaTokens: prevData.etniaTokens + rewards,
    }));
    setRewards(0);
    alert(`Claimed ${rewards.toFixed(2)} $ETNIA rewards!`);
  };

  const handleConnectWallet = () => {
    setWalletConnected(true);
    alert('Wallet connected successfully!');
  };

  const handleBuyEtnia = () => {
    if (!walletConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    const amount = parseFloat(buyAmount);
    if (amount <= 0) {
      alert('Invalid amount!');
      return;
    }
    const exchangeRate = 10;
    const etniaToReceive = amount * exchangeRate;

    if (buyCurrency === 'USDT' && amount > userData.usdtBalance) {
      alert('Insufficient USDT balance!');
      return;
    }
    if (buyCurrency === 'USDC' && amount > userData.usdcBalance) {
      alert('Insufficient USDC balance!');
      return;
    }

    setDexSwaps((prev) => [
      ...prev,
      {
        name: '$ETNIA',
        amount: etniaToReceive,
        currency: buyCurrency,
        performance: 0,
      },
    ]);

    setUserData((prevData) => ({
      ...prevData,
      etniaTokens: prevData.etniaTokens + etniaToReceive,
      usdtBalance: buyCurrency === 'USDT' ? prevData.usdtBalance - amount : prevData.usdtBalance,
      usdcBalance: buyCurrency === 'USDC' ? prevData.usdcBalance - amount : prevData.usdcBalance,
    }));
    setBuyAmount('');
    alert(`Purchased ${etniaToReceive} $ETNIA using ${amount} ${buyCurrency}!`);
  };

  const handlePresaleConfigSubmit = (e) => {
    e.preventDefault();
    if (!presaleConfig.amount || !presaleConfig.priceThreshold) {
      alert('Please fill in all fields!');
      return;
    }

    setPresalePurchases((prev) => [
      ...prev,
      {
        name: 'Presale Project',
        amount: parseFloat(presaleConfig.amount),
        price: parseFloat(presaleConfig.priceThreshold),
        performance: 0,
      },
    ]);

    alert(`Automatic presale buying configured: ${presaleConfig.amount} $ETNIA at ${presaleConfig.priceThreshold} USD`);
    setPresaleConfig({ amount: '', priceThreshold: '' });
  };

  const handleBuyToken = (tokenName) => {
    alert(`Initiating purchase for ${tokenName}!`);
  };

  const handleBuyAgent = (agent) => {
    if (!walletConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    if (userData.usdtBalance < agent.price) {
      alert('Insufficient USDT balance!');
      return;
    }
    setUserData((prevData) => ({
      ...prevData,
      usdtBalance: prevData.usdtBalance - agent.price,
    }));
    setAgentActions((prev) => [
      ...prev,
      { action: `Purchased ${agent.name} AI Agent for ${agent.price} USDT`, timestamp: new Date().toISOString() },
    ]);
    alert(`Purchased ${agent.name} AI Agent for ${agent.price} USDT!`);
  };

  // Simulated data for Token Market
  const tokenMarketData = [
    { name: '$ETNIA', volume: 1200000, priceChange: 5.2, votes: 120000, volumeRaised: 15000000, blockchain: 'TON', logo: botPng },
    { name: '$TON', volume: 950000, priceChange: -2.3, votes: 95000, volumeRaised: 7000000, blockchain: 'TON', logo: botPng2 },
    { name: '$ETH', volume: 800000, priceChange: 3.8, votes: 80000, volumeRaised: 5000000, blockchain: 'Ethereum', logo: bot1Png },
    { name: 'Hamster Kombat', volume: 700000, priceChange: 4.1, votes: 120000, volumeRaised: 15000000, blockchain: 'TON', logo: 'HK' },
    { name: 'DeDust', volume: 650000, priceChange: -1.5, votes: 95000, volumeRaised: 7000000, blockchain: 'TON', logo: 'DD' },
    { name: 'StonFi', volume: 600000, priceChange: 2.7, votes: 80000, volumeRaised: 5000000, blockchain: 'TON', logo: 'SF' },
    { name: 'Bemo', volume: 550000, priceChange: 0.8, votes: 75000, volumeRaised: 4500000, blockchain: 'TON', logo: 'BM' },
    { name: 'Evaa Protocol', volume: 500000, priceChange: -0.9, votes: 70000, volumeRaised: 4000000, blockchain: 'TON', logo: 'EP' },
    { name: 'Resistance Dog', volume: 450000, priceChange: 3.2, votes: 65000, volumeRaised: 3500000, blockchain: 'TON', logo: 'RD' },
    { name: 'Dash 2 Trade', volume: 400000, priceChange: 1.9, votes: 60000, volumeRaised: 6400000, blockchain: 'ETH', logo: 'D2T' },
  ];

  // Simulated social groups data
  const socialGroups = [
    { name: 'Tether Official', platform: 'Twitter', activityScore: 92, messagesPerDay: 1200, logo: botPng2, link: 'https://t.me/tetherofficial' },
    { name: 'Ethnica Community', platform: 'Twitter', activityScore: 88, messagesPerDay: 900, logo: bot1Png, link: 'https://twitter.com/ethenacommunity' },
    { name: 'TON Foundation', platform: 'Discord', activityScore: 90, messagesPerDay: 1100, logo: botPng2, link: 'https://discord.gg/tonfoundation' },
    { name: 'Binance Signals', platform: 'Telegram', activityScore: 85, messagesPerDay: 800, logo: bot1Png, link: 'https://t.me/binancesignals' },
  ].sort((a, b) => b.activityScore - a.activityScore);

  // AI Agent Options
  const aiAgents = [
  {
    name: 'Basic Agent',
    image: botPng,
    features: ['Market Analysis', 'Basic Trading'],
    price: 100,
    duration: '2 months', // Nueva propiedad
  },
  {
    name: 'Pro Agent',
    image: bot1Png,
    features: ['Advanced Trading', 'Sentiment Analysis', 'Portfolio Management'],
    price: 250,
    duration: '2 months', // Nueva propiedad
  },
  {
    name: 'Elite Agent',
    image: botPng2,
    features: ['AI Predictions', 'Automated Trading', 'Premium Support'],
    price: 500,
    duration: '2 months', // Nueva propiedad
  },
];

  // Chart.js data for $ETNIA price chart
  const priceChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '$ETNIA Price',
        data: [0.08, 0.09, 0.10, 0.11, 0.12, 0.13],
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(0, 191, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const priceChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: '$ETNIA Price Trend', color: theme.colors.textLight, font: { size: 18 } },
    },
    scales: {
      x: { ticks: { color: theme.colors.textSecondary } },
      y: { ticks: { color: theme.colors.textSecondary }, beginAtZero: true },
    },
  };

  // Chart.js for vote breakdown
  const voteChartData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Votes',
        data: [votes.yes, votes.no],
        backgroundColor: [theme.colors.success, theme.colors.accent],
        borderColor: [theme.colors.success, theme.colors.accent],
        borderWidth: 1,
      },
    ],
  };

  const voteChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Vote Breakdown', color: theme.colors.textLight, font: { size: 16 } },
    },
    scales: {
      x: { ticks: { color: theme.colors.textSecondary } },
      y: { ticks: { color: theme.colors.textSecondary }, beginAtZero: true },
    },
  };

  return (
    <AgentContainer variants={containerVariants} initial="hidden" animate="visible">
      <DashboardLayout>
        <Sidebar
          variants={containerVariants}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SidebarItem
            className={currentSection === 'Home' ? 'active' : ''}
            onClick={() => setCurrentSection('Home')}
            whileHover={{ scale: 1.05 }}
          >
            <FaHome size={20} /> Home
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'TokenMarket' ? 'active' : ''}
            onClick={() => setCurrentSection('TokenMarket')}
            whileHover={{ scale: 1.05 }}
          >
            <FaChartBar size={20} /> Token Market
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'MarketSentiment' ? 'active' : ''}
            onClick={() => setCurrentSection('MarketSentiment')}
            whileHover={{ scale: 1.05 }}
          >
            <FaChartLine size={20} /> Market Sentiment
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'GovernanceProposal' ? 'active' : ''}
            onClick={() => setCurrentSection('GovernanceProposal')}
            whileHover={{ scale: 1.05 }}
          >
            <FaVoteYea size={20} /> Governance
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'Stake' ? 'active' : ''}
            onClick={() => setCurrentSection('Stake')}
            whileHover={{ scale: 1.05 }}
          >
            <FaCoins size={20} /> Stake
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'BuyAIAgent' ? 'active' : ''}
            onClick={() => setCurrentSection('BuyAIAgent')}
            whileHover={{ scale: 1.05 }}
          >
            <FaRobot size={20} /> Buy AI Agent
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'Settings' ? 'active' : ''}
            onClick={() => setCurrentSection('Settings')}
            whileHover={{ scale: 1.05 }}
          >
            <FaCog size={20} /> Settings
          </SidebarItem>
        </Sidebar>
        <DashboardSection>
          <div /><div /><div />
          <DashboardHeader>
            <DashboardTitle>Dashboard</DashboardTitle>
          </DashboardHeader>

          {currentSection === 'Home' && (
  <HomeSection>
    <HomeContent>
      <HomeCard variants={cardVariants} initial="hidden" animate="visible">
        <CardTitle>
          $ETNIA Tokens
          <TokenLogo style={{ backgroundImage: `url(${svPng})` }} />
        </CardTitle>
        <CardValue>{userData.etniaTokens.toFixed(2)}</CardValue>
        <ContinueButton
          whileHover={{ scale: 1.05 }}
          onClick={() => setCurrentSection('BuyAIAgent')}
        >
          Buy More Tokens
        </ContinueButton>
      </HomeCard>
      <HomeCard variants={cardVariants} initial="hidden" animate="visible">
        <CardTitle>
          Credits
          
        </CardTitle>
        <CardValue>${userData.credits.toFixed(2)}</CardValue>
      </HomeCard>
      <HomeCard variants={cardVariants} initial="hidden" animate="visible">
        <CardTitle>
          USDT Balance
          <TokenLogo style={{ backgroundImage: `url(${usdtLogo})` }} />
        </CardTitle>
        <CardValue>${userData.usdtBalance.toFixed(2)}</CardValue>
      </HomeCard>
      <HomeCard variants={cardVariants} initial="hidden" animate="visible">
        <CardTitle>
          USDC Balance
          <TokenLogo style={{ backgroundImage: `url(${usdcLogo})` }} />
        </CardTitle>
        <CardValue>${userData.usdcBalance.toFixed(2)}</CardValue>
      </HomeCard>
      <HomeCard variants={cardVariants} initial="hidden" animate="visible">
        <CardTitle>My AI Agents</CardTitle>
        {agentActions.length === 0 ? (
          <p style={{ color: theme.colors.textSecondary }}>No agent actions yet.</p>
        ) : (
          agentActions.map((action, index) => (
            <AgentItem key={`agent-action-${index}`}>
              <div>
                <p style={{ color: theme.colors.textLight }}>{action.action}</p>
                <p style={{ color: theme.colors.textSecondary }}>{action.timestamp}</p>
              </div>
            </AgentItem>
          ))
        )}
      </HomeCard>
      <HomeCard variants={cardVariants} initial="hidden" animate="visible">
        <CardTitle>Presale Purchases</CardTitle>
        {presalePurchases.length === 0 ? (
          <p style={{ color: theme.colors.textSecondary }}>No presale purchases yet.</p>
        ) : (
          presalePurchases.map((purchase, index) => (
            <PurchaseItem key={`presale-${index}`}>
              <ProjectLogo>{purchase.name[0]}</ProjectLogo>
              <div>
                <p style={{ color: '#FFFFFF' }}>{purchase.name}</p>
                <p style={{ color: theme.colors.textSecondary }}>Amount: {purchase.amount.toFixed(2)} $ETNIA</p>
                <p style={{ color: theme.colors.textSecondary }}>Price: ${purchase.price.toFixed(2)}</p>
                <ProgressBar>
                  <ProgressFill
                    percentage={Math.min(Math.max(purchase.performance, -50), 50) + 50}
                    growth={purchase.performance >= 0}
                  />
                </ProgressBar>
                <p style={{ color: purchase.performance >= 0 ? theme.colors.success : theme.colors.accent }}>
                  Performance: {purchase.performance.toFixed(2)}%
                </p>
              </div>
            </PurchaseItem>
          ))
        )}
      </HomeCard>
      <HomeCard
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="dex-swaps"
      >
        <CardTitle>DEX Swaps</CardTitle>
        {dexSwaps.length === 0 ? (
          <p style={{ color: theme.colors.textSecondary, marginBottom: '1rem' }}>No DEX swaps yet.</p>
        ) : (
          [...new Map(dexSwaps.map(item => [JSON.stringify([item.name, item.amount, item.currency, item.performance]), item])).values()].map((swap, index) => (
            <PurchaseItem key={`dex-swap-${index}-${swap.name}-${swap.amount}`}>
              <ProjectLogo>{swap.name[0]}</ProjectLogo>
              <div>
                <p style={{ color: '#FFFFFF' }}>{swap.name}</p>
                <p style={{ color: theme.colors.textSecondary }}>Amount: {swap.amount.toFixed(2)} $ETNIA</p>
                <p style={{ color: theme.colors.textSecondary }}>Paid with: {swap.currency}</p>
                <ProgressBar>
                  <ProgressFill
                    percentage={Math.min(Math.max(swap.performance, -50), 50) + 50}
                    growth={swap.performance >= 0}
                  />
                </ProgressBar>
                <p style={{ color: swap.performance >= 0 ? theme.colors.success : theme.colors.accent }}>
                  Performance: {swap.performance.toFixed(2)}%
                </p>
              </div>
            </PurchaseItem>
          ))
        )}
        <CardTitle>$ETNIA Price Chart</CardTitle>
        <ChartContainer>
          <Line data={priceChartData} options={priceChartOptions} />
        </ChartContainer>
      </HomeCard>
    </HomeContent>
  </HomeSection>
)}

          {currentSection === 'TokenMarket' && (
  <HomeSection>
    <HomeCard variants={cardVariants} initial="hidden" animate="visible">
      <CardTitle>Top Tokens & Presales</CardTitle>
      <TokenMarketTable>
        <thead>
          <tr>
            <th>Token/Project</th>
            <th>Volume</th>
            <th>Price Change</th>
            <th>Votes</th>
            <th>Raised</th>
            <th>Blockchain</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tokenMarketData.map((token, index) => (
            <tr key={index}>
              <td data-label="Token/Project" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {typeof token.logo === 'string' && token.logo.length > 10 ? (
                  <TokenLogo style={{ backgroundImage: `url(${token.logo})` }} />
                ) : (
                  <ProjectLogo>{token.logo}</ProjectLogo>
                )}
                {token.name}
              </td>
              <td data-label="Volume">${token.volume.toLocaleString()}</td>
              <td
                data-label="Price Change"
                style={{ color: token.priceChange >= 0 ? theme.colors.success : theme.colors.accent }}
              >
                {token.priceChange.toFixed(2)}%
              </td>
              <td data-label="Votes">{token.votes.toLocaleString()}</td>
              <td data-label="Raised" style={{ color: theme.colors.textSecondary }}>
                ${token.volumeRaised.toLocaleString()}
              </td>
              <td data-label="Blockchain">{token.blockchain}</td>
              <td data-label="Action">
                <div>
                  <ContinueButton
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleBuyToken(token.name)}
                  >
                    Buy
                  </ContinueButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TokenMarketTable>
      <SocialLink href="https://t.me/etniagroup">Join Our Telegram Group</SocialLink>
    </HomeCard>
  </HomeSection>
)}

          {currentSection === 'MarketSentiment' && (
  <HomeSection>
    <HomeCard variants={cardVariants} initial="hidden" animate="visible">
      <CardTitle>Market Sentiment</CardTitle>
      <SentimentText>{sentiment}</SentimentText>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centrar horizontalmente los SentimentItem
          gap: '0.5rem',
          width: '100%',
        }}
      >
        {socialGroups.map((group, index) => (
          <SentimentItem key={group.name}>
            <TokenLogo style={{ backgroundImage: `url(${group.logo})` }} />
            {group.platform === 'Telegram' && <FaTelegram color={theme.colors.primary} />}
            {group.platform === 'Twitter' && <FaTwitter color={theme.colors.primary} />}
            {group.platform === 'Discord' && <FaDiscord color={theme.colors.primary} />}
            <span>{index + 1}</span>
            <div>{group.name}</div>
            <span>Platform: {group.platform}</span>
            <span>Score: {group.activityScore}</span>
            <span>Messages/Day: {group.messagesPerDay}</span>
            <SocialLink href={group.link}>Join {group.platform}</SocialLink>
          </SentimentItem>
        ))}
      </div>
    </HomeCard>
  </HomeSection>
)}

          {currentSection === 'GovernanceProposal' && (
            <HomeSection>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <GovernanceContainer>
                  <TokenLogo style={{ backgroundImage: `url(${svPng})`, width: '100px', height: '100px', marginBottom: '1rem' }} />
                  <CardTitle>Governance Proposal</CardTitle>
                  <p style={{ color: theme.colors.textSecondary, marginBottom: '0.5rem', textAlign: 'center' }}>
                    Increase Token Allocation?
                  </p>
                  <VoteButtons>
                    <ContinueButton onClick={() => handleVote('yes')}>
                      Yes ({votes.yes})
                    </ContinueButton>
                    <ContinueButton onClick={() => handleVote('no')}>
                      No ({votes.no})
                    </ContinueButton>
                  </VoteButtons>
                  <ChartContainer>
                    <Bar data={voteChartData} options={voteChartOptions} />
                  </ChartContainer>
                </GovernanceContainer>
              </HomeCard>
            </HomeSection>
          )}

          {currentSection === 'Stake' && (
            <HomeSection>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <StakingContainer>
                  <StakingHeader>
                    <TokenLogo style={{ backgroundImage: `url(${svPng})` }} />
                    <CardTitle>Stake $ETNIA Tokens</CardTitle>
                  </StakingHeader>
                  <FormInput
                    type="number"
                    placeholder="Enter amount to stake"
                    value={stakingAmount}
                    onChange={(e) => setStakingAmount(e.target.value)}
                  />
                  <SelectInput
                    value={stakingPeriod}
                    onChange={(e) => setStakingPeriod(e.target.value)}
                  >
                    <option value="3">3 Months (3% APY)</option>
                    <option value="6">6 Months (4% APY)</option>
                    <option value="12">12 Months (5% APY)</option>
                  </SelectInput>
                  <ContinueButton onClick={handleStake}>Stake Now</ContinueButton>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <CardTitle>Staking Progress</CardTitle>
                    <ProgressBar>
                      <ProgressFill percentage={(stakedAmount / (userData.etniaTokens + stakedAmount)) * 100} />
                    </ProgressBar>
                    <p style={{ color: theme.colors.textSecondary, marginTop: '0.5rem' }}>
                      Staked: {stakedAmount.toFixed(2)} / {(userData.etniaTokens + stakedAmount).toFixed(2)} $ETNIA
                    </p>
                    <CardTitle>Rewards</CardTitle>
                    <CardValue>{rewards.toFixed(2)} $ETNIA</CardValue>
                    <ContinueButton onClick={handleClaimRewards}>Claim Rewards</ContinueButton>
                  </div>
                </StakingContainer>
              </HomeCard>
            </HomeSection>
          )}

          {currentSection === 'BuyAIAgent' && (
  <HomeSection>
    <HomeCard variants={cardVariants} initial="hidden" animate="visible">
      <CardTitle>Buy $ETNIA with USDT/USDC</CardTitle>
      {!walletConnected ? (
        <ContinueButton onClick={handleConnectWallet}>Connect Wallet</ContinueButton>
      ) : (
        <>
          <CustomSelect>
            <select
              value={buyCurrency}
              onChange={(e) => setBuyCurrency(e.target.value)}
            >
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
            </select>
            <img src={buyCurrency === 'USDT' ? usdtLogo : usdcLogo} alt={buyCurrency} />
          </CustomSelect>
          <FormInput
            type="number"
            placeholder={`Enter amount in ${buyCurrency}`}
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
          />
          <p style={{ color: theme.colors.textSecondary, margin: '20px auto', display: 'flex', alignItems: 'center' }}>
            You will receive: {(buyAmount * 10).toFixed(2) || 0} $ETNIA (1 ${buyCurrency}
            <TokenLogo
              className="small"
              style={{
                backgroundImage: `url(${buyCurrency === 'USDT' ? usdtLogo : usdcLogo})`,
                marginLeft: '0.5rem',
              }}
            />
            = 10 $ETNIA)
          </p>
          <ContinueButton onClick={handleBuyEtnia}>Buy $ETNIA</ContinueButton>
        </>
      )}
    </HomeCard>
    <HomeCard variants={cardVariants} initial="hidden" animate="visible">
      <CardTitle>Configure Automatic Presale Buying</CardTitle>
      <form onSubmit={handlePresaleConfigSubmit}>
        <FormInput
          type="number"
          placeholder="Amount ($ETNIA)"
          value={presaleConfig.amount}
          onChange={(e) => setPresaleConfig({ ...presaleConfig, amount: e.target.value })}
        />
        <FormInput
          type="number"
          placeholder="Price Threshold ($USD)"
          value={presaleConfig.priceThreshold}
          onChange={(e) => setPresaleConfig({ ...presaleConfig, priceThreshold: e.target.value })}
        />
        <ContinueButton type="submit">Save Configuration</ContinueButton>
      </form>
    </HomeCard>
    <HomeCard variants={cardVariants} initial="hidden" animate="visible">
      <CardTitle>Choose Your AI Agent</CardTitle>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          justifyContent: 'center',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {aiAgents.map((agent, index) => (
          <AIAgentCard key={`ai-agent-${index}`} variants={cardVariants} initial="hidden" animate="visible">
            <AIAgentImage src={agent.image} alt={agent.name} />
            <CardTitle>{agent.name}</CardTitle>
            <ul style={{ color: theme.colors.textSecondary, textAlign: 'left', marginBottom: '1rem' }}>
              {agent.features.map((feature, i) => (
                <li key={`feature-${i}`}>{feature}</li>
              ))}
            </ul>
            <CardValue>Price: ${agent.price} USDT</CardValue>
            <CardValue>Duration: {agent.duration}</CardValue> {/* Nueva línea para mostrar duración */}
            <ContinueButton onClick={() => handleBuyAgent(agent)}>Buy Now</ContinueButton>
          </AIAgentCard>
        ))}
      </div>
    </HomeCard>
  </HomeSection>
)}

          {currentSection === 'Settings' && (
            <HomeSection>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <CardTitle>Settings</CardTitle>
                <p style={{ color: theme.colors.textSecondary }}>Customize your dashboard settings here.</p>
              </HomeCard>
            </HomeSection>
          )}
        </DashboardSection>
      </DashboardLayout>

      <ChatWidget style={{ height: isChatMinimized ? '50px' : 'auto' }}>
        <ChatHeader>
          <ChatTitle>AI Assistant</ChatTitle>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatMinimized(!isChatMinimized)}
            style={{ cursor: 'pointer' }}
          >
            {isChatMinimized ? <FaWindowMaximize color={theme.colors.accent} /> : <FaWindowMinimize color={theme.colors.accent} />}
          </motion.div>
        </ChatHeader>
        {!isChatMinimized && (
          <>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
              {chatMessages.map((msg, index) => (
                <ChatMessage key={index} className={msg.type}>{msg.text}</ChatMessage>
              ))}
            </div>
            <form onSubmit={handleChatSubmit}>
              <ChatInput
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
              />
            </form>
          </>
        )}
      </ChatWidget>
    </AgentContainer>
  );
}

// Agent Component
const AgentAISection = styled.section`
  padding: 20px;
  background: url(${agentBackground}) center/cover;
  background-blend-mode: overlay;
  background-color: rgba(10, 10, 26, 0.6);
  color: ${theme.colors.textLight};
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto; /* Añadido margen superior de 2rem */
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: ${theme.colors.success};
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: ${particleFloat} 6s infinite;
    opacity: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 3px;
    background: ${theme.colors.highlight};
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: ${particleFloatAlt} 8s infinite;
    opacity: 0;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem; /* Reducido padding vertical */
    flex-direction: column;
    gap: 1.5rem;
    margin: 1.5rem auto; /* Ajustado para pantallas medianas */
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    gap: 1rem;
    margin: 1rem auto; /* Ajustado para pantallas pequeñas */
  }
`;

const AgentAIImage = styled(motion.img)`
  max-width: 350px;
  height: auto;
  object-fit: contain;
  animation: ${pulseGlow} 3s infinite;
  transform: translateX(-20px);

  @media (max-width: 768px) {
    max-width: 250px;
    transform: none;
  }

  @media (max-width: 480px) {
    max-width: 200px;
  }
`;

const AgentAIContent = styled.div`
  max-width: 450px;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const AgentAITitle = styled.div`
  font-size: 36px;
  margin-bottom: 16px;
  color: ${theme.colors.accent};
  text-shadow: 0 0 12px rgba(255, 87, 51, 0.7);
  text-transform: uppercase;
  font-weight: 700;
  font-family: ${theme.fontFamily};

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const BonusText = styled.div`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
  font-family: ${theme.fontFamily};

  span.etnia {
    color: ${theme.colors.primary};
    text-shadow: 0 0 10px rgba(0, 191, 255, 0.7);
    animation: ${neonFlicker} 2s infinite;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${theme.colors.success};
  border-radius: 12px;
  color: ${theme.colors.textLight};
  font-size: 1rem;
  font-family: ${theme.fontFamily};
  transition: ${theme.transitions.hover};

  &::placeholder {
    color: ${theme.colors.textSecondary};
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.highlight};
    box-shadow: 0 0 15px rgba(204, 0, 255, 0.5);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
  font-family: ${theme.fontFamily};

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  accent-color: ${theme.colors.success};
  width: 16px;
  height: 16px;
`;

const LogInLink = styled.a`
  color: ${theme.colors.success};
  text-decoration: none;
  font-size: 0.9rem;
  font-family: ${theme.fontFamily};
  transition: ${theme.transitions.hover};

  &:hover {
    text-decoration: underline;
    color: ${theme.colors.highlight};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

function Agent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <AgentContainer variants={containerVariants} initial="hidden" animate="visible">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <AgentAISection key="signup">
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <AgentAIImage
                src={botImage}
                alt="Agent AI Bot Image"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05, rotate: 5 }}
              />
              <AgentAIContent>
                <AgentAITitle>Agent AI</AgentAITitle>
                <BonusText>
                  Sign Up Bonus: $65 Free Credit in <span className="etnia">$ETNIA</span>
                </BonusText>
                <SignUpForm onSubmit={handleFormSubmit}>
                  <EmailInput type="email" placeholder="Enter your email here" required />
                  <ContinueButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
                    Continue
                  </ContinueButton>
                  <CheckboxContainer>
                    <Checkbox type="checkbox" defaultChecked />
                    <span>By signing up, you agree to our Terms & Conditions</span>
                  </CheckboxContainer>
                  <CheckboxContainer>
                    <Checkbox type="checkbox" />
                    <span>By signing up, you confirm you have read the Disclaimer</span>
                  </CheckboxContainer>
                  <div>
                    Already have an account? <LogInLink href="#">Log In</LogInLink>
                  </div>
                </SignUpForm>
              </AgentAIContent>
            </div>
          </AgentAISection>
        ) : (
          <Dashboard key="dashboard" />
        )}
      </AnimatePresence>
    </AgentContainer>
  );
}

export default Agent;