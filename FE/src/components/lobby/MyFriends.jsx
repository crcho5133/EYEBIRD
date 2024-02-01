import React, { useState } from "react";
import Pagination from "react-js-pagination";
import lobbyApiCall from "@/api/axios/lobbyApiCall";
import { useWebSocket } from "@/context/WebSocketContext";

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsCountPerPage = 5; // 페이지 당 아이템 수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getFriends = lobbyApiCall();
  const friends = getFriends.getFriendsList();

  // 현재 접속중인 친구 요청
  // const webSocket = useWebSocket();
  // const currentUsers = webSocket.currentUsers();

  // 현재 페이지에 해당하는 친구 목록을 계산
  const indexOfLastItem = currentPage * itemsCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
  const currentItems = friends.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">닉네임</th>
              <th className="border px-4 py-2">점수(클래식/아이템)</th>
              <th className="border px-4 py-2">접속현황</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((friend) => (
              <tr key={friend.nickname}>
                <td className="border px-4 py-2">{friend.nickname}</td>
                <td className="border px-4 py-2">
                  {friend.classic_pt} / {friend.item_pt}
                </td>
                <td className="border px-4 py-2">접속 현황 정보</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={friends.length} // 실제 아이템 수에 맞춰서 총 아이템 수를 수정
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link text-blue-500 hover:text-blue-600"
        innerClass="flex pl-0 rounded list-none flex-wrap justify-center space-x-2"
        activeClass="active bg-blue-500 text-white"
        firstPageText="처음"
        lastPageText="마지막"
      />
    </>
  );
};

export default MyComponent;
