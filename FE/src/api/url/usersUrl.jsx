import { baseUrl } from "./baseUrl";

export default {
  signUp: () => `${baseUrl}/users/join`,
  login: () => `${baseUrl}/users/login`,
  logout: () => `${baseUrl}/users/logout`,
};