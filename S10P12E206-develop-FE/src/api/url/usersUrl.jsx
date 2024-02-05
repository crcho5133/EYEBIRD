import { baseUrl } from "@/api/url/baseUrl";

export default {
  signUp: () => `${baseUrl}/api/user/signup`,
  login: () => `${baseUrl}/api/auth/login`,
  logout: () => `${baseUrl}/api/auth/logout`,
  checkEmailDuplicate: () => `${baseUrl}/api/user/check/email`,
  checkNicknameDuplicate: () => `${baseUrl}/api/user/check/nickname`,
  changeProfileImage: () => `${baseUrl}/api/user/profile-image`,
  changeNickname: () => `${baseUrl}/api/user/nickname`,
  changePassword: () => `${baseUrl}/api/user/password`,
  deleteUser: () => `${baseUrl}/api/user`,
  getFriendsList: () => `${baseUrl}/api/friend`,
};
