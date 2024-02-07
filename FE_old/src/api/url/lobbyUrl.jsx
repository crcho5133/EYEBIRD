import { baseUrl } from "@/api/url/baseUrl";

export default {
  getRankingList: () => `${baseUrl}/api/point/rank`,
  searchUsers: () => `${baseUrl}/api/user/search`,
};
