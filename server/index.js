const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userModel = require("./models/User");
const carsModel = require("./models/Cars");
// const Sequelize = require("sequilize");
// const Op = Sequelize.Op;

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

// app.get("/search", (req, res) => {
// const { term } = req.query;

// res.status(200).json({
// data: searchResult,
// });
// });

app.get("/search", (req, res) => {
  if (req.query.firstName) {
    const searchField = req.query.firstName;
    userModel
      .find({
        firstName: { $regex: searchField, $options: "$i" },
      })
      .then((data) => {
        res.send(data);
      });
  } else if (req.query.lastName) {
    const searchField = req.query.lastName;
    userModel
      .find({
        lastName: { $regex: searchField, $options: "$i" },
      })
      .then((data) => {
        res.send(data);
      });
  }
});

app.get("/read", async (req, res) => {
  try {
    // if (req.query.search) {
    //   console.log("if");
    //   q.firstName = req.query.search;
    // }

    let query = userModel.find().sort("firstName");
    // let regex = /giga/gi;
    // let rsult = query.match(regex);
    // console.log(rsult);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const total = await userModel.countDocuments();

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

app.delete("/cars/delete/:id", async (req, res) => {
  const id = req.params.id;

  await carsModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.put("/cars/update", async (req, res) => {
  const { manufacturer, model, _id } = req.body;
  console.log(req.body);

  try {
    const updateCar = await carsModel.findById(_id);
    updateCar.manufacturer = manufacturer;
    updateCar.model = model;
    updateCar.save();
    res.send("update");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (request, res) => {
  console.log(request.body);
  const { firstName, lastName, phone, email, _id } = request.body;

  try {
    const updateUser = await userModel.findById(_id);
    updateUser.firstName = firstName;
    updateUser.lastName = lastName;
    updateUser.email = email;
    updateUser.phone = phone;
    updateUser.save();

    res.send("Update");
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
