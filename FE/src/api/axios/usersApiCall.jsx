import axios from "axios";
import usersUrl from "@/api/url/usersUrl";

const usersApiCall = () => {
  const signup = async (profileImage, email, password, nickname, accessToken) => {
    const body = { profileImage, email, password, nickname };
    try {
      const response = await axios.post(usersUrl.signUp(), body);
      if (response.status != 201) {
        throw new Error("회원가입 실패: " + response.status);
      }
      await axios.post(usersUrl.login(), { email, password, accessToken });
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailDuplicate = async (email, setIsEmailValid) => {
    const url = usersUrl.checkEmailDuplicate() + "?email=" + email;
    try {
      const response = await axios.get(url);
      console.log(response);
      if (response.data.check === false) {
        setIsEmailValid(false);
      } else if (response.data.check === true) {
        setIsEmailValid(true);
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
        setIsNicknameValid(false);
      } else if (response.data.check === true) {
        setIsNicknameValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password, accessToken, navigate) => {
    const url = usersUrl.login();
    const body = { email, password };
    try {
      const response = await axios.post(url, body);
      if (response.status != 200) {
        throw new Error("로그인 실패: " + response.status);
      }
      accessToken.setAccessToken(response.data.accessToken);
      accessToken.setRefreshToken(response.data.refreshToken);
      accessToken.setEmail(response.data.email);
      accessToken.setNickname(response.data.nickname);
      accessToken.setProfileImageIndex(response.data.profileImage);
      navigate("/lobby");
    } catch (error) {
      console.log(error);
      // if (axios.isAxiosError(error) && error.response) {
      //     const { status } = error.response;
      //     switch (status) {
      //         case ERROR_CODE_MAP.IN_VALID_PASSWORD:
      //             toast.error("비밀번호가 일치하지 않습니다.");
      //             break;
      //         case ERROR_CODE_MAP.DUPLICATED_LOGIN:
      //             toast.error("이미 로그인된 계정입니다.");
      //             break;
      //         case ERROR_CODE_MAP.NOT_FOUND:
      //             toast.error("가입되지 않은 이메일입니다.");
      //             break;
      //         case ERROR_CODE_MAP.SERVER_INSPECTING:
      //             toast.error("서버 점검중입니다.");
      //             break;
      //         default:
      //             toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
      //             break;
      //     }
      // } else {
      //     // 네트워크 에러 또는 기타 예상치 못한 에러
      //     toast.error("네트워크 에러 또는 기타 에러가 발생했습니다.");
      // }
      // throw error;
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
      console.log(response);
      // 로컬 스토리지에서 JWT 토큰을 가져옵니다.
      // const token = localStorage.getItem('jwtToken');

      // if (token) {
      //   await axios.post('http://localhost:8080/logout', {}, {
      //     headers: {
      //       'Authorization': `Bearer ${token}`
      //     }
      //   });

      //   // 로그아웃 요청이 성공하면, 로컬 스토리지에서 토큰을 삭제합니다.
      //   localStorage.removeItem('jwtToken');
      // }

      // 추가적인 로그아웃 후 처리 로직을 여기에 구현합니다.
    } catch (error) {
      // 에러 처리
      console.error("로그아웃에 실패 했습니다.", error);
    }
  };

  return { signup, checkEmailDuplicate, checkNicknameDuplicate, login, logout };
};

export default usersApiCall;
