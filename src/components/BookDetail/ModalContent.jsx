import React from "react";
import BookCover from "../BookCover";
import { BookDetailRightPanel } from "./BookDetailRightPanel";
import styles from "./ModalContent.module.css";

const ModalContent = ({ book }) => {
    if (!book) return <div>로딩 중...</div>;
    console.log(book)
    return (
        <div className={styles["modal-content"]}>
            <div className={styles["blur-background"]}></div>
            <div className={styles["content-wrapper"]}>
                <BookCover cover={book.cover} className={styles["book-cover"]} />
                <BookDetailRightPanel
                    summary={book.summary}
                    rating={book.rating}
                    review={book.review}
                    info={book.info}
                    writer={book.writer}
                    reading={book.reading}
                    reviewDetail={book.reviewDetail}
                />
            </div>
        </div>
    );
};

export default ModalContent;
