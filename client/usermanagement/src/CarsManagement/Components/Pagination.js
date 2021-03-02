import React, { useState, useEffect } from "react";

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

  const generatePages = (pagenum) => {
    const p = [];
    for (let i = 1; i < pagenum; i++) {
      p.push(
        <li className="page-item current" key={`page-${i}`}>
          <button className="page-link" onClick={() => setPage(i)}>
            {i}
          </button>
        </li>
      );
      return p;
    }
  };
  return (
    <div>
      <div>
        <div aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Previous"
                onClick={previousPage}
                disabled={page == 1}
              >
                <span>&laquo;</span>
              </button>
            </li>
            {generatePages(props.totalPages)}
            <li className="page-item">
              <button
                className="page-link"
                aria-label="Next"
                onClick={nextPage}
                disabled={page == props.totalPages}
              >
                <span>&raquo;</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
