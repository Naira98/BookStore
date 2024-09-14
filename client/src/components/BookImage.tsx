const BookImage = ({ image }: { image: string }) => {
  return (
    <img
      src={
        image !== ""
          ? `http://localhost:3000/assets/profiles/${image}`
          : "default-book2.jpg"
      }
      alt="profile picture"
      className="h-64 w-44"
    />
  );
};

export default BookImage;
