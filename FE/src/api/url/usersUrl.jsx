import { baseUrl } from "@/api/url/baseUrl";

export default {
  signUp: () => `${baseUrl}/api/user/signup`,
  login: () => `${baseUrl}/api/auth/login`,
  logout: () => `${baseUrl}/api/auth/logout`,
  checkEmailDuplicate: () => `${baseUrl}/api/user/check/email`,
  checkNicknameDuplicate: () => `${baseUrl}/api/user/check/nickname`,
  changeProfileImage: () => `${baseUrl}/api/user/change/profileImage`,
  changeNickname: () => `${baseUrl}/api/user/change/nickname`,
  changePassword: () => `${baseUrl}/api/user/change/password`,
  deleteUser: () => `${baseUrl}/api/user`,
  getFriendsList: () => `${baseUrl}/api/friend`,
};
