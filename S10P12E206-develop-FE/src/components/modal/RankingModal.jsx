import Rodal from "rodal";
import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import lobbyApiCall from "@/api/axios/lobbyApiCall";
import "rodal/lib/rodal.css";

const RankingModal = ({ visible, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState("classic");
  const itemsCountPerPage = 5;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const useLobbyApiCall = lobbyApiCall();
  const [rankings, setRankings] = useState([]);

  const indexOfLastItem = currentPage * itemsCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;

  useEffect(() => {
    const getRankings = async () => {
      try {
        const data = await useLobbyApiCall.getRankingList(mode);
        console.log(data);
        setRankings(data);
      } catch (error) {
        alert(error);
      }
    };

    getRankings();
  }, [visible, mode]);

  const currentItems =
    rankings.length === 0 ? [] : rankings.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);
  const ToggleButton = ({ modeType, label }) => (
    <button
      className={`px-4 py-2 ${mode === modeType ? "bg-blue-500 text-white" : "bg-white text-blue-500"} border border-blue-500 rounded-lg`}
      onClick={() => setMode(modeType)}
    >
      {label}
    </button>
  );

  return (
    <>
      <Rodal
        visible={visible}
        onClose={() => {
          onClose();
        }}
        customStyles={{ width: "80%", height: "auto" }}
      >
        <div className="flex justify-center space-x-4 my-4">
          <ToggleButton modeType="classic" label="클래식" />
          <ToggleButton modeType="item" label="아이템" />
        </div>
        <div>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">순위</th>
                <th className="border px-4 py-2">닉네임</th>
                <th className="border px-4 py-2">포인트</th>
                <th className="border px-4 py-2">프로필</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.nickname}>
                  <td className="border px-4 py-2">
                    {(currentPage - 1) * itemsCountPerPage + index + 1}
                  </td>
                  <td className="border px-4 py-2">{item.nickname}</td>
                  <td className="border px-4 py-2">{item.point}</td>
                  <td className="border px-4 py-2">
                    {index < 3 ? (
                      <img
                        src={`/src/assets/img/profile/${item.profileImg}.PNG`}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={rankings.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link text-blue-500 hover:text-blue-600"
          innerClass="flex pl-0 rounded list-none flex-wrap justify-center space-x-2"
          activeClass="active bg-blue-500 text-white"
          firstPageText="처음"
          lastPageText="마지막"
        />
      </Rodal>
    </>
  );
};

export default RankingModal;
