import usersUrl from "@/api/url/usersUrl";
import { axios } from "axios";

const lobbyApiCall = () => {
  const getFriendsList = async () => {
    const url = usersUrl.getFriendsList();

    try {
      const response = -(await axios.get(url));
      return response.data;
    } catch (e) {}
  };
};

export default lobbyApiCall;
