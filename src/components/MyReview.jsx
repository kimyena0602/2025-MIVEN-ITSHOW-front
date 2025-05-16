import React from 'react';

const MyReview = ({ myReview }) => {
  return (
    <div className="my-review">
      <h4>내가 쓴 리뷰</h4>
      <blockquote>"{myReview.phrase}"</blockquote>
      <p>한 줄 소감: {myReview.comment}</p>
      <p>작성자: {myReview.author}</p>
    </div>
  );
};

export default MyReview;