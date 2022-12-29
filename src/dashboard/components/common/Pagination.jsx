import React from "react";
import { range } from "../../utils/pagination";

const Pagination = ({ pageSize, itemCount, onPagination, currentPage }) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  const pages = range(pagesCount);
  if (pagesCount === 1) return null;
  let pagesFilter = pages.length > 5 ? pages.slice(0, 5) : pages;
  { pagesFilter = currentPage >= 5 ? pages.slice(currentPage-4, currentPage+1) : pagesFilter }
  return (
    <div className="pagination">
      <span>
        Showing {currentPage * pageSize - pageSize + 1} to{" "}
        {currentPage * pageSize} of {itemCount} entries
      </span>

      <nav>
        <ul className="list list-inline">
          {pagesFilter.map((page) => {  
            return (
              <li
                onClick={() => onPagination(page)}
                key={page}
                className={
                  page === currentPage ? "list__item active" : "list__item"
                }
              >
                <a className="page-link">{page}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
