import axios from "axios";
import usersUrl from "@/api/url/usersUrl";
import { useNavigate } from "react-router-dom";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import { useWebSocket } from "@/context/WebSocketContext";

const usersApiCall = () => {
  const navigate = useNavigate();
  const accessToken = useAccessTokenState();
  const webSocket = useWebSocket();

  const signup = async (profileImage, email, password, nickname) => {
    const body = { profileImage, email, password, nickname };
    try {
      const response = await axios.post(usersUrl.signUp(), body);
      await login(email, password, accessToken.accessToken);
    } catch (error) {
      console.log(error);
      alert(error.response.data.errorMessage);
    }
  };

  const checkEmailDuplicate = async (email, setIsEmailValid) => {
    const url = usersUrl.checkEmailDuplicate() + "?email=" + email;
    try {
      const response = await axios.get(url);
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
      if (response.data.check === false) {
        setIsNicknameValid(true);
      } else if (response.data.check === true) {
        setIsNicknameValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
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

  const logout = async () => {
    const url = usersUrl.logout();
    const body = {
      grantType: "Bearer",
      accessToken: accessToken.accessToken,
      refreshToken: accessToken.refreshToken,
    };

    try {
      await axios.post(url, body);
      webSocket.client.deactivate();
      alert("로그아웃 되었습니다.");
      accessToken.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.errorMessage);
    }
  };

  const changeProfileImage = async (profileImage) => {
    const url = usersUrl.changeProfileImage();
    try {
      const response = await axios.patch(
        url,
        {
          profileImage,
        },
        {
          headers: { Authorization: `Bearer ${accessToken.accessToken}` },
        }
      );
    } catch (error) {
      console.log(error);
      alert(error.response.data.errorMessage);
    }
  };

  const changeNickname = async (nickname) => {
    const url = usersUrl.changeNickname();
    try {
      const response = await axios.patch(
        url,
        {
          nickname,
        },
        {
          headers: { Authorization: `Bearer ${accessToken.accessToken}` },
        }
      );
    } catch (error) {
      alert(error.response.data.errorMessage);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    const url = usersUrl.changePassword();

    try {
      const response = await axios.patch(
        url,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${accessToken.accessToken}` },
        }
      );
      alert("비밀번호가 수정 되었습니다");
      logout();
    } catch (error) {
      alert(error.response.data.errorMessage);
    }
  };

  const deleteUser = async (password) => {
    const url = usersUrl.deleteUser();
    try {
      const response = await axios.patch(
        url,
        { password },
        {
          headers: { Authorization: `Bearer ${accessToken.accessToken}` },
        }
      );
      alert("회원이 탈퇴 되었습니다.");
      accessToken.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.errorMessage);
    }
  };

  return {
    signup,
    checkEmailDuplicate,
    checkNicknameDuplicate,
    login,
    logout,
    changeProfileImage,
    changeNickname,
    changePassword,
    deleteUser,
  };
};

export default usersApiCall;
