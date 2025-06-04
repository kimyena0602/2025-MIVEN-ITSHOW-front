import React, { useState } from "react";
import BookCard from "../components/BookCard";
import booksData from "../data/book.json";
import styles from "../styles/BookSearch.module.css";
import Nav from "../components/Nav";


const BookSearch = () => {
  const [query, setQuery] = useState("");

  const hasQuery = query.trim() !== "";
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="NavWrapper">
        <Nav showBackGradient={false} />
      </div>
      <div className={styles.booksearchContainer}>
        {/* 상단 이미지: 항상 표시 */}
        <img
          src="/assets/images/Book Search.png"
          alt="Book Search"
          className={styles.booksearchTopImage}
        />

        <img
          src="/assets/images/Book Search2.png"
          alt="Book Search 2"
          className={styles.booksearchTopImage2}
        />

        {/* 검색창 - 항상 하나 */}
        <div className={styles.booksearchInputContainer}>
          <div className={styles.searchInputWrapper}>
            <img
              src="/assets/images/search-icon.png"
              alt="Search Icon"
              className={styles.searchIcon}
            />
            <input
              type="text"
              className={styles.booksearchInput}
              placeholder="책 제목을 입력해 주세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        { }
        {!hasQuery && (
          <>
            <div className={styles.bookGrid + " " + styles.blurred}>
              {booksData.map((book, idx) => (
                <BookCard
                  id={book.id}
                  key={idx}
                  image={book.image}
                  title={book.title}
                  author={book.author}
                />
              ))}
            </div>
            <div className={styles.overlayCtn}>
              <div className={styles.dimOverlay}></div>
            </div>
          </>
        )}

        {/* 검색어 있을 때 결과 출력 */}
        {hasQuery && (
          <div className={styles.resultsGrid}>
            {filteredBooks.map((book, idx) => (
              <BookCard
                id={book.id}
                key={idx}
                image={book.image}
                title={book.title}
                author={book.author}
              />

            ))}
            {filteredBooks.length === 0 && (
              <p className={styles.noResultsText}>검색 결과가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
