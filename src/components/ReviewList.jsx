import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewList = ({ reviews }) => {
  const navigate = useNavigate();

  const handleClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="review-list">
      <h4>사용자 리뷰</h4>
      {reviews.map((review) => (
        <div key={review.id} onClick={() => handleClick(review.userId)} className="review-item">
          <p><strong>{review.userId}</strong>: "{review.comment}" ⭐{review.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;