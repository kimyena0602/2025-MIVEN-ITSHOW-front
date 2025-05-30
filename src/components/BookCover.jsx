import React from "react";
import styles from "../styles/BookDetailPage.module.css";

const BookCover = ({ cover, className }) => {
    return (
        <div>
            <img src={cover} alt="book cover" className={className} />
        </div>
    );
};

export default BookCover;