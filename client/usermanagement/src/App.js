import "./App.css";
import React, { useState } from "react";
import UserTable from "./Components/UserTable.js";
import Popup from "./Components/Popup.js";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const indexOfLastPosts = postPerPage * currentPage;
  const indexOfFirstPosts = indexOfLastPosts - postPerPage;
  const currentPosts = userList.slice(indexOfLastPosts, indexOfFirstPosts);

  return (
    <div>
      <UserTable userList={userList} />;
      <Popup />;
      <Pagination
        postPerPage={postPerPage}
        totalPosts={userList.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
