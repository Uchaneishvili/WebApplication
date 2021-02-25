import React from "react";

function Pagination({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          {pageNumbers.map((number) => {
            return (
              <li className="page-item" key={number}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => paginate(number)}
                >
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
