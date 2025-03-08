// src/components/common/ProgressBar.jsx
import React from 'react';
import styled from 'styled-components';

const BarContainer = styled.div`
  width: 100%;
  height: 10px;
  background: #333;
  border-radius: 5px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const Progress = styled.div`
  height: 100%;
  background: #00ff00;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

function ProgressBar({ progress }) {
  return (
    <BarContainer>
      <Progress progress={progress} />
    </BarContainer>
  );
}

export default ProgressBar;