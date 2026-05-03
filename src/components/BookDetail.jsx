import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaClock, FaStar, FaMicrophone, FaLightbulb } from 'react-icons/fa';
import Sidebar from './Sidebar.jsx';
import TopNavbar from './TopNavbar.jsx';
import AuthModal from './AuthModal.jsx';
import { useAuth } from './AuthContext';
import './BookDetail.css';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
        const data = await response.json();
        console.log('Book details:', data);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load book details');
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleReadOrListen = () => {
    // If book is not premium, allow access without login
    if (!book.subscriptionRequired) {
      navigate(`/player/${id}`);
      return;
    }

    // If book is premium, require login
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    // Check if user is subscribed (this would need to be implemented)
    // For now, assuming we have a subscription check
    const isSubscribed = currentUser.subscriptionStatus === 'active';

    if (book.subscriptionRequired && !isSubscribed) {
      window.location.href = 'https://summarist.vercel.app/choose-plan';
    } else {
      navigate(`/player/${id}`);
    }
  };

  const handleAddToLibrary = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    // Save book details to user's library
    // This would need to be implemented with a backend call
    console.log('Adding book to library:', book);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  if (loading) {
    return (
      <div className="book-detail">
        <Sidebar />
        <TopNavbar />
        <div className="book-detail__content">
          <div className="book-detail__loading">Loading book details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-detail">
        <Sidebar />
        <TopNavbar />
        <div className="book-detail__content">
          <div className="book-detail__error">{error}</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-detail">
        <Sidebar />
        <TopNavbar />
        <div className="book-detail__content">
          <div className="book-detail__error">Book not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail">
      <Sidebar />
      <TopNavbar />
      <div className="book-detail__content">
        <div className="book-detail__container">
          <div className="book-detail__info-section">
            <h1 className="book-detail__title">{book.title}</h1>
            <p className="book-detail__author">By {book.author}</p>
            <p className="book-detail__subtitle">{book.subTitle}</p>
            
            <div className="book-detail__meta-grid">
              <div className="book-detail__meta-item">
                <span className="book-detail__meta-value">
                  <FaStar className="book-detail__icon" />
                  {book.averageRating} <span className="book-detail__total-rating">({book.totalRating} Ratings)</span>
                </span>
              </div>
              <div className="book-detail__meta-item">
                <span className="book-detail__meta-label">Duration</span>
                <span className="book-detail__meta-value">{book.bookDuration}</span>
              </div>
              <div className="book-detail__meta-item">
                <span className="book-detail__meta-value">
                  <FaMicrophone className="book-detail__icon" />
                  {book.type}
                </span>
              </div>
              <div className="book-detail__meta-item">
                <span className="book-detail__meta-value">
                  <FaLightbulb className="book-detail__icon" />
                  {book.keyIdeas}
                </span>
              </div>
            </div>

            <div className="book-detail__actions">
              <button className="book-detail__read-button" onClick={handleReadOrListen}>Read</button>
              <button className="book-detail__listen-button" onClick={handleReadOrListen}>Listen</button>
              <button className="book-detail__library-button" onClick={handleAddToLibrary}>Add title to My Library</button>
            </div>

            <div className="book-detail__description">
              <h3>What's it about?</h3>
              <div className="book-detail__tags">
                {book.tags && book.tags.map((tag, index) => (
                  <span key={index} className="book-detail__tag">{tag}</span>
                ))}
              </div>
              {book.subscriptionRequired && !currentUser ? (
                <div className="book-detail__guest-message">
                  <p>Please sign in to view the full description</p>
                </div>
              ) : (
                <p>{book.bookDescription}</p>
              )}
            </div>

            <div className="book-detail__author-section">
              <h3>About the author</h3>
              <p>{book.authorDescription}</p>
            </div>
          </div>
          <div className="book-detail__image-section">
            <img src={book.imageLink} alt={book.title} className="book-detail__image" />
            {book.subscriptionRequired && (
              <div className="book-detail__premium-badge">
                Premium
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} />
    </div>
  );
}

export default BookDetail;
