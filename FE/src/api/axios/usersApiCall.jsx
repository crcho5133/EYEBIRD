import axios from "axios";
import usersUrl from "@/api/url/usersUrl";
import { useNavigate } from "react-router-dom";

const usersApiCall = () => {
  const navigate = useNavigate();
  const signup = async (profileImage, email, password, nickname, accessToken) => {
    const body = { profileImage, email, password, nickname };
    try {
      const response = await axios.post(usersUrl.signUp(), body);
      await login(email, password, accessToken);
    } catch (error) {
      console.log(error);
      alert(error.response.data.errorMessage);
    }
  };

  const checkEmailDuplicate = async (email, setIsEmailValid) => {
    const url = usersUrl.checkEmailDuplicate() + "?email=" + email;
    try {
      const response = await axios.get(url);
      console.log(response);
      if (response.data.check === false) {
        setIsEmailValid(true);
      } else if (response.data.check === true) {
        setIsEmailValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkNicknameDuplicate = async (nickname, setIsNicknameValid) => {
    const url = usersUrl.checkNicknameDuplicate() + "?nickname=" + nickname;
    try {
      const response = await axios.get(url);
      console.log(response);
      if (response.data.check === false) {
        setIsNicknameValid(true);
      } else if (response.data.check === true) {
        setIsNicknameValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password, accessToken) => {
    const url = usersUrl.login();
    const body = { email, password };
    try {
      const response = await axios.post(url, body);
      accessToken.setAccessToken(response.data.accessToken);
      accessToken.setRefreshToken(response.data.refreshToken);
      accessToken.setEmail(response.data.email);
      accessToken.setNickname(response.data.nickname);
      accessToken.setProfileImageIndex(response.data.profileImage);
      navigate("/lobby");
    } catch (error) {
      console.log(error);
      alert(error.response.data.errorMessage);
    }
  };

  const logout = async (accessToken) => {
    const url = usersUrl.logout();
    const body = {
      grantType: "Bearer",
      accessToken: accessToken.accessToken,
      refreshToken: accessToken.refreshToken,
    };

    try {
      const response = await axios.post(url, body);
      accessToken.accessToken = "";
      accessToken.refreshToken = "";
      navigate("/");
    } catch (error) {
      alert(error.response.data.errorMessage);
    }
  };

  return { signup, checkEmailDuplicate, checkNicknameDuplicate, login, logout };
};

export default usersApiCall;
