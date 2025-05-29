import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import botImage from '../assets/images/token.gif';
import agentBackground from '../assets/images/agent.webp';
import { FaHome, FaCoins, FaRobot, FaCog, FaTelegram } from 'react-icons/fa'; // Icons for sidebar

// Keyframes for Animations
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

const holographicFloat = keyframes`
  0% { transform: translateY(0); box-shadow: 0 0 15px rgba(0, 191, 255, 0.3); }
  50% { transform: translateY(-10px); box-shadow: 0 0 25px rgba(0, 191, 255, 0.5); }
  100% { transform: translateY(0); box-shadow: 0 0 15px rgba(0, 191, 255, 0.3); }
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

// Styled Components
const AgentContainer = styled(motion.div)`
  padding: 2rem;
  //background: #0A0A1A;
  min-height: calc(100vh - 200px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const DashboardLayout = styled.div`
  display: flex;
  flex: 1;
  min-height: calc(100vh - 200px);
`;

const Sidebar = styled.div`
  width: 250px;
  background: rgba(10, 10, 26, 0.9);
  border-right: 1px solid #00BFFF;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(10px);
  z-index: 2;

  @media (max-width: 768px) {
    width: 200px;
    padding: 1rem 0.5rem;
  }
`;

const SidebarItem = styled.div`
  padding: 0.5rem 1rem;
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #00BFFF;
    text-shadow: 0 0 10px rgba(0, 191, 255, 0.7);
    background: rgba(0, 191, 255, 0.1);
  }

  &.active {
    color: #FF5733;
    text-shadow: 0 0 10px rgba(255, 87, 51, 0.7);
    background: rgba(255, 87, 51, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;

const SidebarSubSection = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #00BFFF;
  border-radius: 8px;
  margin: 1rem 0;
  color: #B0B0D0;
  font-family: 'Roboto', sans-serif;
  z-index: 3;
`;

const SidebarSubTitle = styled.h4`
  color: #FF5733;
  text-shadow: 0 0 8px rgba(255, 87, 51, 0.5);
  margin-bottom: 0.5rem;
`;

const DashboardSection = styled.div`
  flex: 1;
  padding: 2rem;
  background: rgba(10, 10, 26, 0.8);
  border-radius: 12px;
  margin: 0 2rem;
  overflow-y: auto;
  position: relative;

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
    background: linear-gradient(90deg, transparent, #00BFFF, transparent);
    animation: ${scanlineMove} 4s infinite;
    animation-delay: 0s;
    opacity: 0;
    z-index: 1;
  }

  & > div:nth-child(1) {
    position: absolute;
    top: ${Math.random() * 100}%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FF5733, transparent);
    animation: ${scanlineMove} 5s infinite;
    animation-delay: 1s;
    opacity: 0;
    z-index: 1;
  }

  & > div:nth-child(2) {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #00FF99;
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: ${particleFloat} 4s infinite;
    animation-delay: 0s;
    opacity: 0;
    z-index: 1;
  }

  & > div:nth-child(3) {
    position: absolute;
    width: 5px;
    height: 5px;
    background: #CC00FF;
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: ${particleFloatAlt} 5s infinite;
    animation-delay: 1s;
    opacity: 0;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0 1rem;
  }
`;

const DashboardHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  z-index: 2;
`;

const DashboardTitle = styled.h1`
  font-size: 3rem;
  color: #FFFFFF;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  animation: ${neonFlicker} 3s infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HomeSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  z-index: 2;
`;

const HomeCard = styled(motion.div)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #00BFFF;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
  backdrop-filter: blur(5px);
  animation: ${holographicFloat} 5s infinite;
  position: relative;
  overflow: hidden;
  text-align: center;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0, 191, 255, 0.1), rgba(255, 87, 51, 0.1), rgba(0, 191, 255, 0.1));
    opacity: 0.5;
    z-index: -1;
  }
`;

const CardTitle = styled.h3`
  color: #FF5733;
  text-shadow: 0 0 8px rgba(255, 87, 51, 0.5);
  font-family: 'Roboto', sans-serif;
  margin-bottom: 0.5rem;
`;

const CardValue = styled.p`
  color: #00BFFF;
  font-size: 1.2rem;
  text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);
  font-family: 'Roboto', sans-serif;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: #1A1A3A;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 0.5rem;
  animation: ${progressGlow} 3s infinite;
  z-index: 3;
`;

const ProgressFill = styled.div`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background: linear-gradient(45deg, #FF5733, #CC00FF);
  transition: width 0.5s ease;
`;

const SentimentText = styled.p`
  color: #00BFFF;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  text-shadow: 0 0 8px rgba(0, 191, 255, 0.5);
`;

const ContinueButton = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 16px;
  background: linear-gradient(45deg, #FF5733, #CC00FF);
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, #FF5733, #CC00FF) 1;
  box-shadow: 0 0 15px rgba(255, 87, 51, 0.3);
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0.9;
  border-radius: 12px;
  margin: 0.5rem 0;
  z-index: 3;

  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);

  &:hover {
    opacity: 1;
    box-shadow: 0 0 25px rgba(255, 87, 51, 0.5);
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

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #00FF99;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  z-index: 3;

  &::placeholder {
    color: #B0B0D0;
  }

  &:focus {
    outline: none;
    border-color: #CC00FF;
    box-shadow: 0 0 10px rgba(204, 0, 255, 0.3);
  }
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #00FF99;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  z-index: 3;

  option {
    background: #0A0A1A;
    color: #FFFFFF;
  }

  &:focus {
    outline: none;
    border-color: #CC00FF;
    box-shadow: 0 0 10px rgba(204, 0, 255, 0.3);
  }
`;

const ChatWidget = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: rgba(10, 10, 26, 0.9);
  border: 1px solid #00BFFF;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
  padding: 1rem;
  z-index: 1000;
`;

const ChatMessage = styled.div`
  margin-bottom: 0.5rem;
  color: #FFFFFF;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;

  &.user {
    text-align: right;
    color: #00FF99;
  }

  &.agent {
    text-align: left;
    color: #00BFFF;
  }
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #00BFFF;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  z-index: 3;

  &::placeholder {
    color: #B0B0D0;
  }

  &:focus {
    outline: none;
    border-color: #CC00FF;
    box-shadow: 0 0 10px rgba(204, 0, 255, 0.3);
  }
`;

const SentimentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const PresaleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const ProjectLogo = styled.div`
  width: 40px;
  height: 40px;
  background: #B0B0D0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
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

// Dashboard Component
function Dashboard() {
  const [currentSection, setCurrentSection] = useState('Home');
  const [chatMessages, setChatMessages] = useState([
    { text: 'Welcome to your dashboard! How can I assist you today?', type: 'agent' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [tokenProgress, setTokenProgress] = useState(0);
  const [sentiment, setSentiment] = useState('Analyzing market sentiment...');
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
  const [presaleConfig, setPresaleConfig] = useState({
    amount: '',
    priceThreshold: '',
  });
  const [buyAmount, setBuyAmount] = useState('');
  const [buyCurrency, setBuyCurrency] = useState('USDT');
  const [walletConnected, setWalletConnected] = useState(false);

  // Simulate token sale progress
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate market sentiment analysis
  useEffect(() => {
    setTimeout(() => {
      setSentiment('Positive sentiment on X: 78%');
    }, 3000);
  }, []);

  // Simulate staking rewards (5% APY, compounded daily)
  useEffect(() => {
    if (stakedAmount > 0) {
      const interval = setInterval(() => {
        setRewards((prev) => prev + (stakedAmount * 0.05) / 365); // Daily compounding
      }, 86400000); // Update every day
      return () => clearInterval(interval);
    }
  }, [stakedAmount]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages([...chatMessages, { text: chatInput, type: 'user' }]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: 'I can help with that! What would you like to know?', type: 'agent' },
      ]);
    }, 1000);
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
    setUserData((prev) => ({
      ...prev,
      etniaTokens: prev.etniaTokens - amount,
    }));
    setStakingAmount('');
    alert(`Staked ${amount} $ETNIA tokens!`);
  };

  const handleClaimRewards = () => {
    setUserData((prev) => ({
      ...prev,
      etniaTokens: prev.etniaTokens + rewards,
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
    const exchangeRate = 10; // 1 USDT/USDC = 10 $ETNIA
    const etniaToReceive = amount * exchangeRate;

    if (buyCurrency === 'USDT' && amount > userData.usdtBalance) {
      alert('Insufficient USDT balance!');
      return;
    }
    if (buyCurrency === 'USDC' && amount > userData.usdcBalance) {
      alert('Insufficient USDC balance!');
      return;
    }

    setUserData((prev) => ({
      ...prev,
      etniaTokens: prev.etniaTokens + etniaToReceive,
      usdtBalance: buyCurrency === 'USDT' ? prev.usdtBalance - amount : prev.usdtBalance,
      usdcBalance: buyCurrency === 'USDC' ? prev.usdcBalance - amount : prev.usdcBalance,
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
    alert(`Automatic presale buying configured: ${presaleConfig.amount} $ETNIA at ${presaleConfig.priceThreshold} USD`);
  };

  // Simulated Telegram group activity data
  const telegramGroups = [
    { name: 'Tether Official', activityScore: 92, progress: 85, members: 500000, messagesPerDay: 1200 },
    { name: 'Ethena Community', activityScore: 88, progress: 78, members: 300000, messagesPerDay: 900 },
    { name: 'TON Foundation', activityScore: 90, progress: 82, members: 450000, messagesPerDay: 1100 },
    { name: 'Binance Signals', activityScore: 85, progress: 70, members: 263000, messagesPerDay: 800 },
  ];

  // Simulated presale data (top 10 projects)
  const topPresales = [
    { name: 'Hamster Kombat', votes: 120000, volumeRaised: 15000000, blockchain: 'TON' },
    { name: 'DeDust', votes: 95000, volumeRaised: 7000000, blockchain: 'TON' },
    { name: 'StonFi', votes: 80000, volumeRaised: 5000000, blockchain: 'TON' },
    { name: 'Bemo', votes: 75000, volumeRaised: 4500000, blockchain: 'TON' },
    { name: 'Evaa Protocol', votes: 70000, volumeRaised: 4000000, blockchain: 'TON' },
    { name: 'Resistance Dog', votes: 65000, volumeRaised: 3500000, blockchain: 'TON' },
    { name: 'Dash 2 Trade', votes: 60000, volumeRaised: 15000000, blockchain: 'Ethereum' },
    { name: 'Aquachilling', votes: 55000, volumeRaised: 3000000, blockchain: 'TON' },
    { name: 'DOGS Telegram', votes: 50000, volumeRaised: 2500000, blockchain: 'TON' },
    { name: 'TapGoat', votes: 45000, volumeRaised: 2000000, blockchain: 'TON' },
  ];

  return (
    <AgentContainer variants={containerVariants} initial="hidden" animate="visible">
      <DashboardLayout>
        <Sidebar>
          <SidebarItem
            className={currentSection === 'Home' ? 'active' : ''}
            onClick={() => setCurrentSection('Home')}
          >
            <FaHome /> Home
          </SidebarItem>
          <SidebarSubSection>
            <SidebarSubTitle>Token Sale Progress</SidebarSubTitle>
            <ProgressBar>
              <ProgressFill percentage={tokenProgress} />
            </ProgressBar>
            <p style={{ color: '#B0B0D0', marginTop: '0.5rem' }}>{tokenProgress}% Sold</p>
          </SidebarSubSection>
          <SidebarSubSection>
            <SidebarSubTitle>Market Sentiment</SidebarSubTitle>
            <SentimentText>{sentiment}</SentimentText>
            {telegramGroups.map((group) => (
              <SentimentItem key={group.name}>
                <FaTelegram color="#00BFFF" />
                <span>{group.name}</span>
                <span>Score: {group.activityScore}</span>
                <span>Progress: {group.progress}%</span>
              </SentimentItem>
            ))}
          </SidebarSubSection>
          <SidebarSubSection>
            <SidebarSubTitle>Governance Proposal</SidebarSubTitle>
            <p style={{ color: '#B0B0D0', marginBottom: '0.5rem' }}>
              Increase Token Allocation?
            </p>
            <ContinueButton onClick={() => handleVote('yes')}>
              Yes ({votes.yes})
            </ContinueButton>
            <ContinueButton onClick={() => handleVote('no')}>
              No ({votes.no})
            </ContinueButton>
          </SidebarSubSection>
          <SidebarItem
            className={currentSection === 'Staking' ? 'active' : ''}
            onClick={() => setCurrentSection('Staking')}
          >
            <FaCoins /> Staking
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'BuyAIAgent' ? 'active' : ''}
            onClick={() => setCurrentSection('BuyAIAgent')}
          >
            <FaRobot /> Buy AI Agent
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'Presales' ? 'active' : ''}
            onClick={() => setCurrentSection('Presales')}
          >
            <FaCoins /> Top Presales
          </SidebarItem>
          <SidebarItem
            className={currentSection === 'Settings' ? 'active' : ''}
            onClick={() => setCurrentSection('Settings')}
          >
            <FaCog /> Settings
          </SidebarItem>
        </Sidebar>

        <DashboardSection>
          <div /><div /><div />
          <DashboardHeader>
            <DashboardTitle>Dashboard</DashboardTitle>
          </DashboardHeader>

          {currentSection === 'Home' && (
            <HomeSection>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <CardTitle>$ETNIA Tokens</CardTitle>
                <CardValue>{userData.etniaTokens.toFixed(2)}</CardValue>
              </HomeCard>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <CardTitle>Credits</CardTitle>
                <CardValue>${userData.credits}</CardValue>
              </HomeCard>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <CardTitle>USDT Balance</CardTitle>
                <CardValue>{userData.usdtBalance.toFixed(2)}</CardValue>
              </HomeCard>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <CardTitle>USDC Balance</CardTitle>
                <CardValue>{userData.usdcBalance.toFixed(2)}</CardValue>
              </HomeCard>
            </HomeSection>
          )}

          {currentSection === 'Staking' && (
            <HomeSection>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <CardTitle>Stake $ETNIA Tokens</CardTitle>
                <FormInput
                  type="number"
                  placeholder="Enter amount to stake"
                  value={stakingAmount}
                  onChange={(e) => setStakingAmount(e.target.value)}
                />
                <ContinueButton onClick={handleStake}>Stake Now</ContinueButton>
                <div style={{ marginTop: '1rem' }}>
                  <CardTitle>Staking Progress</CardTitle>
                  <ProgressBar>
                    <ProgressFill percentage={(stakedAmount / userData.etniaTokens) * 100} />
                  </ProgressBar>
                  <p style={{ color: '#B0B0D0', marginTop: '0.5rem' }}>
                    Staked: {stakedAmount.toFixed(2)} / {userData.etniaTokens.toFixed(2)} $ETNIA
                  </p>
                  <CardTitle>Rewards</CardTitle>
                  <CardValue>{rewards.toFixed(2)} $ETNIA</CardValue>
                  <ContinueButton onClick={handleClaimRewards}>Claim Rewards</ContinueButton>
                </div>
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
                    <SelectInput
                      value={buyCurrency}
                      onChange={(e) => setBuyCurrency(e.target.value)}
                    >
                      <option value="USDT">USDT</option>
                      <option value="USDC">USDC</option>
                    </SelectInput>
                    <FormInput
                      type="number"
                      placeholder={`Enter amount in ${buyCurrency}`}
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                    />
                    <p style={{ color: '#B0B0D0', margin: '0.5rem 0' }}>
                      You will receive: {(buyAmount * 10).toFixed(2) || 0} $ETNIA (1 {buyCurrency} = 10 $ETNIA)
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
                    placeholder="Price Threshold (USD)"
                    value={presaleConfig.priceThreshold}
                    onChange={(e) => setPresaleConfig({ ...presaleConfig, priceThreshold: e.target.value })}
                  />
                  <ContinueButton type="submit">Save Configuration</ContinueButton>
                </form>
              </HomeCard>
            </HomeSection>
          )}

          {currentSection === 'Presales' && (
            <HomeSection>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <CardTitle>Top 10 Presales</CardTitle>
                {topPresales.map((project) => (
                  <PresaleItem key={project.name}>
                    <ProjectLogo>{project.name[0]}</ProjectLogo>
                    <div>
                      <p style={{ color: '#FFFFFF' }}>{project.name}</p>
                      <p style={{ color: '#B0B0D0' }}>Votes: {project.votes}</p>
                      <p style={{ color: '#B0B0D0' }}>Raised: ${project.volumeRaised.toLocaleString()}</p>
                      <p style={{ color: '#B0B0D0' }}>Blockchain: {project.blockchain}</p>
                    </div>
                  </PresaleItem>
                ))}
              </HomeCard>
            </HomeSection>
          )}

          {currentSection === 'Settings' && (
            <HomeSection>
              <HomeCard variants={cardVariants} initial="hidden" animate="visible">
                <CardTitle>Settings</CardTitle>
                <p style={{ color: '#B0B0D0' }}>Customize your dashboard settings here.</p>
              </HomeCard>
            </HomeSection>
          )}
        </DashboardSection>
      </DashboardLayout>

      <ChatWidget>
        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
          {chatMessages.map((msg, index) => (
            <ChatMessage key={index} className={msg.type}>{msg.text}</ChatMessage>
          ))}
        </div>
        <form onSubmit={handleChatSubmit}>
          <ChatInput
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask me anything..."
          />
        </form>
      </ChatWidget>
    </AgentContainer>
  );
}

// Agent Component (Signup Flow)
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
                alt="Agent AI Bot"
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
                    <span>By signing up, you confirm you’ve read the Disclaimer</span>
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

// Existing styles for signup section
const AgentAISection = styled.div`
  padding: 4rem 2rem;
  background: url(${agentBackground}) center/cover no-repeat;
  background-blend-mode: overlay;
  background-color: rgba(10, 10, 26, 0.8);
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 153, 0.3);
  box-shadow: 0 0 20px rgba(0, 255, 153, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: #00FF99;
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
    background: #CC00FF;
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: ${particleFloat} 8s infinite;
    opacity: 0;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    gap: 1rem;
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
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    max-width: 100%;
  }
`;

const AgentAITitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #FF5733;
  text-shadow: 0 0 12px rgba(255, 87, 51, 0.7);
  text-transform: uppercase;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const BonusText = styled.div`
  font-size: 1.2rem;
  color: #B0B0D0;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-shadow: 0 0 8px rgba(0, 255, 153, 0.5);
  font-family: 'Roboto', sans-serif;

  span.etnia {
    color: #00BFFF;
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
  border: 2px solid #00FF99;
  border-radius: 12px;
  color: #FFFFFF;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  transition: all 0.3s ease;

  &::placeholder {
    color: #B0B0D0;
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: #CC00FF;
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
  color: #B0B0D0;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  accent-color: #00FF99;
  width: 16px;
  height: 16px;
`;

const LogInLink = styled.a`
  color: #00FF99;
  text-decoration: none;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #CC00FF;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default Agent;