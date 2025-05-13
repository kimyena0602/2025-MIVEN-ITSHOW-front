import React, { useState } from "react";
import Nav from "../components/Nav";
import styles from "../styles/selectbook.module.css";

import book1 from "../assets/images/selectbook1.png";
import book2 from "../assets/images/selectbook2.png";
import book3 from "../assets/images/selectbook3.png";
import book7 from "../assets/images/newpage.png";
import book4 from "../assets/images/selectbook4.png";
import book5 from "../assets/images/selectbook5.png";
import book6 from "../assets/images/selectbook6.png";


const books = [
  { id: 1, title: "Book 1", img: book1 },
  { id: 2, title: "Book 2", img: book2 },
  { id: 3, title: "Book 3", img: book3 },
  { id: 7, title: "Book 7", img: book7 },
  { id: 4, title: "Book 4", img: book4 },
  { id: 5, title: "Book 5", img: book5 },
  { id: 6, title: "Book 6", img: book6 },
];

export default function SelectBook() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rotateLeft = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const rotateRight = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const getBookIndex = (i) => (i + currentIndex) % books.length;

  return (
    <div className={styles.pageContainer}>
      <Nav />

      <div
        className={styles.carouselContainer}
        onWheel={(e) => {
          if (e.deltaY > 0) rotateLeft();
          else rotateRight();
        }}
      >
        <div className={styles.carousel}>
          {books.map((_, i) => {
            const index = getBookIndex(i);
            const distance = Math.abs(i - 3); // 가운데 기준 인덱스
            const scale = 1 - distance * 0.1;
            const translateY = distance * 20;
            const zIndex = 100 - distance;
            const leftOffset = i * 130;

            return (
              <div
                key={books[index].id}
                className={styles.book}
                style={{
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  zIndex,
                  left: `${leftOffset}px`,
                }}
              >
               <img
                  src={books[index].img}
                  alt={books[index].title}
                  className={styles[`bookImg${books[index].id}`]} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
