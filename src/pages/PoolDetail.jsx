import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import Button from '../components/common/Button';
import Web3 from 'web3';
import { mockPools } from '../data/mockPools';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Import the video file from src/assets/videos
import video1 from '../assets/videos/tuto.mp4';

// Registramos los elementos de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

Modal.setAppElement('#root');

const MainContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  background: ${(props) => props.theme.background};
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    margin: 1rem auto;
  }
`;

const LeftSection = styled.div`
  flex: 2;
  color: ${(props) => props.theme.text};
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RightSection = styled.div`
  background: rgba(206, 117, 206, 0.1);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: 0 0 10px rgba(255, 64, 255, 0.2);
  text-align: center;
`;

const SummarySection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  color: ${(props) => props.theme.text};
`;

const SummaryTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.textDark || '#fff'};
`;

const SummaryContent = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${(props) => props.theme.text};
`;

const CommentsSection = styled.div`
  padding: 1.5rem;
  background: rgba(134, 86, 86, 0.05);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  color: ${(props) => props.theme.text};
`;

const CommentsTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.textDark || '#fff'};
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CommentInput = styled.textarea`
  padding: 0.8rem;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  width: 100%;
  min-height: 100px;
  resize: vertical;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: var(--shadow-hover);
    border-color: var(--primary-color);
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CommentAuthor = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.textDark || '#fff'};
  margin-bottom: 0.5rem;
`;

const CommentText = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.text};
`;

const CommentDate = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
`;

const Banner = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  position: relative;
`;

const TokenInfo = styled.div`
  margin-bottom: 1rem;
  p {
    margin: 0.5rem 0;
    strong {
      color: ${(props) => props.theme.textDark || '#fff'};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  a {
    color: var(--primary-color);
    font-size: 1.5rem;
    transition: color 0.3s ease;
    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const VideoPromo = styled.div`
  margin: 1rem 0;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-light);
  min-height: 200px; /* Ensure the card has a minimum height even if the video fails to load */
`;

const Timer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
  div {
    background: #1a1a1a;
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    min-width: 50px;
    color: #fff;
    span:first-child {
      display: block;
      font-size: 1.8rem;
      font-weight: bold;
      line-height: 1;
    }
    span:last-child {
      font-size: 0.7rem;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: var(--gray-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  margin: 1rem 0;
`;

const Progress = styled.div`
  height: 100%;
  background: var(--primary-color);
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

const SaleInfo = styled.div`
  margin: 1rem 0;
  p {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    color: ${(props) => props.theme.text};
    font-size: 0.9rem;
  }
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.background};
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
  max-width: 500px;
  margin: 0 auto;
