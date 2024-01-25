import { baseUrl } from "@/api/url/baseUrl";

export default {
  signUp: () => `${baseUrl}/api/user/signup`,
  checkDuplicate: () => `${baseUrl}/api/user/check`,
};
