
import React, { useState, useEffect } from "react";
import styles from "../styles/selectbook.module.css";
import Nav from "../components/Nav";

import img1 from "../assets/images/newpage.png";
import img2 from "../assets/images/selectbook1.png";
import img3 from "../assets/images/selectbook2.png";
import img4 from "../assets/images/selectbook3.png";
import img5 from "../assets/images/selectbook4.png";
import img6 from "../assets/images/selectbook5.png";
import img7 from "../assets/images/selectbook6.png";

const SelectBook = () => {
  const [centerIndex, setCenterIndex] = useState(0);

  const books = [
    { id: 1, title: "Book 1", image: img1 }, // new page
    { id: 2, title: "Book 2", image: img2 },
    { id: 3, title: "Book 3", image: img3 },
    { id: 4, title: "Book 4", image: img4 },
    { id: 5, title: "Book 5", image: img5 },
    { id: 6, title: "Book 6", image: img6 },
    { id: 7, title: "Book 7", image: img7 },
  ];

  const isNewPageCenter = books[centerIndex].title === "Book 1";

  // 무한 순환
  const getOffset = (index: number) => {
    let offset = index - centerIndex;
    const half = Math.floor(books.length / 2);
    if (offset > half) offset -= books.length;
    if (offset < -half) offset += books.length;
    return offset;
  };

  // 키보드 및 휠 이벤트
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCenterIndex((prev) => (prev - 1 + books.length) % books.length);
      } else if (e.key === "ArrowRight") {
        setCenterIndex((prev) => (prev + 1) % books.length);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setCenterIndex((prev) => (prev + 1) % books.length);
      } else if (e.deltaY < 0) {
        setCenterIndex((prev) => (prev - 1 + books.length) % books.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [books.length]);

  return (
    <div className={styles.pageContainer}>
      <Nav />
      <div className={styles.bookContainer}>
        {books.map((book, index) => {
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);

          let baseX = 320;
          if (absOffset === 1) baseX += 35;
          if (absOffset === 2 || absOffset === 3) baseX -= 2;
          if (absOffset === 3 || absOffset === 4) baseX -= 25;

          const scaleMap = [1.2, 0.9, 0.75, 0.6];
          const yMap = [-15, 80, 160, 230];

          const scale = scaleMap[absOffset] || 0;
          let translateY = yMap[absOffset] || 120;
          if (absOffset === 2 || absOffset === 3) translateY -= 2;

          const zIndex = 10 - absOffset;
          const opacity = absOffset > 3 ? 0 : 1;

          return (
            <div
              key={book.id}
              className={styles.book}
              style={{
                transform: `translateX(${offset * baseX}px) translateY(${translateY}px) scale(${scale})`,
                zIndex,
                opacity,
                transition: "transform 0.5s ease, opacity 0.5s ease",
              }}
            >
              <img src={book.image} alt={book.title} />
            </div>
          );
        })}

        <div className={styles.iconContainer}>
  {isNewPageCenter ? (
    <div className={styles.plusIconCenter}>＋</div>
  ) : (
    <>
      <div className={styles.editIconCenter}>✎</div>
      <div className={styles.plusIconBottomRight}>＋</div>
    </>
  )}
</div>

      </div>
    </div>
  );
};

export default SelectBook;
