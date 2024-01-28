import usersApiCall from "@/api/axios/usersApiCall";
import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

const LoginFormModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    usersApiCall().login(email, password);
  };

  const passwordHandleChange = (e) => {
    setPassword(e.target.value);
  };

  const emailHandleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Rodal visible={visible} onClose={onClose} customStyles={{ width: "80%", height: "25%" }}>
        <h2 className="text-lg font-bold text-gray-700">로그인</h2>
        <form className="space-y-4" onSubmit={login}>
          <input
            type="text"
            placeholder="아이디"
            value={email}
            onChange={emailHandleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={passwordHandleChange}
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
