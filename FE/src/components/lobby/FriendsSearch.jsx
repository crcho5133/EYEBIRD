import React, { useState } from "react";
import lobbyApiCall from "@/api/axios/lobbyApiCall";
import Pagination from "react-js-pagination";

const FriendsSearch = () => {
  const useLobbyApiCall = lobbyApiCall();
  const [keyword, setKeyword] = useState("");
  const [friends, setFriends] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastFriend = currentPage * itemsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - itemsPerPage;
  const currentFriends = friends.slice(indexOfFirstFriend, indexOfLastFriend);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    try {
      let data = await useLobbyApiCall.searchUsers(keyword);
      data = data.sort((a, b) => {
        if (a.nickname < b.nickname) {
          return -1;
        }
        if (a.nickname > b.nickname) {
          return 1;
        }
        return 0;
      });
      setFriends(data);
    } catch (error) {
      alert(error.response?.data?.errorMessage);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>친구 찾기</h2>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>확인</button>
      <div>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">No.</th>
              <th className="border px-4 py-2">닉네임</th>
              <th className="border px-4 py-2">포인트(클래식/아이템)</th>
            </tr>
          </thead>
          <tbody>
            {currentFriends.map((item, index) => (
              <tr key={item.nickname}>
                <td className="border px-4 py-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td className="border px-4 py-2">{item.nickname}</td>
                <td className="border px-4 py-2">
                  {item.classicPt} / {item.itemPt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        activePage={currentPage}
        totalItemsCount={friends.length}
        itemsCountPerPage={itemsPerPage}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link text-blue-500 hover:text-blue-600"
        innerClass="flex pl-0 rounded list-none flex-wrap justify-center space-x-2"
        activeClass="active bg-blue-500 text-white"
        firstPageText="처음"
        lastPageText="마지막"
      />
    </div>
  );
};

export default FriendsSearch;
