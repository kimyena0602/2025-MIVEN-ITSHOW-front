import React from 'react';

const BasicBookInfo = ({ book }) => {
  return (
    <div className="basic-book-info">
      <h2>{book.title}</h2>
      <p>저자: {book.author}</p>
      <p>카테고리: {book.category}</p>
      <p>출판사: {book.publisher}</p>
    </div>
  );
};

export default BasicBookInfo;