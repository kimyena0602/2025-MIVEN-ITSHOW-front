import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/BookCard.module.css";

const BookCard = ({ id, image, title, author }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${id}`);  // 책 상세 페이지로 이동
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={image || "/assets/images/no-image.png"}
        alt={title}
        className={styles.bookImage}
      />
      <div className={styles.bookInfo}>
        <h3 className={styles.bookTitle}>{title}</h3>
        <p className={styles.bookAuthor}>{author}</p>
      </div>
    </div>
  );
};

export default BookCard;
