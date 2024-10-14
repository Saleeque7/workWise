export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="flex justify-center items-center   rounded-md">
     
        {pages.map((page) => (
          <div
            key={page}
            className={`mx-1 px-3 py-1 rounded-md cursor-pointer text-lg font-bold text-center transition-colors duration-300 
            ${currentPage === page ? "bg-borderColor text-white" : "bg-gray-200 text-black hover:bg-taskButton"}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </div>
        ))}
      </div>
    );
  };
  