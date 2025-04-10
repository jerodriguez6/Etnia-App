// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// Importamos los logos de las blockchains
import ethLogo from '../../assets/images/eth-logo.png';
import bnbLogo from '../../assets/images/bnb-logo.png';
import solLogo from '../../assets/images/sol-logo.png';
import polLogo from '../../assets/images/polygon-logo.png';


// Importamos el logo blanc.png
import blancLogo from '../../assets/images/blanc.png';

// Importamos el logo certik.svg
import certikLogo from '../../assets/images/certik.svg';

// Importamos los íconos de redes sociales
import emailIcon from '../../assets/images/email-icon.png';
import telegramIcon from '../../assets/images/telegram-icon.png';
import linkedinIcon from '../../assets/images/linkedin-icon.png';
import twitterIcon from '../../assets/images/twitter-icon.png';
import mediumIcon from '../../assets/images/medium-icon.png';

const FooterStyled = styled(motion.footer)`
  background: #000000; /* Fondo negro puro */
  color: ${props => props.theme.textLight || '#ffffff'};
  padding: 2rem 1rem;
  text-align: center;
  border-top: 1px solid var(--gray-light);
  box-shadow: var(--shadow-light);
  position: relative;
  z-index: 10;

  /* Efecto futurista: gradiente radial sutil */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 64, 255, 0.1) 0%, transparent 70%);
    z-index: 0;
    opacity: 0.5;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  flex: 1; /* Cada sección ocupa el mismo espacio */
  min-width: 200px; /* Asegura un ancho mínimo para evitar que se encoja demasiado */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centra verticalmente */
  gap: 0.5rem;
  text-align: center; /* Centra el texto */
`;

const ChainIcons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChainIcon = styled.img`
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.5)); /* Resplandor cian */
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
  }
`;

const PoweredBy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
  width: 100%; /* Asegura que ocupe todo el ancho disponible */
  text-align: center; /* Centra el texto */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Centra horizontalmente el logo y el texto */
  gap: 0.5rem;
`;

const BlancLogo = styled.img`
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 0 5px rgba(255, 64, 255, 0.5)); /* Resplandor rosa */
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 10px rgba(255, 64, 255, 0.8));
  }
`;

const AuditedBy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Centra el logo */
  gap: 0.5rem;
`;

const AuditLogo = styled.img`
  width: 60px; /* Ajusta el tamaño del logo según sea necesario */
  height: auto;
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3));
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
`;

const FooterLink = styled(motion.a)`
  color: ${props => props.theme.textLight || '#ffffff'};
  text-decoration: none;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(255, 64, 255, 0.3);
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: var(--primary-color);
    text-shadow: var(--glow-effect);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialIconImage = styled.img`
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.3));
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.textLight || '#ffffff'};
  opacity: 0.7;
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
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <h4>Supported Chains</h4>
            <ChainIcons>
              <ChainIcon src={ethLogo} alt="Ethereum" />
              <ChainIcon src={bnbLogo} alt="BNB Chain" />
              <ChainIcon src={solLogo} alt="Solana" />
              <ChainIcon src={polLogo} alt="Polygon" />
            </ChainIcons>
          </FooterSection>
          <FooterSection>
            <PoweredBy>
              Powered by
              <LogoContainer>
                <BlancLogo src={blancLogo} alt="SHARK TECHNOLOGY Logo" />
                <span>SHARK TECHNOLOGY</span>
              </LogoContainer>
            </PoweredBy>
          </FooterSection>
          <FooterSection>
            <h4>Smart Contracts Audited by</h4>
            <AuditedBy>
              <AuditLogo src={certikLogo} alt="Certik" />
            </AuditedBy>
          </FooterSection>
        </FooterTop>
        <FooterBottom>
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
              EtniaCon
            </FooterLink>
            <FooterLink
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              href="#"
              theme={theme}
            >
              Agent IA
            </FooterLink>
            <FooterLink
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              href="#"
              theme={theme}
            >
              Staking
            </FooterLink>
            <FooterLink
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              href="#"
              theme={theme}
            >
              Apply
            </FooterLink>
            <FooterLink
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.1 }}
              href="#"
              theme={theme}
            >
              Terms & Conditions
            </FooterLink>
          </FooterLinks>
          <SocialIcons>
            <SocialIcon
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2 }}
              href="#"
              theme={theme}
            >
              <SocialIconImage src={emailIcon} alt="Email" />
            </SocialIcon>
            <SocialIcon
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2 }}
              href="#"
              theme={theme}
            >
              <SocialIconImage src={telegramIcon} alt="Telegram" />
            </SocialIcon>
            <SocialIcon
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2 }}
              href="#"
              theme={theme}
            >
              <SocialIconImage src={linkedinIcon} alt="LinkedIn" />
            </SocialIcon>
            <SocialIcon
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2 }}
              href="#"
              theme={theme}
            >
              <SocialIconImage src={twitterIcon} alt="Twitter" />
            </SocialIcon>
            <SocialIcon
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2 }}
              href="#"
              theme={theme}
            >
              <SocialIconImage src={mediumIcon} alt="Medium" />
            </SocialIcon>
          </SocialIcons>
        </FooterBottom>
        <Copyright>© 2025 SHARK TECHNOLOGY | All rights reserved</Copyright>
      </FooterContent>
    </FooterStyled>
  );
}

export default Footer;