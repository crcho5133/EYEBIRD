import axios from "axios";
import usersUrl from "@/api/url/usersUrl";

const usersApiCall = () => {
  const signup = async (profileImageIndex, email, password, nickname) => {
    const url = usersUrl.signUp();
    const body = { profileImageIndex, email, password, nickname };

    try {
      await axios.post(url, body);
      console.log("성공");
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailDuplicate = () => {
    setIsEmailValid(true);
    setEmailValidationMessage("사용 가능한 이메일입니다."); 
  };

  const checkNicknameDuplicate = () => {
    setIsNicknameValid(true);
    setNicknameValidationMessage("사용 가능한 닉네임입니다.");
  };

  
  return { signup };
};

export default usersApiCall;
