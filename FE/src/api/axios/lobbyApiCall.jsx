import lobbyUrl from "@/api/url/lobbyUrl";
import UserUrl from "@/api/url/usersUrl";
import { useAccessTokenState } from "@/context/AccessTokenContext";
import useAxiosConfig from "@/hooks/useAxiosConfig";

const lobbyApiCall = () => {
  const accessToken = useAccessTokenState();
  const privateAxios = useAxiosConfig().privateAxios;
  const getFriendsList = () => {
    const url = UserUrl.getFriendsList();
    try {
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getRankingList = async (type) => {
    const getRankUrl = lobbyUrl.getRankingList() + "/" + type;
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
