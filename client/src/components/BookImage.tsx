const BookImage = ({ image }: { image: string }) => {
  return (
    <img
      src={
        image
          ? `http://localhost:3000/assets/profiles/${image}`
          : "/default-book.jpg"
      }
      alt="Book Poster"
      className="object-contain"
    />
  );
};

export default BookImage;
