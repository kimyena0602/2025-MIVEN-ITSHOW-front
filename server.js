// server.js - 확실한 이미지 제공 버전
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/search", async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "제목을 입력해주세요" });
  }

  try {
    console.log("검색 요청:", title); // 서버 로그

    // OpenLibrary API 호출
    const response = await axios.get("https://openlibrary.org/search.json", {
      params: { 
        title: title,
        limit: 20
      }
    });

    console.log("OpenLibrary 응답:", response.data.numFound, "개 결과"); // 서버 로그

    // 더 확실한 이미지 URL 생성
    const books = response.data.docs.map((book, index) => {
      // 여러 방법으로 이미지 URL 시도
      let imageUrl = null;
      
      // 1. OpenLibrary 커버 이미지 (키 기반)
      if (book.cover_i) {
        imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      }
      // 2. ISBN 기반 이미지
      else if (book.isbn && book.isbn[0]) {
        imageUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
      }
      // 3. 랜덤 플레이스홀더 이미지 (테스트용)
      else {
        imageUrl = `https://picsum.photos/200/300?random=${index + Math.random()}`;
      }

      return {
        TITLE: book.title || "제목 없음",
        AUTHOR: book.author_name ? book.author_name.join(", ") : "저자 정보 없음",
        ISBN: book.isbn ? book.isbn[0] : null,
        ISBN13: book.isbn ? book.isbn.find(isbn => isbn.length === 13) : null,
        COVER_IMAGE: imageUrl, // 직접 이미지 URL 제공
        cover_i: book.cover_i // OpenLibrary 커버 ID
      };
    });

    console.log("변환된 책 데이터 샘플:", books[0]); // 서버 로그

    res.json({ docs: books });
  } catch (err) {
    console.error("도서 검색 API 에러:", err.message);
    
    // 에러시 더미 데이터라도 제공
    const dummyBooks = [
      {
        TITLE: `${title} 관련 도서 1`,
        AUTHOR: "테스트 저자 1",
        ISBN: "9781234567890",
        COVER_IMAGE: "https://picsum.photos/200/300?random=1"
      },
      {
        TITLE: `${title} 관련 도서 2`, 
        AUTHOR: "테스트 저자 2",
        ISBN: "9781234567891",
        COVER_IMAGE: "https://picsum.photos/200/300?random=2"
      }
    ];
    
    res.json({ docs: dummyBooks });
  }
});

app.listen(5000, () => {
  console.log("📚 이미지 제공 서버 실행 중! http://localhost:5000");
});