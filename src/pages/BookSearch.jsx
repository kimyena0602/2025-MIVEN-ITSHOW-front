// src/pages/BookSearch.jsx - 디버깅 버전
import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import styles from "../styles/BookSearch.module.css";
import Nav from "../components/Nav";
import {DebounceInput} from 'react-debounce-input';

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const hasQuery = query.trim() !== "";

  // ISBN으로 표지 이미지 URL 만들기 함수
  const getCoverImage = (isbn) => {
    const imageUrl = isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg` : "/assets/images/no-image.png";
    console.log("생성된 이미지 URL:", imageUrl); // 디버깅
    return imageUrl;
  };

  useEffect(() => {
    console.log(query)
    const fetchBooks = async () => {
      if (!hasQuery) return;

      try {
        console.log("API 호출 중:", query); // 디버깅
        const response = await axios.get("/naver-api/v1/search/book.json", {
          params: { query },
          headers: {
            'X-Naver-Client-Id': '4gzXh5h99U1wXPgELMhm',
            'X-Naver-Client-Secret': 'eu8bsRmFqh'
          }
        });

        console.log("API 응답:", response.data); // 디버깅
        // const items = response.data.docs || [];
        // console.log("검색 결과 아이템들:", items); // 디버깅
        // setSearchResults(items);
      } catch (error) {
        console.error("국립중앙도서관 책 검색 실패:", error);
      }
    };

    fetchBooks();
  }, [query, hasQuery]);

  return (
    <div>
      <div className="NavWrapper">
        <Nav showBackGradient={false} />
      </div>

      <div className={styles.booksearchContainer}>
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

        <div className={styles.booksearchInputContainer}>
          <div className={styles.searchInputWrapper}>
            <img
              src="/assets/images/search-icon.png"
              alt="Search Icon"
              className={styles.searchIcon}
            />
            <DebounceInput
              type="text"
              className={styles.booksearchInput}
              placeholder="책 제목을 입력해 주세요"
              debounceTimeout={3000}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {hasQuery ? (
          <div className={styles.resultsGrid}>
            {/* {searchResults.length > 0 ? (
              searchResults.map((book, idx) => {
                console.log("개별 책 데이터:", book); // 디버깅
                
                // 서버에서 제공하는 이미지 URL 우선 사용
                const coverImage = book.COVER_IMAGE || getCoverImage(book.ISBN || book.ISBN13);
                console.log("최종 이미지 URL:", coverImage); // 디버깅

                return (
                  <BookCard
                    key={idx}
                    id={idx}
                    image={coverImage}
                    title={book.TITLE || "제목 없음"}
                    author={book.AUTHOR || "저자 정보 없음"}
                  />
                );
              })
            ) : (
              <div className={styles.noResultsText}>
                <p>검색 결과가 없습니다.</p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    color: "#999",
                  }}
                >
                  다른 키워드로 검색해보세요.
                </p>
              </div>
            )} */}
          </div>
        ) : (
          <div className={styles.overlayCtn}>
            <div className={styles.dimOverlay}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;