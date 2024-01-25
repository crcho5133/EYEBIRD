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

  return { signup };
};

export default usersApiCall;
