import React from 'react';

const ReadingInfo = ({ readingData }) => {
  return (
    <div className="reading-info">
      <p>독서 기간: {readingData.start} ~ {readingData.end}</p>
      <p>작성자: {readingData.writer}</p>
    </div>
  );
};

export default ReadingInfo;