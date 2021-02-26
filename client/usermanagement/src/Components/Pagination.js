import React, { useEffect, useState } from "react";
import axios from "axios";

function Pagination(props) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    props.loadData(page);
    // console.log(props.loadData(page));
  }, [page]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  return (
    <div>
      <div aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={previousPage}
              aria-label="Previous"
            >
              <span>&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link">1</button>
          </li>
          <li className="page-item">
            <button className="page-link">2</button>
          </li>
          <li className="page-item">
            <button className="page-link">3</button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={nextPage} aria-label="Next">
              <span>&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
