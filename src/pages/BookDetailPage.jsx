// App.jsx
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import ModalContent from "../components/BookDetail/ModalContent";
import BoldText from "../components/BoldText";
import styles from "../styles/BookDetailPage.module.css";
import BlurredBackground from "../components/BookDetail/BlurredBackground";
import { BookDetailRightPanel } from "../components/BookDetail/BookDetailRightPanel";

const BookDetailPage = () => {
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        fetch("/data/bookdetailmodal.json")
            .then(res => {
                if (!res.ok) throw new Error("네트워크 응답 오류");
                return res.json();
            })
            .then(data => setBookData(data))
            .catch(err => console.error("JSON fetch 실패:", err));
    }, []);

    if (!bookData) return <div>로딩 중...</div>;
    return (
        <div>
            <BlurredBackground cover={bookData.cover}>
                <BackButton />
                <section className={styles["book-detail"]}>
                    <BoldText title={bookData.title} className={styles["heading-primary"]} />
                    <ModalContent book={bookData} >
                        <BookDetailRightPanel
                            summary={bookData.summary}
                            rating={bookData.rating}
                            review={bookData.review}
                            info={bookData.info}
                            writer={bookData.writer}
                            reading={bookData.reading}
                            reviewDetail={bookData.reviewDetail}
                        />
                    </ModalContent>
                </section>
            </BlurredBackground>
            <section className={styles["book-detail-review"]}>
                <p>내용이 많아서 세로로 스크롤됩니다.</p>
                <div style={{ height: "1500px", backgroundColor: "#ddd" }}>스크롤 내용</div>
                {/* <BookDetailReview /> */}
            </section>
            {/* 아래는 스크롤 영역 등 추가 */}
        </div>
    );
};

export default BookDetailPage;
