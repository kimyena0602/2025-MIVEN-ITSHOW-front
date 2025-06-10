import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import styles from "../styles/BookSearch.module.css";
import Nav from "../components/Nav";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const hasQuery = query.trim() !== "";
  
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  );
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [defaultBooks, setDefaultBooks] = useState([]);
  
  const hasQuery = query.trim() !== "";

  // API 키 - 실제 사용시에는 환경변수로 관리하세요
  const API_KEY = "https://www.nl.go.kr/NL/search/openApi/search.do";

  // 기본 도서 목록 로드 (인기 도서 등)
  useEffect(() => {
    fetchDefaultBooks();
  }, []);

  const fetchDefaultBooks = async () => {
    try {
      setLoading(true);
      // 인기 도서나 추천 도서를 가져오는 API 호출
      const response = await fetch(
        `https://www.data4library.kr/api/hotTrend?authKey=${API_KEY}&searchDt=2024-01&format=json`
      );
      
      if (!response.ok) {
        throw new Error("API 호출 실패");
      }
      
      const data = await response.json();
      
      if (data.response && data.response.results) {
        const bookList = data.response.results.map((item, index) => ({
          id: index + 1,
          title: item.bookname || "제목 없음",
          author: item.authors || "저자 미상",
          image: "/assets/images/default-book.png", // 기본 이미지
          isbn: item.isbn13 || "",
        }));
        setDefaultBooks(bookList);
      }
    } catch (err) {
      console.error("기본 도서 로드 실패:", err);
      // 에러 시 더미 데이터 사용
      setDefaultBooks([
        {
          id: 1,
          title: "삶의 의미를 찾아서",
          author: "빅터 프랭클",
          image: "/assets/images/default-book.png",
          isbn: "9788934972464"
        },
        {
          id: 2,
          title: "사피엔스",
          author: "유발 하라리",
          image: "/assets/images/default-book.png",
          isbn: "9788934972471"
        },
        // 더 많은 더미 데이터...
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 도서 검색 함수
  const searchBooks = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setBooks([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 국립중앙도서관 소장자료 검색 API
      const response = await fetch(
        `https://www.data4library.kr/api/srchBooks?authKey=${API_KEY}&title=${encodeURIComponent(searchQuery)}&pageNo=1&pageSize=20&format=json`
      );

      if (!response.ok) {
        throw new Error("검색 API 호출 실패");
      }

      const data = await response.json();

      if (data.response && data.response.docs) {
        const bookList = data.response.docs.map((book, index) => ({
          id: book.no || index + 1,
          title: book.bookname || "제목 없음",
          author: book.authors || "저자 미상",
          publisher: book.publisher || "",
          pubDate: book.publication_year || "",
          isbn: book.isbn13 || book.isbn || "",
          description: book.description || "",
          image: book.bookImageURL || "/assets/images/default-book.png",
        }));
        setBooks(bookList);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("검색 실패:", err);
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 변경 시 디바운싱 적용
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        searchBooks(query);
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // 표시할 책 목록 결정
  const displayBooks = hasQuery ? books : defaultBooks;

  return (
    <div>
      <div className="NavWrapper">
        <Nav showBackGradient={false} />
      </div>
      
      <div className={styles.booksearchContainer}>
        {/* 상단 이미지들 */}
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
        
        {/* 검색창 */}
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
              disabled={loading}
            />
          </div>
        </div>
       
        {/* 검색어가 없을 때: 모든 책 + 오버레이 */}
        {!hasQuery && (
          <>
            <div className={styles.bookGrid}>
              {booksData.map((book, idx) => (
        {/* 로딩 상태 */}
        {loading && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '400px', 
            fontSize: '1.1rem', 
            color: '#666' 
          }}>
            검색 중...
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '400px', 
            fontSize: '1.1rem', 
            color: '#e74c3c' 
          }}>
            {error}
          </div>
        )}
        
        {/* 검색어가 없을 때: 기본 책 목록 + 오버레이 */}
        {!hasQuery && !loading && (
          <>
            <div className={styles.bookGrid}>
              {defaultBooks.map((book, idx) => (
                <BookCard
                  id={book.id}
                  key={`default-${idx}`}
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
        
        {/* 검색어가 있을 때: 필터된 결과 */}
        {hasQuery && (
          <div className={styles.resultsGrid}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, idx) => (
                <BookCard
                  id={book.id}
                  key={idx}
        {/* 검색어가 있을 때: 검색 결과 */}
        {hasQuery && !loading && (
          <div className={styles.resultsGrid}>
            {books.length > 0 ? (
              books.map((book, idx) => (
                <BookCard
                  id={book.id}
                  key={`search-${book.isbn || idx}`}
                  image={book.image}
                  title={book.title}
                  author={book.author}
                />
              ))
            ) : (
              <div className={styles.noResultsText}>
                <p>검색 결과가 없습니다.</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#999' }}>
                  다른 키워드로 검색해보세요.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;