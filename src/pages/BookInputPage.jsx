import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import booksData from "../data/book.json";
import ModalContent from "../components/BookDetail/ModalContent";
import styles from "../styles/BookInputPage.module.css";
import BlurredBackground from "../components/BookDetail/BlurredBackground";

const BookInputPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const selectedBook = booksData.find((b) => b.id?.toString() === id);
        setBook(selectedBook || null);
    }, [id]);

    const handleChange = (e) => setInputText(e.target.value);

    const handleSave = () => {
        // 저장 로직 - 임시 alert
        alert(`"${book.title}"에 대한 입력 내용 저장:\n${inputText}`);
    };

    if (!book) return <div>책 정보를 불러오는 중입니다...</div>;

    return (
        <div className={styles.container}>
            <BlurredBackground />
            <ModalContent book={book}>
                <div className={styles.inputArea}>
                    <textarea
                        rows={10}
                        placeholder="책에 대한 감상, 리뷰, 메모를 입력하세요."
                        value={inputText}
                        onChange={handleChange}
                        className={styles.textarea}
                    />
                    <button onClick={handleSave} className={styles.saveBtn}>
                        저장하기
                    </button>
                </div>
            </ModalContent>
        </div>
    );
};

export default BookInputPage;