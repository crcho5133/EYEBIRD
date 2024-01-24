import axios from 'axios';
import usersUrl from "../url/usersUrl";

const usersApiCall = () =>{

    const login = async (email, password) => {
        const url = usersUrl.login();
        const body = { email, password };
    
        try {
            // const res = await axios.post(url, body);
            // toast.success("로그인 되었습니다.");
            console.log("로그인 성공")
            // const { accessToken, userSeq, nickname } = res.data;
            // return { accessToken, userSeq, nickname };
    
        } catch (error) {
            console.log(error)
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

    return { login };
}

export default usersApiCall;
