import React, { useState } from 'react';
import BookCard from '../components/BookCard';

const booksData = [
  { title: '밤의 여행자들', author: '이사카 고타로', image: '../assets/images/Book_img.png' },
  { title: '이어달리기', author: '', image: '/assets/images/Book_img2.png' },
  { title: '그대는 나의 여름이 되세요', author: '헤르만 헤세', image: '/assets/images/Book_img3.png' },
  { title: '몽상과 착란', author: '조지 오웰', image: '/assets/images/Book_img4.png' },
  { title: '분열된 자기', author: '한강', image: '/assets/images/Book_img5.png' },
  { title: '여름비', author: '한강', image: '/assets/images/Book_img6.png' },
  { title: '우리가 함께 달릴 때', author: '한강', image: '/assets/images/Book_img7.png' },
  { title: '우리는 이 별을 떠나기로 했어', author: '한강', image: '/assets/images/Book_img8.png' },
  { title: '채식주의자', author: '한강', image: '/assets/images/Book_img9.png' },
  { title: '정체', author: '한강', image: '/assets/images/Book_img10.png' },
];

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white relative">
      {!hasSearched && (
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10 flex flex-col items-center justify-center">
          <h1 className="text-white text-6xl font-bold mb-10">Book Search</h1>
          <div className="relative w-80">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-full text-center"
              placeholder="책 제목을 입력해 주세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setHasSearched(true);
              }}
            />
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="px-6 py-10">
          <h1 className="text-blue-800 text-5xl font-extrabold text-center mb-10">Book Search</h1>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              className="w-80 px-4 py-2 border rounded-full shadow-sm"
              placeholder="책 제목을 입력해 주세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-5 gap-6 justify-items-center">
            {filteredBooks.map((book, idx) => (
              <BookCard
                key={idx}
                image={book.image}
                title={book.title}
                author={book.author}
              />
            ))}
            {filteredBooks.length === 0 && (
              <p className="col-span-5 text-gray-500 text-center">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
// SelectBook => new page => BookSearch ( 책 검색하기 ) => BookWrite