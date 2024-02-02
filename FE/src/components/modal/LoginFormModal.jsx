import usersApiCall from "@/api/axios/usersApiCall";
import Rodal from "rodal";
import useFormField from "@/hooks/useFormField";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import { useWebSocket } from "../../context/WebSocketContext";
import "rodal/lib/rodal.css";

const LoginFormModal = ({ visible, onClose }) => {
  const email = useFormField("");
  const password = useFormField("");
  const accessToken = useAccessTokenState();
  const useUsersApiCall = usersApiCall();
  const client = useWebSocket();

  const login = async (event) => {
    event.preventDefault();
    await useUsersApiCall.login(email.value, password.value, accessToken);
    client.onConnect();
  };

  const clearAllInput = () => {
    email.clear();
    password.clear();
  };

  return (
    <>
      <Rodal
        visible={visible}
        onClose={() => {
          clearAllInput();
          onClose();
        }}
        customStyles={{ width: "80%", height: "25%" }}
      >
        <h2 className="text-lg font-bold text-gray-700">로그인</h2>
        <form className="space-y-4" onSubmit={login}>
          <input
            type="text"
            placeholder="아이디"
            value={email.value}
            onChange={(e) => email.onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password.value}
            onChange={(e) => password.onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
          >
            로그인
          </button>
        </form>
      </Rodal>
    </>
  );
};

export default LoginFormModal;
