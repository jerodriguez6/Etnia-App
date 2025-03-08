import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext'; // Añade esta línea

const FilterContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  background: ${props => props.theme.background};
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-hover);
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--shadow-hover);
  }
`;

function FilterBar({ onFilter, onSearch }) {
  const [status, setStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme(); // Ahora está definido

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <FilterContainer theme={theme}>
      <Select value={status} onChange={handleStatusChange} theme={theme}>
        <option value="All">All</option>
        <option value="Live">Live</option>
        <option value="Ended">Ended</option>
      </Select>
      <Input
        type="text"
        placeholder="Search pools..."
        value={searchTerm}
        onChange={handleSearchChange}
        theme={theme}
      />
    </FilterContainer>
  );
}

export default FilterBar;