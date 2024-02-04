import React, { useState } from "react";
import useFormField from "@/hooks/useFormField";
import { validatePassword } from "@/utils/validateForm";
import usersApiCall from "@/api/axios/usersApiCall";

const DeleteUser = () => {
  const password = useFormField("", validatePassword);
  const passwordCheck = useFormField("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const useUsersApiCall = usersApiCall();

  const passwordHandleChange = (event) => {
    password.onChange(event.target.value);
    validatePasswords(event.target.value, passwordCheck.value);
  };

  const passwordCheckHandleChange = (event) => {
    passwordCheck.onChange(event.target.value);
    validatePasswords(password.value, event.target.value);
  };

  const validatePasswords = (password, passwordCheck) => {
    if (passwordCheck === "") {
      return setPasswordsMatch(false);
    }
    setPasswordsMatch(password === passwordCheck);
  };

  return (
    <div className="w-1/2 mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">비밀번호:</label>
        <input
          type="password"
          value={password.value}
          onChange={passwordHandleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">비밀번호 확인:</label>
        <input
          type="password"
          value={passwordCheck.value}
          onChange={passwordCheckHandleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {!passwordsMatch && passwordCheck.value && (
        <div className="text-red-500">비밀번호가 일치하지 않습니다</div>
      )}
      <button
        onClick={() => useUsersApiCall.deleteUser(password.value)}
        disabled={!passwordsMatch || !passwordCheck.value}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        회원 탈퇴
      </button>
    </div>
  );
};

export default DeleteUser;
