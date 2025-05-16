import React from 'react';

const UserReviewInfo = ({ bookId }) => {
  // 예시 props (실제 구현에선 API로 받아오기)
  const exampleData = {
    likes: 120,
    reviewCount: 35,
    reviewers: [
      { id: 'user123', comment: '정말 감동적인 책이에요.' },
      { id: 'reader99', comment: '삶의 전환점이 되었어요.' },
    ],
  };

  const randomReviewer = exampleData.reviewers[Math.floor(Math.random() * exampleData.reviewers.length)];

  return (
    <div className="user-review-info">
      <p>❤️ 좋아요 수: {exampleData.likes}</p>
      <p>📝 리뷰 수: {exampleData.reviewCount}</p>
      <p>👤 {randomReviewer.id}: "{randomReviewer.comment}"</p>
    </div>
  );
};

export default UserReviewInfo;