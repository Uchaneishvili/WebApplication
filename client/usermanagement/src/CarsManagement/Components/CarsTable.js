import React, { useState } from "react";
import Axios from "axios";
import Popup from "./Popup";
import Pagination from "./Pagination";
import Search from "./Search";

function CarsTable() {
  const [carsList, setCarsList] = useState();
  const [pages, setPages] = useState();
  const [car, setCar] = useState({});
  const [modal, setModal] = useState();

  const addCar = () => {
    setModal(true);
    setCar({});
  };

  const editCar = (cars) => {
    setModal(true);
    setCar(cars);
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
    await Axios.delete(`http://localhost:3001/cars/delete/${id}`);

    loadData();
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(car, null, 2)}</pre>

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
            <th>Manufacturer</th>
            <th>Model</th>
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
                  <td scope="col" className="model" id="Manufacturer">
                    {val.model}
                  </td>
                  <td scope="col" className="buttonsContainer" id="Action">
                    <button
                      className="btn btn-danger deteleTableButton"
                      onClick={() => deleteCar(val._id)}
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
      <Popup modal={modal} car={car} loadData={loadData} setCar={setCar} />
    </div>
  );
}

export default CarsTable;
