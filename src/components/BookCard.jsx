import React from 'react';
import React from "react";
import styles from "../styles/BookSearch.module.css";

const BookCard = ({ image, title, author }) => {
  return (
    <div className={styles.bookCard}>
      <img src={image} alt={title} className={styles.bookCardImage} />
      <h4 className={styles.bookTitle}>{title}</h4>
      <p className={styles.bookAuthor}>{author}</p>
    </div>
  );
};

export default BookCard;