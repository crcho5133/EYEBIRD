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

  const checkEmailDuplicate = async (email, setIsEmailValid) => {
    const url = usersUrl.checkDuplicate() + "?email=" + email;

    try {
      // await axios.get(url);
      console.log("요청 성공");
      setIsEmailValid(true);
    } catch (error) {
      console.log(error);
    }
  };

  const checkNicknameDuplicate = (nickname, setIsNicknameValid) => {
    const url = usersUrl.checkDuplicate() + "?nickname=" + nickname;

    try {
      // await axios.get(url);
      console.log("요청 성공");
      setIsNicknameValid(true);
    } catch (error) {
      console.log(error);
    }
  };

  return { signup, checkEmailDuplicate, checkNicknameDuplicate };
};

export default usersApiCall;
