import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
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

// Estilo del Botón Reutilizable (sin cortes, cuadrado)
const StyledButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  border-radius: 0; /* Cuadrado */
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
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

// Variante para botones "Cancel" (sin cortes, cuadrado)
const StyledCancelButton = styled(StyledButton)`
  background: linear-gradient(45deg, #444, #666);
  border-image: linear-gradient(45deg, #444, #666) 1;

  &:hover {
    box-shadow: 0 0 15px rgba(255, 64, 255, 0.5);
  }
`;

// Variante para botones "Join Now" (sin cortes, sin relleno, solo borde)
const JoinNowButton = styled(StyledButton)`
  background: transparent; /* Sin color de relleno */
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5); /* Sombra para legibilidad del texto */
  
  &:hover {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

// Estilos para el carrusel y las cards (sin cambios, ya están perfectas)
const FeaturedSection = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  position: relative;
  z-index: 2;

  .slick-slider {
    padding: 0 1rem;
  }

  .slick-slide {
    padding: 0 0.5rem;
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
    padding: 0.5rem;
    .slick-slider {
      padding: 0 0.5rem;
    }
    .slick-slide {
      padding: 0 0.3rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.2rem;
    .slick-slider {
      padding: 0 0.2rem;
    }
    .slick-slide {
      padding: 0 0.1rem;
    }
  }
`;

const SectionTitle = styled.h2`
  color: var(--text-light);
  text-shadow: 0 0 10px rgba(255, 64, 255, 0.6);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const CarouselCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 50, 50, 0.8));
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  border-radius: 0;
  padding: 1rem;
  margin: 0 0.5rem;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: var(--text-light);
  text-align: center;
  min-height: 220px;
  clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%); /* Mantenemos el clip-path, ya está perfecto */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    min-height: 200px;
    padding: 0.8rem;
    margin: 0 0.3rem;
  }

  @media (max-width: 480px) {
    min-height: 180px;
    padding: 0.6rem;
    margin: 0 0.1rem;
  }
`;

const CardImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  border: 2px solid transparent;
  border-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color)) 1;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.5);
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const CardDetail = styled.p`
  font-size: 0.9rem;
  margin: 0.2rem 0;
  color: #ffffff;
  text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const NetworkLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 0.2rem 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
    padding: 0.2rem 0.4rem;
  }
`;

// Estilos para el Modal
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
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: var(--background-light);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--glow-effect);
  max-width: 800px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: var(--text-dark);
  text-shadow: var(--shadow-light);
  margin-bottom: 1.5rem;
`;

const BlockchainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BlockchainCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-light);
  text-align: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: var(--shadow-hover);
    transform: translateY(-5px);
  }
`;

const BlockchainLogo = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 auto 0.5rem;
  border-radius: 50%;
  box-shadow: var(--shadow-light);
`;

const BlockchainTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
`;

const BlockchainDescription = styled.p`
  font-size: 0.8rem;
  color: var(--text-light);
`;

// Estilos para el formulario
const CreateContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 64, 255, 0.2), rgba(0, 255, 255, 0.2));
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--glow-effect);
  position: relative;
  z-index: 3;
  min-height: 400px;

  @media (max-width: 768px) {
    max-width: 98%;
    padding: 1.5rem;
    min-height: 300px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 1rem;
    min-height: 200px;
  }
`;

const PresaleTitle = styled.h1`
  color: var(--text-dark);
  text-shadow: var(--shadow-light);
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-dark);
  font-size: 0.9rem;
  text-shadow: var(--shadow-light);
`;

const Input = styled(motion.input)`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  background: rgba(0, 0, 0, 0.5);
  color: var(--text-dark);
  box-shadow: var(--shadow-light);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: var(--shadow-hover);
    border-color: var(--secondary-color);
  }

  &:invalid {
    border-color: #dc3545;
    box-shadow: 0 0 5px rgba(220, 53, 69, 0.5);
  }
`;

const ErrorMessage = styled.p`
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const Instructions = styled.p`
  color: var(--text-light);
  font-size: 1rem;
  margin-bottom: 1rem;
  text-shadow: var(--shadow-light);
`;

