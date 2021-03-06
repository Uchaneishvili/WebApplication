import React, { useState, useEffect } from "react";
import { Pagination } from "antd";

function PaginationFnct(props) {
  const [page, setPage] = useState(1);
  const [state, setState] = useState({ minValue: 0, maxValue: 9 });
  let x = props.carsList;

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
    for (let i = 1; i <= pagenum; i++) {
      // p.push(
      //   <li className="page-item current" key={`page-${i}`}>
      //     <a
      //       className={`page-link ${i === page ? "is-active" : ""}`}
      //       onClick={() => setPage(i)}
      //     >
      //       {i}
      //     </a>
      //   </li>
      // );
    }
    return p;
  };

  const handleChange = (value) => {
    if (value <= 1) {
      setState({
        minValue: 0,
        maxValue: 9,
      });
    } else {
      setState({
        minValue: state.maxValue,
        maxValue: value * 9,
      });
    }
  };
  return (
    <div>
      <div>
        <div aria-label="Page navigation example">
          <Pagination
            defaultCurrent={1}
            onChange={handleChange}
            defaultPageSize={4}
            showSizeChanger
          />

          {/* <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                aria-label="Previous"
                onClick={previousPage}
                disabled={page == 1}
              >
                <span>&laquo;</span>
              </a>
            </li>
            
            ;
            <li className="page-item">
              <a
                className="page-link"
                aria-label="Next"
                onClick={nextPage}
                disabled={page == props.totalPages}
              >
                <span>&raquo;</span>
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default PaginationFnct;
