const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userModel = require("./models/User");
const carsModel = require("./models/Cars");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://guchaneishvili:Gig@20003030@cluster0.w4obo.mongodb.net/userManagement?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, phone, email } = req.body;

  const user = new userModel({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
  });

  try {
    await user.save();
    res.send("inserted Data 2");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post("/cars/insert", async (req, res) => {
  const { manufacturer, model } = req.body;

  console.log(req.body);

  const cars = new carsModel({
    manufacturer: manufacturer,
    model: model,
  });

  try {
    await cars.save();
    res.send("inserted cars data");
  } catch (error) {
    console.log(error);
  }
});

app.get("/cars/read", async (req, res) => {
  try {
    let q = {};
    if (req.query.search) {
      q.manufacturer = req.query.search;
    }
    let query = carsModel.find(q);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const total = await carsModel.countDocuments(q);

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);
    const result = await query;

    res.status(200).json({
      status: "Success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
});

app.get("/read", async (req, res) => {
  try {
    let q = {};
    if (req.query.search) {
      q.firstName = req.query.search;
    }
    let query = userModel.find(q);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const total = await userModel.countDocuments(q);

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);
    const result = await query;

    res.status(200).json({
      status: "Success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
});

app.delete("/cars/delete:id", async (req, res) => {
  const id = req.params.id;

  await carsModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.put("cars/update", async (req, res) => {
  const { Manufacturer, Model, _id } = req.body;
  console.log(req.body);
  console.log(carsModel);

  try {
    await carsModel.findById(_id, (updateCar) => {
      updateCar.manufacturer = Manufacturer;
      updateCar.model = Model;
      updateCar.save();
      res.send("update");
    });
  } catch (err) {
    console.oog(err);
  }
});

app.put("/update", async (request, res) => {
  console.log(request.body);
  const { firstName, lastName, phone, email, _id } = request.body;

  try {
    await userModel.findById(_id, (updateUser) => {
      updateUser.firstName = firstName;
      updateUser.lastName = lastName;
      updateUser.email = email;
      updateUser.phone = phone;
      updateUser.save();
      res.send("Update");
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await userModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001 ");
});
