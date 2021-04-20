import React, { useState, useEffect } from "react";
import Axios from "axios";
import Popup from "./Popup";
import Search from "./Search";
import PopupConfirm from "./PopupConfirm";
import "./CarsTable.css";
import { PlusOutlined } from "@ant-design/icons";

import { Table, Button } from "antd";

function CarsTable() {
  const [carsList, setCarsList] = useState();
  const [current, setCurrent] = useState();
  const [total, setTotal] = useState();
  const [car, setCar] = useState({});
  const [modal, setModal] = useState();
  const [confirmPopup, setConfirmPopup] = useState();
  const [carIdToDelete, setCarIdToDelete] = useState();

  const addCar = () => {
    setModal(true);
    setCar({});
  };
  useEffect(() => {
    loadData(1, "");
  }, []);

  const editCar = (car) => {
    setModal(true);
    setCar(car);
    console.log("editcar");
  };

  const loadData = async (
    page,
    search,
    sortField,
    sortDirection,
    filterFields
  ) => {
    let url = `http://localhost:3001/cars/read?page=${page}`;
    // if (search) {
    //   url += `&search=${search}`;
    // }

    if (sortField) {
      url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
    }

    // if (filterFields) {
    //   Object.keys(filterFields).forEach((key) => {
    //     const joinedFilterValue = filterFields[key]?.join();
    //     url += `&${key}=${joinedFilterValue}`;
    //     console.log(joinedFilterValue);
    //   });
    // }

    await Axios.get(url).then((response) => {
      setCarsList(response.data.data);
      setCurrent(response.data.page);
      setTotal(response.data.count);
    });
  };

  const deleteCar = async (id) => {
    await Axios.delete(`http://localhost:3001/cars/delete/${id}`);
    loadData();
    setConfirmPopup(false);
    console.log("test");
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

  const tableHead = [
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      sorter: true,
      filters: [
        {
          text: "Opel",
          value: "opel",
        },
        {
          text: "Ford",
          value: "ford",
        },
        {
          text: "Toyota",
          value: "toyota",
        },
      ],
    },
    {
      title: "Model",
      dataIndex: "model",
      sorter: true,
      filters: [
        {
          text: "corsa",
          value: "corsa",
        },
        {
          text: "Vectra",
          value: "vectra",
        },
      ],
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, car) => (
        <div>
          <Button
            type="danger"
            className="deleteCarButton"
            onClick={() => openConfirmPopup(id)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            className="updateCarButton"
            onClick={() => {
              editCar(car);
            }}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    loadData(pagination.current, "", sorter.field, sorter.order, filters);
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(car)}</pre>

      <div className="SearchAndAddUserContainer">
        <div className="centerButtonContainer">
          <Button
            type="primary"
            size="large"
            onClick={addCar}
            icon={<PlusOutlined />}
          >
            Add Car
          </Button>
        </div>
        <Search loadData={loadData} />
      </div>
      <Table
        dataSource={carsList}
        columns={tableHead}
        pagination={{ current: current, pageSize: 10, total: total }}
        onChange={handleTableChange}
        rowKey={(car) => car._id}
      />

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
