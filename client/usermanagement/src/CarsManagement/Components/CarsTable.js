import React, { useState } from "react";
import Axios from "axios";
import Popup from "./Popup";
import Pagination from "./Pagination";
import Search from "./Search";
import PopupConfirm from "./PopupConfirm";

function CarsTable() {
  const [carsList, setCarsList] = useState();
  const [pages, setPages] = useState();
  const [car, setCar] = useState({});
  const [modal, setModal] = useState();
  const [confirmPopup, setConfirmPopup] = useState();
  const [carIdToDelete, setCarIdToDelete] = useState();
  const [sortObjectInCar, setSortObjectInCar] = useState();

  const addCar = () => {
    setModal(true);
    setCar({});
  };

  const editCar = (cars) => {
    setModal(true);
    setCar(cars);
  };

  const loadData = async (page, search, sortField, sortDirection) => {
    let url = `http://localhost:3001/cars/read?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    if (sortField) {
      url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
    }

    await Axios.get(url).then((response) => {
      setCarsList(response.data.data);
      setPages(response.data.pages);
    });
  };

  const deleteCar = async (id) => {
    await Axios.delete(`http://localhost:3001/cars/delete/${id}`);
    loadData();
    setConfirmPopup(false);
  };

  const closePopup = () => {
    setModal(false);
  };

  const openConfirmPopup = (id) => {
    setCarIdToDelete(id);
    setConfirmPopup(true);
  };

  const closeConfirmPopup = () => {
    setConfirmPopup(false);
  };
  const sortInCar = (sortField) => {
    if (!sortObjectInCar[sortField]) {
      setSortObjectInCar({ [sortField]: "asc" });
      loadData(1, "", sortField, "asc");
    } else {
      if (sortObjectInCar[sortField] == "asc") {
        setSortObjectInCar({ [sortField]: "desc" });
        loadData(1, "", sortField, "desc");
      } else {
        setSortObjectInCar({});
        loadData(1, "");
      }
    }
  };

  const iconRenderer = (fieldName) => {
    if (sortObjectInCar[fieldName] === "asc") {
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
    } else if (sortObjectInCar[fieldName] === "desc") {
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
            onClick={addCar}
          >
            Add Car
          </button>
        </div>
        <Search loadData={loadData} />
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              Manufacturer{" "}
              <span onClick={() => sortInCar("manufacturer")}>
                {/* {iconRenderer("manufacturer")} */}
              </span>
            </th>

            <th>
              Model
              <span onClick={() => sortInCar("model")}>
                {/* {iconRenderer("model")} */}
              </span>
            </th>
            <th>Action</th>
          </tr>
        </thead>

        {carsList &&
          carsList.map((val) => {
            return (
              <tbody key={val._id}>
                <tr>
                  <td scope="col" className="manufacturer" id="Manufacturer">
                    {val.manufacturer}
                  </td>
                  <td scope="col" className="model" id="Model">
                    {val.model}
                  </td>
                  <td scope="col" className="buttonsContainer" id="Action">
                    <button
                      className="btn btn-danger deteleTableButton"
                      onClick={() => openConfirmPopup(val._id)}
                    >
                      delete
                    </button>
                    <button
                      className="btn btn-success updateTableButton"
                      onClick={() => editCar(val)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
      <Pagination totalPages={pages} loadData={loadData} />
      <Popup
        modal={modal}
        car={car}
        loadData={loadData}
        closePopup={closePopup}
        setCar={setCar}
      />
      <PopupConfirm
        deleteCar={deleteCar}
        confirmPopup={confirmPopup}
        closeConfirmPopup={closeConfirmPopup}
        carIdToDelete={carIdToDelete}
      />
    </div>
  );
}

export default CarsTable;
