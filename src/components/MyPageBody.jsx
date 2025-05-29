import React, { useEffect, useState } from "react";
import styles from "../styles/MyPageBody.module.css";
import "../global.css";

export default function MyPageBody() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState(null);

  useEffect(() => {
    fetch("/data/selectmypagebookData.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setTitle(json[0]?.title);
        setCover(json[0]?.cover);
      })
      .catch((err) => console.log("데이터 불러오기 실패", err));
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
          {data?.map((book, index) => (
            <div key={index} className={styles.bookItem}>
              <img
                className={styles.allBookCover}
                src={book.cover}
                alt={book.title}
              />
              <div className={styles.bookTitle}>{book.title}</div>
            </div>
          ))}
          {data && emptyBook()}
          <div className={styles.lastLine} />
        </div>
      </div>
      <div className={styles.emptyCtn}></div>
    </div>
  );
}
