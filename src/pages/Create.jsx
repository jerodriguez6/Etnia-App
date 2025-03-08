import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';

const CreateContainer = styled(motion.div)`
  max-width: 95%;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 64, 255, 0.1), rgba(0, 255, 255, 0.1));
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
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
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: var(--shadow-hover);
    border-color: var(--primary-color);
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
  background: rgba(255, 64, 255, 0.05);
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  margin-top: 1rem;
  display: block;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const PreviewButton = styled(Button)`
  display: block;
  margin: 1.5rem auto 0; /* Centra el botón */
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

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const inputVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const summaryVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
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
        {/* Project Name */}
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

        {/* Token Symbol */}
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

        {/* Token Address */}
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

        {/* Sale Price */}
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

        {/* Total Tokens */}
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

        {/* Min Purchase */}
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

        {/* Max Purchase */}
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

        {/* Start Date */}
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

        {/* End Date */}
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

        {/* Creator Wallet */}
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

        {/* Submit Button */}
        <PreviewButton type="submit">Preview Pool</PreviewButton>
      </Form>

      {/* Summary */}
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
  );
}

export default CreatePresale;