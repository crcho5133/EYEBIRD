import profileImage1 from "/src/assets/img/profile/1.jpg";
import profileImage2 from "/src/assets/img/profile/2.jpg";
import profileImage3 from "/src/assets/img/profile/3.jpg";
import profileImage4 from "/src/assets/img/profile/4.jpg";

const changeProfileImage = () => {
  const profileImages = {
    1: profileImage1,
    2: profileImage2,
    3: profileImage3,
    4: profileImage4,
  };

  const profileImagePath = (index) => {
    return profileImages[index];
  };

  return {
    profileImagePath,
  };
};

export default changeProfileImage;
