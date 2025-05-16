import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookInfo = ({ book }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/book/${book.id}/info`);
  };

  const randomPhrase = book.phrases[Math.floor(Math.random() * book.phrases.length)];

  return (
    <div className="book-info">
      <p><strong>📖 인상 깊은 구절:</strong> "{randomPhrase.text}"</p>
      <p>⭐ 평균 평점: {book.averageRating} / 5</p>
      <button onClick={handleDetailClick}>상세보기</button>
    </div>
  );
};

export default BookInfo;
