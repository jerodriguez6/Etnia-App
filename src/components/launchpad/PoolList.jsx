import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PoolCard from './PoolCard';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const ListContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  background: ${props => props.theme.background};
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin: 1rem auto;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const mockPools = [
  { id: 1, name: 'Project Alpha', totalRaised: '$500,000', progress: 75, status: 'Live' },
  { id: 2, name: 'Project Beta', totalRaised: '$250,000', progress: 40, status: 'Ended' },
];

function PoolList() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { theme } = useTheme();

  const filteredPools = useMemo(() => {
    let result = [...mockPools];
    if (filter !== 'All') {
      result = result.filter(pool => pool.status === filter);
    }
    if (search) {
      result = result.filter(pool => pool.name.toLowerCase().includes(search.toLowerCase()));
    }
    return result;
  }, [filter, search]);

  const handleFilter = (status) => {
    setFilter(status);
  };

  const handleSearch = (term) => {
    setSearch(term);
  };

  return (
    <ListContainer theme={theme}>
      {filteredPools.length > 0 ? (
        filteredPools.map((pool, index) => (
          <motion.div
            key={pool.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <PoolCard pool={pool} />
          </motion.div>
        ))
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-dark)', padding: '2rem' }}>
          No pools found.
        </div>
      )}
    </ListContainer>
  );
}

export default PoolList;