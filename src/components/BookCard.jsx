// src/components/BookCard.jsx
import React from 'react';

const BookCard = ({ image, title, author }) => {
  return (
    <div className="w-[120px] text-center">
      <img src={image} alt={title} className="w-full h-[170px] object-cover rounded" />
      <p className="mt-2 text-sm font-semibold">{title}</p>
      <p className="text-xs text-gray-500">{author}</p>
    </div>
  );
};

export default BookCard;
