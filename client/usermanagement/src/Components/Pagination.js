import React, { useEffect, useState } from "react";
import axios from "axios";

function Pagination() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios(`http://localhost:3001/read?page=${page}`);

        const { data, pages: totalPage } = await res.json();

        setPages(totalPage);
        setUsers(data);
        setLoading(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const previousPage = (setPage, page) => {
    setPage = page - 1;
    console.log(setPage);
  };

  const nextPage = (setPage, page) => {
    setPage = page + 1;
    console.log(setPage);
  };
  return (
    <div>
      <div aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button
              class="page-link"
              onClick={previousPage}
              aria-label="Previous"
            >
              <span>&laquo;</span>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link">1</button>
          </li>
          <li class="page-item">
            <button class="page-link">2</button>
          </li>
          <li class="page-item">
            <button class="page-link">3</button>
          </li>
          <li class="page-item">
            <button class="page-link" onClick={nextPage} aria-label="Next">
              <span>&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
