import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const FooterStyled = styled(motion.footer)`
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 1rem;
  text-align: center;
  border-top: 1px solid var(--gray-light);
  box-shadow: var(--shadow-light);
  position: relative;
  z-index: 10; /* Asegura que esté encima de las partículas */
`;

const FooterLinks = styled(motion.div)`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const FooterLink = styled(motion.a)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: var(--primary-color);
    text-shadow: var(--glow-effect);
  }
`;

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

function Footer() {
  const { theme } = useTheme();

  return (
    <FooterStyled
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      theme={theme}
    >
      <p>© 2025 SHARK TECHNOLOGY. All rights reserved.</p>
      <FooterLinks
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        theme={theme}
      >
        <FooterLink
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          href="#"
          theme={theme}
        >
          Terms
        </FooterLink>
        <FooterLink
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          href="#"
          theme={theme}
        >
          Privacy
        </FooterLink>
        <FooterLink
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          href="#"
          theme={theme}
        >
          Contact
        </FooterLink>
      </FooterLinks>
      <div>
        <FooterLink
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          href="#"
          theme={theme}
        >
          Twitter
        </FooterLink> | 
        <FooterLink
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          href="#"
          theme={theme}
        >
          Discord
        </FooterLink> | 
        <FooterLink
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          href="#"
          theme={theme}
        >
          Telegram
        </FooterLink>
      </div>
    </FooterStyled>
  );
}

export default Footer;