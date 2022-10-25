import React from "react";

const Pagination = ({ notesPerPage, totalNotes, handlePageChange, currentPage }) => {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalNotes / notesPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = () => {
   return pageNumbers.map((page, index) => {
      return (
        <div
          key={index}
          className={`flex p-4 aspect-square bg-card-bg text-brand-main-medium-color justify-center items-center w-14 shadow-brand-main rounded-brand-main ${(currentPage === page) ? `border-2 border-black` : "" }`}
          onClick={(e)=> {e.preventDefault(); handlePageChange(page)}}
        >
          {page+1}
        </div>
      );
    });
  };
  return (
    <div className="pagination flex gap-x-3 justify-center items-center my-10">
      {paginate()}
    </div>
  );
};

export default Pagination;
