// src/components/common/ProgressBar.jsx
import React from 'react';
import styled from 'styled-components';

const BarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1); /* Subtle background for contrast */
  border-radius: 5px;
  overflow: hidden;
  margin: 0.5rem 0;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--primary-color); /* Pink color to match the screenshot */
  width: ${props => Math.min(props.progress, 100)}%; /* Cap at 100% to prevent overflow */
  transition: width 0.3s ease;
  border-radius: 5px;
`;

const ProgressText = styled.div`
  position: absolute;
  top: -20px; /* Position above the bar to avoid overlap */
  right: 0;
  color: var(--text-dark);
  font-size: 0.8rem;
  font-weight: bold;
  text-shadow: var(--shadow-light);
`;

function ProgressBar({ progress }) {
  return (
    <BarContainer>
      <ProgressFill progress={progress} />
      <ProgressText>{progress > 0 ? `${progress.toFixed(2)}%` : '0%'}</ProgressText>
    </BarContainer>
  );
}

export default ProgressBar;