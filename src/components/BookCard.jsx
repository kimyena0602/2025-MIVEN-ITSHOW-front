const BookCard = ({ image, title, author }) => {
  return (
    <div className="w-full max-w-[200px]">
      <img src={image} alt={title} className="w-full h-auto rounded-lg shadow" />
      <h3 className="text-center mt-2 font-semibold">{title}</h3>
      <p className="text-center text-sm text-gray-500">{author}</p>
    </div>
  );
};

export default BookCard;