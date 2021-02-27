import React, { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination(props) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    props.loadData(page);
  }, [page]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  function generatePages(pagenum) {
    const pages = [];
    for (let i = 1; i <= pagenum; i++) {
      pages.push(
        <li className="page-item current" key={`page-${i}`}>
          <button className="page-link" onClick={() => setPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  }

  return (
    <div>
      <div aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={previousPage}
              aria-label="Previous"
              disabled={page == 1}
            >
              <span>&laquo;</span>
            </button>
          </li>
          {generatePages(props.totalPages)}
          <li className="page-item">
            <button
              className="page-link"
              onClick={nextPage}
              aria-label="Next"
              disabled={page == props.totalPages}
            >
              <span>&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
