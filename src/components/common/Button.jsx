import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Importa motion aquí
import { Howl } from 'howler';

const StyledButton = styled(motion.button)` // Usa motion.button aquí
  background: var(--primary-color);
  color: var(--text-light);
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background: var(--secondary-color);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
    transform: translateY(-2px);
  }
`;

const ButtonComponent = ({ children, ...props }) => {
  const clickSound = new Howl({
    src: ['/assets/sounds/click.mp3'],
    volume: 0.5,
  });

  const hoverSound = new Howl({
    src: ['/assets/sounds/hover.mp3'],
    volume: 0.3,
  });

  const handleClick = (e) => {
    clickSound.play();
    if (props.onClick) props.onClick(e);
  };

  const handleHover = () => {
    hoverSound.play();
  };

  return (
    <StyledButton
      {...props}
      onClick={handleClick}
      onMouseEnter={handleHover}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </StyledButton>
  );
};

export default memo(ButtonComponent);