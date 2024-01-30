import React, { useState } from "react";
import Pagination from "react-js-pagination";

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 200; // 전체 아이템 수

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">닉네임</th>
            <th className="border px-4 py-2">점수</th>
            <th className="border px-4 py-2">접속현황</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">정종길</td>
            <td className="border px-4 py-2">1500</td>
            <td className="border px-4 py-2 text-green-600">온라인</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border px-4 py-2">심상익</td>
            <td className="border px-4 py-2">35</td>
            <td className="border px-4 py-2 text-red-600">오프라인</td>
          </tr>
        </tbody>
      </table>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={10}
        totalItemsCount={totalItems}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        firstPageText="처음"
        lastPageText="마지막"
      />
    </div>
  );
};

export default MyComponent;
