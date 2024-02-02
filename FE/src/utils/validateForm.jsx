export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateNickname = (nickname) => {
  const re = /^[a-zA-Z0-9가-힣]{1,8}$/;
  return re.test(nickname);
};

export const validatePassword = (password) => {
  const re = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return re.test(password);
};
