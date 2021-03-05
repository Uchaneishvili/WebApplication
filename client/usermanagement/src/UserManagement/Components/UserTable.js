import "./UserTable.css";
import Axios from "axios";
import React, { useState } from "react";
import Popup from "./Popup.js";
import Pagination from "./Pagination";
import Search from "./Search";

function UserTable() {
  const [userList, setuserList] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selectedEditUser, setSelectedEditUser] = useState();
  const [pages, setPages] = useState();

  const editClick = () => {
    setSelectedEditUser({});
    setmodalIsOpen(true);
  };

  function editUser(user) {
    setSelectedEditUser(user);
    setmodalIsOpen(true);
  }

  const loadData = async (page, search) => {
    let url = `http://localhost:3001/read?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    await Axios.get(url).then((response) => {
      setuserList(response.data.data);
      setPages(response.data.pages);
    });
  };

  const deleteUser = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);
    loadData();
  };

  const closePopup = () => {
    setmodalIsOpen(false);
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(selectedEditUser, null, 2)}</pre>
      <pre>{JSON.stringify(modalIsOpen, null, 2)}</pre>

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
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
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
                    className="btn btn-danger deteleTableButton"
                    onClick={() => deleteUser(val._id)}
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
      />
      <Pagination loadData={loadData} totalPages={pages} />
    </div>
  );
}

export default UserTable;