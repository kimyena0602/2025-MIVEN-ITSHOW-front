import React, { useState, useEffect } from "react";
import styles from "../styles/selectbook.module.css";
import Nav from "../components/Nav";

// import img1 from "assets/images/newpage.png";
// import img2 from "/assets/images/selectbook1.png";
// import img3 from "/assets/images/selectbook2.png";
// import img4 from "/assets/images/selectbook3.png";
// import img5 from "/assets/images/selectbook4.png";
// import img6 from "/assets/images/selectbook5.png";
// import img7 from "/assets/images/selectbook6.png";

const SelectBook = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true); // ⬅️ 스크롤/키 입력 딜레이

  const books = [
    { id: 1, title: "Book 1", image: "assets/images/newpage.png" },
    { id: 2, title: "Book 2", image: "assets/images/selectbook1.png" },
    { id: 3, title: "Book 3", image: "assets/images/selectbook2.png" },
    { id: 4, title: "Book 4", image: "assets/images/selectbook3.png" },
    { id: 5, title: "Book 5", image: "assets/images/selectbook4.png" },
    { id: 6, title: "Book 6", image: "assets/images/selectbook5.png" },
    { id: 7, title: "Book 7", image: "assets/images/selectbook6.png" },
  ];

  const isNewPageCenter = books[centerIndex].title === "Book 1";

  const getOffset = (index) => {
    let offset = index - centerIndex;
    const half = Math.floor(books.length / 2);
    if (offset > half) offset -= books.length;
    if (offset < -half) offset += books.length;
    return offset;
  };

  useEffect(() => {
    const scrollDelay = 300; // 밀리초 (0.3초) 딜레이

    const handleMove = (direction) => {
      if (!canScroll) return;
      setCanScroll(false);
      setCenterIndex((prev) =>
        direction === "left"
          ? (prev - 1 + books.length) % books.length
          : (prev + 1) % books.length
      );
      setTimeout(() => setCanScroll(true), scrollDelay);
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handleMove("left");
      else if (e.key === "ArrowRight") handleMove("right");
    };

    const handleWheel = (e) => {
      if (e.deltaY > 0) handleMove("right");
      else if (e.deltaY < 0) handleMove("left");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [canScroll, books.length]);

  return (
    <div className={styles.pageContainer}>
      <Nav />
      <div className={styles.bookContainer}>
        {books.map((book, index) => {
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);

          let baseX = 230;
          if (absOffset === 1) baseX += 25;
          if (absOffset === 2 || absOffset === 3) baseX -= 1;
          if (absOffset === 3 || absOffset === 4) baseX -= 16;

          const scaleMap = [1.2, 0.9, 0.75, 0.6];
          const yMap = [-140, -60, 1, 70];

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
