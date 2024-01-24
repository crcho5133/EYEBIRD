import { baseUrl } from "./baseUrl";

export default {
  login: () => `${baseUrl}/api/auth/login`,
  logout: () => `${baseUrl}/api/auth/logout`,
};