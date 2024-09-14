const ProfileImage = ({ image }: { image: string }) => {
  return (
    <img
      src={
        image !== ""
          ? `http://localhost:3000/assets/profiles/${image}`
          : "default-profile.jpg"
      }
      alt="profile picture"
      className="h-8 w-8 rounded-full"
    />
  );
};

export default ProfileImage;
