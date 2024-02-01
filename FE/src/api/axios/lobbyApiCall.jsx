import usersUrl from "@/api/url/usersUrl";
// import { axios } from "axios";

const lobbyApiCall = () => {
  const getFriendsList = () => {
    // const url = usersUrl.getFriendsList();
    try {
      // const response = await axios.get(url);
      const friends = [
        { nickname: "정종길1", classic_pt: 30, item_pt: 350 },
        { nickname: "정종길2", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길3", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길4", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길5", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길6", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길7", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길8", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길9", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길10", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길11", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길12", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길13", classic_pt: 40, item_pt: 360 },
        { nickname: "정종길14", classic_pt: 40, item_pt: 360 },
      ];
      return friends;
      // return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return { getFriendsList };
};

export default lobbyApiCall;
