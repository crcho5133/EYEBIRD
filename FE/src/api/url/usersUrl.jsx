import { baseUrl } from "@/api/url/baseUrl";

export default {
  signUp: () => `${baseUrl}/api/user/signup`,
  login: () => `${baseUrl}/api/auth/login`,
  logout: () => `${baseUrl}/api/auth/logout`,
  checkDuplicate: () => `${baseUrl}/api/user/check`,
};
