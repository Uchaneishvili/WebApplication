import "./UserTable.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Popup from "./Popup.js";
import Modal from "react-modal";
import Pagination from "./Pagination";
import Search from "./Search";

function UserTable() {
  const [userList, setuserList] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [userDataForTable, setUserDataForTable] = useState();
  const [selectedEditUser, setSelectedEditUser] = useState();
  const [userValue, setUserValue] = useState(false);

  const createUserClick = () => {
    setSelectedEditUser({});
    setmodalIsOpen(true);
    setUserValue(true);
  };

  function editUser(user) {
    setSelectedEditUser(user);
    setmodalIsOpen(true);
    console.log(user);
    // loadData();
  }

  const loadData = async (page, search) => {
    let url = `http://localhost:3001/read?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    await Axios.get(url)
      .then((response) => {
        setuserList(response.data.data);
      })
      .then((receivedData) => setUserDataForTable(receivedData))
      .catch((err) => console.error(err));
  };

  const deleteUser = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);
    loadData();
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(selectedEditUser, null, 2)}</pre>
      <div className="SearchAndAddUserContainer">
        <div className="centerButtonContainer">
          <button
            type="button"
            className="btn btn-light custom-button"
            onClick={createUserClick}
          >
            Add User
          </button>
        </div>
        <Search />
      </div>
      <div className="userListContainer">
        <div className="mapData">
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
              {userList.map((val, key) => {
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
                        onClick={() => editUser(val._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Popup
        setSelectedEditUser={setSelectedEditUser}
        selectedEditUser={selectedEditUser}
        setUserValue={setUserValue}
        isOpen={modalIsOpen}
      >
        {}
      </Popup>
      <Pagination loadData={loadData} />
    </div>
  );
}

export default UserTable;
