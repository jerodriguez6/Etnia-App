import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Slider from 'react-slick';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';

// Importamos las imágenes de Launchpads.jsx
import pool1Image from '../assets/images/pool1.jpg';
import pool2Image from '../assets/images/pool2.jpg';
import pool3Image from '../assets/images/pool3.jpg';
import pool4Image from '../assets/images/pool4.png';
import pool5Image from '../assets/images/pool5.png';
import pool6Image from '../assets/images/pool6.png';

// Estilos para el carrusel y las cards
const FeaturedSection = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CarouselCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3); /* Fondo transparente */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde claro */
  border-radius: 4px; /* Esquinas menos redondeadas */
  padding: 0.8rem;
  margin: 0 1rem; /* Más espacio entre cards */
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #ffffff;
  text-align: center;
  width: 180px; /* Tamaño más pequeño */
  min-height: 220px; /* Altura más compacta */

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    width: 160px;
    min-height: 200px;
  }
`;

const CardImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
`;

const CardTitle = styled.h3`
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
`;

const CardDetail = styled.p`
  font-size: 0.7rem;
  margin: 0.2rem 0;
  color: #e0e0e0;
`;

const NetworkLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.6rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  margin-top: 0.5rem;
`;

const CardButton = styled(Button)`
  margin-top: 0.6rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  background: var(--secondary-color);
  box-shadow: 0 0 6px rgba(0, 255, 255, 0.3);

  &:hover {
    background: var(--primary-color);
    box-shadow: 0 0 10px rgba(255, 64, 255, 0.4);
  }
`;

// Estilos para el formulario
const CreateContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 64, 255, 0.2), rgba(0, 255, 255, 0.2));
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
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

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 0.9rem;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Input = styled(motion.input)`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  box-shadow: 0 0 8px rgba(255, 64, 255, 0.3);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.7);
    border-color: var(--secondary-color);
  }

  &:invalid {
    border-color: #dc3545;
    box-shadow: 0 0 5px rgba(220, 53, 69, 0.5);
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: #ff40ff;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Instructions = styled.p`
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Summary = styled(motion.div)`
  background: rgba(255, 64, 255, 0.1);
  padding: 1.5rem;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  margin-top: 1.5rem;
  display: block;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const PreviewButton = styled(Button)`
  display: block;
  margin: 1.5rem auto 0;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: var(--border-radius);
  background: var(--primary-color);
  color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background: var(--secondary-color);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

// Animaciones
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
  });

  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const { theme } = useTheme();

  // Datos simulados para el carrusel de preventas favoritas, usando imágenes de Launchpads.jsx
  const featuredPresales = [
    {
      name: 'ShadowLoom',
      symbol: 'SHL',
      price: '0.05 ETH',
      progress: '0%',
      endDate: '2025-03-15',
      image: pool1Image,
      network: 'ETH',
    },
    {
      name: 'Blub',
      symbol: 'BLB',
      price: '0.02 BNB',
      progress: '235.92%',
      endDate: '2025-03-10',
      image: pool2Image,
      network: 'BSC',
    },
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

  // Configuración del carrusel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Mostrar 4 cards a la vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
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
    if (!formData.creatorWallet.trim()) newErrors.creatorWallet = 'Creator wallet is required';
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
    });
    setErrors({});
    setShowSummary(false);
  };

  return (
    <>
      {/* Sección del Carrusel de Preventas Favoritas */}
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
              <CardButton>Join Now</CardButton>
            </CarouselCard>
          ))}
        </Slider>
      </FeaturedSection>

      {/* Formulario de Creación de Preventa */}
      <CreateContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        theme={theme}
      >
        <h1 style={{ color: '#ffffff', textShadow: '0 0 10px rgba(0, 255, 255, 0.5)', marginBottom: '1rem' }}>
          Create Presale
        </h1>
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

          <PreviewButton type="submit">Preview Pool</PreviewButton>
        </Form>

        <Summary
          variants={summaryVariants}
          initial="hidden"
          animate={showSummary ? 'visible' : 'hidden'}
          theme={theme}
        >
          <h3>Presale Summary</h3>
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
          <Button onClick={handleConfirm}>Confirm Creation</Button>
          <Button onClick={() => setShowSummary(false)} style={{ background: 'var(--secondary-color)', marginLeft: '1rem' }}>
            Cancel
          </Button>
        </Summary>
      </CreateContainer>
    </>
  );
}

export default CreatePresale;