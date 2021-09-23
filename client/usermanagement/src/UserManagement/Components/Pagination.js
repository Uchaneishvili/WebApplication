import React, { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination(props) {
  const [page, setPage] = useState(1);
  const [clickState, setClickState] = useState(false);

  useEffect(() => {
    props.loadData(page);
  }, [page]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  function onClickButton(i) {
    setClickState(true);
    setPage(i);
  }

  function generatePages(pagenum) {
    const pages = [];

    for (let i = 1; i <= pagenum; i++) {
      pages.push(
        <li className="page-item current" key={`page-${i}`}>
          <a
            onClick={() => onClickButton(i)}
            className={`page-link ${i === page ? "is-active" : ""}`}
          >
            {i}
          </a>
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
            <a
              className="page-link"
              onClick={previousPage}
              aria-label="Previous"
              disabled={page == 1}
            >
              <span>&laquo;</span>
            </a>
          </li>
          {generatePages(props.totalPages)}
          <li className="page-item">
            <a
              className="page-link"
              onClick={nextPage}
              aria-label="Next"
              disabled={page == props.totalPages}
            >
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
