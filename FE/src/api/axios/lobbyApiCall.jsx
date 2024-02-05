import lobbyUrl from "@/api/url/lobbyUrl";
import userUrl from "@/api/url/usersUrl";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import useAxiosConfig from "@/hooks/useAxiosConfig";

const lobbyApiCall = () => {
  const accessToken = useAccessTokenState();
  const privateAxios = useAxiosConfig().privateAxios;

  const getFriendsList = async (pageNum) => {
    const getFriendsUrl = `${userUrl.getFriendsList()}/${pageNum}`;
    try {
      const response = await privateAxios.get(getFriendsUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getRankingList = async (type, pageNum) => {
    const getRankUrl = `${lobbyUrl.getRankingList()}/${type}/${pageNum}`;
    try {
      const response = await privateAxios.get(getRankUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { getFriendsList, getRankingList };
};

export default lobbyApiCall;
