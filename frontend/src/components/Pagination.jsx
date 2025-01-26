import React from "react";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate an array of page numbers to display
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        className={`px-4 py-2 rounded-md border ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-zinc-700 hover:bg-zinc-600"
        }`}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-md border ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-zinc-700 hover:bg-zinc-600"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`px-4 py-2 rounded-md border ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-zinc-700 hover:bg-zinc-600"
        }`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