const Summary = styled(motion.div)`
  background: rgba(255, 64, 255, 0.1);
  padding: 1.5rem;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  margin-top: 1.5rem;
  display: block;
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

// Datos de las Blockchains con logos
const blockchains = [
  {
    name: 'Ethereum',
    description: 'High security, extensive dApp ecosystem, higher gas fees.',
    logo: ethereumLogo,
  },
  {
    name: 'Binance Smart Chain',
    description: 'Low gas fees, fast transactions, EVM compatible.',
    logo: bscLogo,
  },
  {
    name: 'Solana',
    description: 'Ultra-fast, low fees, high scalability. Perfect for memecoins.',
    logo: solanaLogo,
  },
  {
    name: 'Polygon',
    description: 'Low gas fees, scalable, fast. Ethereum compatible.',
    logo: polygonLogo,
  },
];

// Componente Modal para selección de Blockchain
function BlockchainModal({ isOpen, onClose, onSelect }) {
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

// Componente Principal
function CreatePresale() {
  const [formData, setFormData] = useState({
    projectName: '',
    tokenSymbol: '',
    tokenAddress: '',
    salePrice: '',
    totalTokens: '',
    minPurchase: '',
    maxPurchase: '',
    startDate: '',
    endDate: '',
    creatorWallet: '',
    selectedChain: '',
  });

  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();

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
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: '10px' },
      },
    ],
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required';
    if (!formData.tokenAddress.trim()) newErrors.tokenAddress = 'Token address is required';
    if (!formData.salePrice.trim()) newErrors.salePrice = 'Sale price is required';
    if (!formData.totalTokens.trim()) newErrors.totalTokens = 'Total tokens is required';
    if (!formData.minPurchase.trim()) newErrors.minPurchase = 'Minimum purchase is required';
    if (!formData.maxPurchase.trim()) newErrors.maxPurchase = 'Maximum purchase is required';
    if (!formData.startDate.trim()) newErrors.startDate = 'Start date is required';
    if (!formData.endDate.trim()) newErrors.endDate = 'End date is required';
    if (!formData.creatorWallet.trim()) newErrors.creatorWallet = 'Creator wallet address is required';
    if (!formData.selectedChain) newErrors.selectedChain = 'Please select a blockchain';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setShowSummary(true);
    } else {
      setErrors(newErrors);
      setShowSummary(false);
    }
  };

  const handleConfirm = () => {
    console.log('Presale Created:', formData);
    alert('Presale created successfully!');
    setFormData({
      projectName: '',
      tokenSymbol: '',
      tokenAddress: '',
      salePrice: '',
      totalTokens: '',
      minPurchase: '',
      maxPurchase: '',
      startDate: '',
      endDate: '',
      creatorWallet: '',
      selectedChain: '',
    });
    setErrors({});
    setShowSummary(false);
  };

  const handleSelectChain = (chain) => {
    setFormData({ ...formData, selectedChain: chain });
    setIsModalOpen(false);
  };

  return (
    <>
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

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <StyledButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}
        >
          Create Presale
        </StyledButton>
      </div>

      <BlockchainModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectChain}
      />

      {formData.selectedChain && (
        <CreateContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          theme={theme}
        >
          <PresaleTitle>
            Create Presale on {formData.selectedChain}
          </PresaleTitle>
          <Instructions theme={theme}>
            Fill out the form below to create a new presale. All fields are required.
          </Instructions>
          <Form onSubmit={handleSubmit}>
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
                required
              />
              {errors.tokenAddress && <ErrorMessage>{errors.tokenAddress}</ErrorMessage>}
            </FormGroup>

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
                required
              />
              {errors.maxPurchase && <ErrorMessage>{errors.maxPurchase}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Start Date</Label>
              <Input
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              {errors.startDate && <ErrorMessage>{errors.startDate}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>End Date</Label>
              <Input
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
              {errors.endDate && <ErrorMessage>{errors.endDate}</ErrorMessage>}
            </FormGroup>

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
                required
              />
              {errors.creatorWallet && <ErrorMessage>{errors.creatorWallet}</ErrorMessage>}
            </FormGroup>

            <StyledButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={{ display: 'block', margin: '1.5rem auto 0', padding: '1rem 2rem', fontSize: '1rem' }}
            >
              Preview Pool
            </StyledButton>
          </Form>

          <Summary
            variants={summaryVariants}
            initial="hidden"
            animate={showSummary ? 'visible' : 'hidden'}
            theme={theme}
          >
            <h3>Presale Summary</h3>
            <p><strong>Blockchain:</strong> {formData.selectedChain}</p>
            <p><strong>Project Name:</strong> {formData.projectName}</p>
            <p><strong>Token Symbol:</strong> {formData.tokenSymbol}</p>
            <p><strong>Token Address:</strong> {formData.tokenAddress}</p>
            <p><strong>Sale Price:</strong> {formData.salePrice}</p>
            <p><strong>Total Tokens:</strong> {formData.totalTokens}</p>
            <p><strong>Min Purchase:</strong> {formData.minPurchase}</p>
            <p><strong>Max Purchase:</strong> {formData.maxPurchase}</p>
            <p><strong>Start Date:</strong> {formData.startDate}</p>
            <p><strong>End Date:</strong> {formData.endDate}</p>
            <p><strong>Creator Wallet:</strong> {formData.creatorWallet}</p>
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
      )}
    </>
  );
}

export default CreatePresale;