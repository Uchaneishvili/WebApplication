import React, { useEffect, useState } from "react";
import Axios from "axios";
import Popup from "./Popup";
import Pagination from "./Pagination";

function CarsTable() {
  const [carsList, setCarsList] = useState();
  const [pages, setPages] = useState();
  const [car, setCar] = useState({});
  const [modal, setModal] = useState();

  const addCar = () => {
    setCar();
    setModal(true);
  };

  const loadData = async (page, search) => {
    let url = `http://localhost:3001/cars/read?page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    await Axios.get(url).then((response) => {
      setCarsList(response.data.data);
      setPages(response.data.pages);
    });
  };

  const deleteCar = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);

    loadData();
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(car, null, 2)}</pre>
      <pre>{JSON.stringify(carsList, null, 2)}</pre>

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
      </div>

      <div className="userListContainer">
        <div className="mapData">
          <table className="table">
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* {generateRecords()} */}
            {carsList &&
              carsList.map((val) => {
                return (
                  <tbody key={val._id}>
                    <tr>
                      <td scope="col" className="firstNameTable" id="FirstName">
                        {val.Manufacturer}
                      </td>
                      <td scope="col" className="lastNameTable" id="LastName">
                        {val.Model}
                      </td>
                      <td scope="col" className="buttonsContainer" id="Action">
                        <button
                          className="btn btn-danger deteleTableButton"
                          onClick={() => deleteCar(val._id)}
                        >
                          delete
                        </button>
                        <button className="btn btn-success updateTableButton">
                          Update
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
      <Pagination totalPage={pages} loadData={loadData} />
      <Popup />
    </div>
  );
}

export default CarsTable;
