import { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import TopNavbar from './TopNavbar.jsx';
import './ForYou.css';

function ForYou() {
  const [books, setBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedError, setRecommendedError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load books');
        setLoading(false);
      }
    };

    const fetchRecommendedBooks = async () => {
      try {
        const response = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended');
        const data = await response.json();
        setRecommendedBooks(data);
        setLoadingRecommended(false);
      } catch (err) {
        setRecommendedError('Failed to load recommended books');
        setLoadingRecommended(false);
      }
    };

    fetchBooks();
    fetchRecommendedBooks();
  }, []);

  if (loading) {
    return (
      <div className="for-you">
        <Sidebar />
        <TopNavbar />
        <div className="for-you__content">
          <div className="for-you__loading">Loading books...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="for-you">
        <Sidebar />
        <TopNavbar />
        <div className="for-you__content">
          <div className="for-you__error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="for-you">
      <Sidebar />
      <TopNavbar />
      <div className="for-you__content">
        <div className="row">
          <h2 className="for-you__title">For You</h2>
          <div className="for-you__books-list">
            {books.map((book) => (
              <div key={book.id} className="book-card-horizontal">
                <img src={book.imageLink} alt={book.title} className="book-card-horizontal__image" />
                <div className="book-card-horizontal__content">
                  <h3 className="book-card-horizontal__title">{book.title}</h3>
                  <p className="book-card-horizontal__subtitle">{book.subTitle}</p>
                  <p className="book-card-horizontal__author">By {book.author}</p>
                  <div className="book-card-horizontal__audio-info">
                    <button className="book-card-horizontal__play-button">
                      <span className="book-card-horizontal__play-icon">▶</span>
                    </button>
                    <span className="book-card-horizontal__duration">15:32</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          <h2 className="for-you__title">Recommended for you</h2>
          <div className="for-you__recommended-list">
            {loadingRecommended ? (
              <div className="for-you__loading">Loading recommended books...</div>
            ) : recommendedError ? (
              <div className="for-you__error">{recommendedError}</div>
            ) : (
              recommendedBooks.slice(0, 5).map((book) => (
                <div key={book.id} className="book-card-vertical">
                  <img src={book.imageLink} alt={book.title} className="book-card-vertical__image" />
                  <div className="book-card-vertical__content">
                    <h3 className="book-card-vertical__title">{book.title}</h3>
                    <p className="book-card-vertical__author">By {book.author}</p>
                    <div className="book-card-vertical__rating">
                      <span className="book-card-vertical__average-rating">{book.averageRating}</span>
                      <span className="book-card-vertical__total-rating">({book.totalRating})</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForYou;
