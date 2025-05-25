import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import booksData from '../data/book.json';
import '../styles/BookSearch.css';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="booksearch-container">
      <img
        src="/assets/images/Book Search.png"
        alt="Book Search"
        className="booksearch-top-image"
      />

      <div className={`book-grid ${!hasSearched ? 'blurred' : ''}`}>
        {booksData.map((book, idx) => (
          <BookCard key={idx} image={book.image} title={book.title} author={book.author} />
        ))}
      </div>

      {!hasSearched && (
        <div className="booksearch-overlay">
          {!isFocused && <div className="dim-background"></div>}

          <div className="relative w-full h-full z-20">

            <div className="booksearch-input-wrapper">
              <div className="relative w-96">
                <input
                  type="text"
                  className="booksearch-input"
                  placeholder="책 제목을 입력해 주세요"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setHasSearched(true);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <span className="input-icon">🔍</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="search-results">
          {/* <h1 className="results-title">Book Search</h1> */}
          <div className="search-input-container">
            <div className="search-input-wrapper">
              <img
                src="/assets/images/search-icon.png"
                alt="Search Icon"
                className="search-icon"
              />
              <input
                type="text"
                className="search-input"
                placeholder="책 제목을 입력해 주세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="results-grid">
            {filteredBooks.map((book, idx) => (
              <BookCard key={idx} image={book.image} title={book.title} author={book.author} />
            ))}
            {filteredBooks.length === 0 && (
              <p className="no-results-text">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
