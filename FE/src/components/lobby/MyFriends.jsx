import Rodal from "rodal";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import lobbyApiCall from "@/api/axios/lobbyApiCall";
import "rodal/lib/rodal.css";

const MyFriends = ({ visible, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [friends, setFriends] = useState([]);
  const useLobbyApiCall = lobbyApiCall();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getFriends = async (currentPage) => {
    try {
      const data = await useLobbyApiCall.getFriendsList(currentPage);
      setFriends(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (visible) {
      getFriends(currentPage);
    }
  }, [visible]);

  return (
    <>
      <div>{friends}</div>
      <Pagination
        activePage={currentPage}
        totalItemsCount={friends.length}
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

export default MyFriends;
