import "./UserTable.css";
import Axios from "axios";
import React, { useState } from "react";
import Popup from "./Popup.js";
import Pagination from "./Pagination";
import Search from "./Search";
import PopupConfirm from "./PopupConfirm";

function UserTable() {
  const [userList, setuserList] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState();
  const [pages, setPages] = useState();
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState();
  const [sortObject, setSortObject] = useState({});

  const editClick = () => {
    setSelectedEditUser({});
    setmodalIsOpen(true);
  };

  function editUser(user) {
    setSelectedEditUser(user);
    setmodalIsOpen(true);
  }

  function deleteUserPopup(id) {
    setUserIdToDelete(id);
    setConfirmModalIsOpen(true);
  }

  const loadData = async (page, search, sortField, sortDirection) => {
    let url = `http://localhost:3001/read?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    if (sortField) {
      url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
    }

    await Axios.get(url).then((response) => {
      setuserList(response.data.data);
      setPages(response.data.pages);
    });
  };

  const closePopup = () => {
    setmodalIsOpen(false);
  };

  const closeConfirmPopup = () => {
    setConfirmModalIsOpen(false);
  };

  const deleteUser = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);
    loadData(1);
    setConfirmModalIsOpen(false);
  };

  const sort = (sortField) => {
    if (!sortObject[sortField]) {
      setSortObject({ [sortField]: "asc" });
      loadData(1, "", sortField, "asc");
    } else {
      if (sortObject[sortField] == "asc") {
        setSortObject({ [sortField]: "desc" });
        loadData(1, "", sortField, "desc");
      } else {
        setSortObject({});
        loadData(1, "");
      }
    }
  };

  const iconRenderer = (fieldName) => {
    if (sortObject[fieldName] === "asc") {
      return (
        <svg
          className="sortIcon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          ></path>
        </svg>
      );
    } else if (sortObject[fieldName] === "desc") {
      return (
        <svg
          className="sortIcon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
          ></path>
        </svg>
      );
    } else {
      return (
        <svg
          className="sortIcon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          ></path>
        </svg>
      );
    }
  };

  return (
    <div className="container">
      <div className="SearchAndAddUserContainer">
        <div className="centerButtonContainer">
          <button
            type="button"
            className="btn btn-light custom-button"
            onClick={editClick}
          >
            Add User
          </button>
        </div>
        <Search loadData={loadData} />
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              First Name{" "}
              <span onClick={() => sort("firstName")}>
                {iconRenderer("firstName")}
              </span>
            </th>

            <th>
              Last Name{" "}
              <span onClick={() => sort("lastName")}>
                {iconRenderer("lastName")}
              </span>
            </th>

            <th>
              Email <span></span>
            </th>

            <th>
              Phone <span></span>
            </th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((val) => {
            return (
              <tr key={val._id}>
                <td scope="col" className="firstNameTable" id="FirstName">
                  {val.firstName}
                </td>
                <td scope="col" className="lastNameTable" id="LastName">
                  {val.lastName}
                </td>
                <td scope="col" className="emailTable" id="Email">
                  {val.email}
                </td>
                <td scope="col" className="phoneTable" id="Phone">
                  {val.phone}
                </td>
                <td scope="col" className="buttonsContainer" id="Action">
                  <button
                    className="btn btn-danger deleteTableButton"
                    onClick={() => deleteUserPopup(val._id)}
                  >
                    delete
                  </button>

                  <button
                    className="btn btn-success updateTableButton"
                    onClick={() => editUser(val)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Popup
        setSelectedEditUser={setSelectedEditUser}
        selectedEditUser={selectedEditUser}
        modalIsOpen={modalIsOpen}
        closePopup={closePopup}
        loadData={loadData}
        pages={pages}
      />
      <Pagination loadData={loadData} totalPages={pages} />
      <PopupConfirm
        confirmModalIsOpen={confirmModalIsOpen}
        closeConfirmPopup={closeConfirmPopup}
        deleteUser={deleteUser}
        userIdToDelete={userIdToDelete}
      />
    </div>
  );
}

export default UserTable;