`;

const ModalInput = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--gray-light);
  border-radius: var(--border-radius);
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: var(--shadow-hover);
    border-color: var(--primary-color);
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

function PoolDetail() {
  const { id } = useParams();
  const pool = mockPools.find((p) => p.id === parseInt(id));
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [investment, setInvestment] = useState('');
  const [account, setAccount] = useState(null);
  const [timerLabel, setTimerLabel] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pool) return;

      const now = new Date();
      const startDate = new Date(pool.saleStartDate);
      const endDate = new Date(pool.saleEndDate);

      if (pool.status === 'Ended') {
        setTimerLabel('Sale Ended');
        setTimeLeft({});
      } else if (pool.status === 'Upcoming' && now < startDate) {
        setTimerLabel('Presale Starts In');
        setTimeLeft(calculateTimeLeft(pool.saleStartDate));
      } else if (
        (pool.status === 'Live' || (pool.status === 'Upcoming' && now >= startDate)) &&
        now < endDate
      ) {
        setTimerLabel('Presale Ends In');
        setTimeLeft(calculateTimeLeft(pool.saleEndDate));
      } else {
        setTimerLabel('Sale Ended');
        setTimeLeft({});
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [pool]);

  // Mock initial comments (could be fetched from an API in a real app)
  useEffect(() => {
    const initialComments = [
      {
        author: 'User1',
        text: 'This project looks promising! Excited to see where it goes.',
        date: new Date('2025-05-14T10:00:00'),
      },
      {
        author: 'User2',
        text: 'I have some concerns about the tokenomics. Can the team clarify the liquidity allocation?',
        date: new Date('2025-05-14T12:30:00'),
      },
    ];
    setComments(initialComments);
  }, []);

  if (!pool) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-dark)', padding: '2rem' }}>
        Pool not found
      </div>
    );
  }

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleParticipate = () => {
    if (!account) {
      alert('Please connect your wallet first.');
      return;
    }
    if (investment.trim() && parseFloat(investment) > 0) {
      alert(`Participated in ${pool.name} with ${investment} USDT!`);
      setInvestment('');
      closeModal();
    } else {
      alert('Please enter a valid investment amount.');
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert('Please enter a comment.');
      return;
    }
    if (!account) {
      alert('Please connect your wallet to comment.');
      return;
    }

    const newCommentObj = {
      author: account.slice(0, 6) + '...' + account.slice(-4), // Shortened wallet address
      text: newComment,
      date: new Date(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  // Datos para el gráfico de tokenomics
  const tokenomicsData = {
    labels: ['Presale Allocation', 'Liquidity', 'Team', 'Marketing'],
    datasets: [
      {
        data: [
          parseFloat(pool.tokenomics.presaleAllocation),
          parseFloat(pool.tokenomics.liquidity),
          parseFloat(pool.tokenomics.team),
          parseFloat(pool.tokenomics.marketing),
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: theme.text,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <MainContainer variants={containerVariants} initial="hidden" animate="visible" theme={theme}>
      {/* Sección Izquierda: Detalles del Proyecto */}
      <LeftSection theme={theme}>
        <Banner image={pool.image}>{pool.bannerText}</Banner>
        <h1>{pool.name} Presale</h1>
        <TokenInfo>
          <h3>About</h3>
          <p>{pool.description}</p>
        </TokenInfo>
        <SocialLinks>
          <a href={pool.website} target="_blank" rel="noopener noreferrer">
            🌐 Website
          </a>
          <a href={pool.whitepaper} target="_blank" rel="noopener noreferrer">
            📄 Whitepaper
          </a>
          <a href={pool.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-telegram-plane"></i>
          </a>
          <a href={pool.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </SocialLinks>
        <TokenInfo>
          <h3>Token</h3>
          <p>
            <strong>Address:</strong> {pool.tokenAddress}{' '}
            <span style={{ color: 'red' }}>(Do not send tokens to this address)</span>
          </p>
        </TokenInfo>
        <TokenInfo>
          <h3>Tokenomics</h3>
          <div style={{ height: '200px', margin: '1rem 0' }}>
            <Doughnut data={tokenomicsData} options={chartOptions} />
          </div>
          <p>
            <strong>Total Supply:</strong> {pool.tokenomics.totalSupply}
          </p>
          <p>
            <strong>Presale Allocation:</strong> {pool.tokenomics.presaleAllocation}
          </p>
          <p>
            <strong>Liquidity:</strong> {pool.tokenomics.liquidity}
          </p>
          <p>
            <strong>Team:</strong> {pool.tokenomics.team}
          </p>
          <p>
            <strong>Marketing:</strong> {pool.tokenomics.marketing}
          </p>
        </TokenInfo>
        <VideoPromo>
          <ReactPlayer
            url={video1}
            controls={false}
            playing={true}
            loop={true}
            muted={true}
            width="100%"
            height="auto"
            style={{ borderRadius: 'var(--border-radius)' }}
          />
        </VideoPromo>
      </LeftSection>

      {/* Sección Derecha: Compra, Contador, Resumen y Comentarios */}
      <RightColumn>
        <RightSection theme={theme}>
          <h3 style={{ marginBottom: '1rem', color: theme.text }}>{timerLabel}</h3>
          {Object.keys(timeLeft).length > 0 ? (
            <Timer theme={theme}>
              <div>
                <span>{timeLeft.days}</span>
                <span>Days</span>
              </div>
              <div>
                <span>{timeLeft.hours}</span>
                <span>Hrs</span>
              </div>
              <div>
                <span>{timeLeft.minutes}</span>
                <span>Mins</span>
              </div>
              <div>
                <span>{timeLeft.seconds}</span>
                <span>Secs</span>
              </div>
            </Timer>
          ) : (
            <p style={{ color: theme.text, marginBottom: '1rem' }}>
              {timerLabel === 'Sale Ended' ? 'The sale has ended.' : 'Calculating...'}
            </p>
          )}
          <SaleInfo theme={theme}>
            <p>
              <span>{pool.totalRaised}</span>
              <span>{pool.target}</span>
            </p>
            <ProgressBar>
              <Progress progress={pool.progress} />
            </ProgressBar>
            <p>
              <span>Status</span>
              <span>{pool.status}</span>
            </p>
            <p>
              <span>Sale Type</span>
              <span>{pool.saleType}</span>
            </p>
          </SaleInfo>
          {pool.status === 'Live' ? (
            account ? (
              <Button
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                theme={theme}
                style={{ width: '100%', background: '#ff4081', color: '#fff' }}
              >
                Participate Now
              </Button>
            ) : (
              <Button
                onClick={connectWallet}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                theme={theme}
                style={{ width: '100%', background: '#ff4081', color: '#fff' }}
              >
                Connect Wallet
              </Button>
            )
          ) : (
            <Button
              disabled
              style={{ width: '100%', background: '#ccc', color: '#666' }}
              theme={theme}
            >
              {pool.status === 'Upcoming' ? 'Coming Soon' : 'Sale Ended'}
            </Button>
          )}
        </RightSection>

        {/* Sección de Resumen */}
        <SummarySection theme={theme}>
          <SummaryTitle>Project Summary</SummaryTitle>
          <SummaryContent>
            {pool.name} aims to revolutionize {pool.industry || 'its sector'} by {pool.summary || 'introducing innovative solutions.'}. Key highlights include:
            <ul>
              <li>Unique Value Proposition: {pool.valueProp || 'TBD'}</li>
              <li>Target Market: {pool.targetMarket || 'Global'}</li>
              <li>Team Experience: {pool.teamExperience || 'Experienced blockchain developers'}</li>
            </ul>
          </SummaryContent>
        </SummarySection>

        {/* Sección de Comentarios */}
        <CommentsSection theme={theme}>
          <CommentsTitle>Community Comments</CommentsTitle>
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment about the project..."
              theme={theme}
            />
            <Button type="submit" theme={theme}>
              Submit Comment
            </Button>
          </CommentForm>
          <CommentList>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <CommentItem key={index}>
                  <CommentAuthor>{comment.author}</CommentAuthor>
                  <CommentText>{comment.text}</CommentText>
                  <CommentDate>{comment.date.toLocaleString()}</CommentDate>
                </CommentItem>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </CommentList>
        </CommentsSection>
      </RightColumn>

      {/* Modal para Participar */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000 },
          content: { background: 'none', border: 'none', padding: 0, inset: '20px' },
        }}
      >
        <ModalContent theme={theme}>
          <h2>Participate in {pool.name}</h2>
          <p>Enter your investment amount in USDT:</p>
          <ModalInput
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder="e.g., 100"
            min="1"
            step="0.01"
            theme={theme}
          />
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Button onClick={handleParticipate} theme={theme}>
              Confirm
            </Button>
            <Button
              onClick={closeModal}
              style={{ background: 'var(--secondary-color)' }}
              theme={theme}
            >
              Cancel
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </MainContainer>
  );
}

export default PoolDetail;