import lobbyUrl from "@/api/url/lobbyUrl";
import usersUrl from "@/api/url/usersUrl";
import axios from "axios";
import { useAccessTokenState } from "@/context/AccessTokenContext";

const lobbyApiCall = () => {
  const accessToken = useAccessTokenState();
  const getFriendsList = () => {
    // const url = lobbyUrl.getFriendsList();
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

  const getRankingList = async (type) => {
    const getRankUrl = lobbyUrl.getRankingList() + "/" + type;
    try {
      const response = await axios.get(getRankUrl, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      });

      // console.log(response);

      return response.data;
    } catch (e) {
      // console.log(e);
      if (e.response.status === 401) {
        reissueUrl = usersUrl.getReissue();
        const response = await axios.post(
          reissueUrl,
          {
            grantType: "Bearer",
            accessToken: accessToken.accessToken,
            refreshToken: accessToken.refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
          }
        );
      }
      console.log(response);
      // accessToken.
    }
  };

  return { getFriendsList, getRankingList };
};

export default lobbyApiCall;

// const rankings =
//   type === "classic"
//     ? [
//         { nickname: "정종길1", profileImg: 1, point: 10 },
//         { nickname: "정종길2", profileImg: 2, point: 20 },
//         { nickname: "정종길3", profileImg: 3, point: 30 },
//         { nickname: "정종길4", profileImg: 4, point: 40 },
//         { nickname: "정종길5", profileImg: 1, point: 50 },
//         { nickname: "정종길6", profileImg: 2, point: 60 },
//         { nickname: "정종길7", profileImg: 3, point: 70 },
//         { nickname: "정종길8", profileImg: 4, point: 80 },
//         { nickname: "정종길9", profileImg: 1, point: 90 },
//         { nickname: "정종길10", profileImg: 2, point: 100 },
//         { nickname: "정종길11", profileImg: 3, point: 110 },
//         { nickname: "정종길12", profileImg: 4, point: 120 },
//         { nickname: "정종길13", profileImg: 1, point: 130 },
//         { nickname: "정종길14", profileImg: 2, point: 140 },
//       ]
//     : [
//         { nickname: "심상익1", profileImg: 1, point: 10 },
//         { nickname: "심상익2", profileImg: 2, point: 20 },
//         { nickname: "심상익3", profileImg: 3, point: 30 },
//         { nickname: "심상익4", profileImg: 4, point: 40 },
//         { nickname: "심상익5", profileImg: 1, point: 50 },
//         { nickname: "심상익6", profileImg: 2, point: 60 },
//         { nickname: "심상익7", profileImg: 3, point: 70 },
//         { nickname: "심상익8", profileImg: 4, point: 80 },
//         { nickname: "심상익9", profileImg: 1, point: 90 },
//         { nickname: "심상익10", profileImg: 2, point: 100 },
//         { nickname: "심상익11", profileImg: 3, point: 110 },
//         { nickname: "심상익12", profileImg: 4, point: 120 },
//         { nickname: "심상익13", profileImg: 1, point: 130 },
//         { nickname: "심상익14", profileImg: 2, point: 140 },
//       ];
