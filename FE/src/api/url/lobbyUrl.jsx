import { baseUrl } from "@/api/url/baseUrl";

export default {
  getRankingList: () => `${baseUrl}/api/point/rank`,
  searchUsers: () => `${baseUrl}/api/user/search`,

  //친구관련 API 재확인 필요

  //(이상함) addFriend는 친구를 dB에 추가하는 로직임 -> 현재 profileModal의 친구추가 버튼 클릭 시 발생하는 요청
  addFriend: () => `${baseUrl}/api/friend`,

  //acceptFriendRequest는 친구 요청 창에서 수락 눌렀을 때 발생하는 요청(위에꺼랑 뭐가 이상함 확인 필요)
  acceptFriendRequest: () => `${baseUrl}/api/message/friend`,

  //(임의 생성)친구 요청 메시지 받아오는 url (명세에 없음 확인 필요함)
  getFriendRequestList: () => `${baseUrl}/api/message`,

  //(확인 필요)친구 요청 메시지 거절하는 url
  rejectFriendRequest: () => `${baseUrl}/api/message`,
};
