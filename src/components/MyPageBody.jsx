import React, { useEffect, useState } from "react";
import styles from "../styles/MyPageBody.module.css";
import "../global.css";

export default function MyPageBody() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiBaseUrl = "http://3.38.185.232:8080";

    fetch(`${apiBaseUrl}/api/gallery/mylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nbWkxQG5hdmVyLmNvbSIsImlhdCI6MTc0OTY5MTIyNSwiZXhwIjoxNzQ5NzA5MjI1fQ.i4iT75y0ZzYmIqSlAVTjG0m5Y5aIZ-o5B2r6u-kcmDg",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const books = json.data?.books || [];
        setData(books);
      })
      .catch((err) => {
        console.error("❌ 데이터 불러오기 실패:", err);
      });
  }, []);

  const emptyBook = () => {
    const elements = [];

    if (!data) return elements;

    const remainder = data.length % 4;
    const emptyCount = remainder === 0 ? 0 : 4 - remainder;

    for (let i = 0; i < emptyCount; i++) {
      elements.push(<div key={`empty-${i}`} className={styles.bookItem} />);
    }

    return elements;
  };

  return (
    <div>
      <div className={styles.allBookListCtn}>
        <div className={styles.grid}>
          {data.map((book, index) => (
            <div key={index} className={styles.bookItem}>
              <img
                className={styles.allBookCover}
                src={book.cover}
                alt={book.title}
              />
              <div className={styles.bookTitle}>{book.title}</div>
            </div>
          ))}
          {emptyBook()}
          <div className={styles.lastLine} />
        </div>
      </div>
      <div className={styles.emptyCtn}></div>
    </div>
  );
}
