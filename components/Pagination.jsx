import React from "react";

const Pagination = (notesPerPage,totalNotes) => {
    console.log(notesPerPage,totalNotes)
    const pageNumbers = [];
    for(let i=0; i<= Math.ceil(totalNotes/notesPerPage);i++){
        pageNumbers.push(i);
    }
    console.log(pageNumbers)
    const paginate = () => {
        pageNumbers.map(page => {
            (<div className="flex p-4 aspect-square justify-center items-center w-14 shadow-brand-main rounded-brand-main">
            {page}
          </div>)
        })
    }
    return (<div className="pagination flex gap-x-3 justify-center items-center my-10">
      {paginate()}
      {/* <div className="flex p-4 aspect-square justify-center items-center w-14 shadow-brand-main rounded-brand-main">
          1
        </div>
        <div className="flex p-4 aspect-square justify-center items-center w-14 shadow-brand-main rounded-brand-main">
          2
        </div>
        <div className="flex p-4 aspect-square justify-center items-center w-14 shadow-brand-main rounded-brand-main">
          3
        </div>
        <div className="flex p-4 aspect-square justify-center items-center w-14 shadow-brand-main rounded-brand-main">
          4
        </div> */}
    </div>
  );
};

export default Pagination;
