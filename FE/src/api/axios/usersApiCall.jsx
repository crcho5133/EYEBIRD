import axios from "axios";
import usersUrl from "@/api/url/usersUrl";

const usersApiCall = () => {
  const signup = async (email, password, nickname) => {
    const url = usersUrl.signUp();
    const body = { email, password, nickname };

    try {
      console.log("회원가입 성공");
      await toast.promise(axios.post(url, body), {
        pending: "회원가입 중입니다.",
        success: "회원가입 되었습니다.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { signup };
};

export default usersApiCall;
