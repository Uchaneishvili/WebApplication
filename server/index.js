const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userModel = require("./models/User");
const carsModel = require("./models/Cars");
const sliderModel = require("./models/Sliders");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://guchaneishvili:Gig@20003030@cluster0.w4obo.mongodb.net/userManagement?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
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
    const { search, sortDirection, sortField, model, manufacturer } = req.query;
    const q = {};
    q["$or"];

    if (model) {
      model.split(",").forEach((value) => {
        if (!q["$or"]) {
          q["$or"] = [{ model: value }];
        } else {
          q["$or"].push({ model: value });
        }
      });
    }

    if (manufacturer) {
      manufacturer.split(",").forEach((value) => {
        if (!q["$or"]) {
          q["$or"] = [{ manufacturer: value }];
        } else {
          q["$or"].push({ manufacturer: value });
        }
      });
    }

    if (search) {
      if (!q["$or"]) {
        q["$or"] = [{ manufacturer: search }, { model: search }];
      } else {
        q["$or"].push({ manufacturer: search });
        q["$or"].push({ model: search });
      }
    }

    const sortInCar = {};

    if (sortField && sortDirection != "undefined") {
      sortInCar[sortField] = sortDirection === "ascend" ? 1 : -1;
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const total = await carsModel.countDocuments(q);

    const result = await carsModel
      .find(q)
      .sort(sortInCar)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      status: "Success",
      count: total,
      page,
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
    const { search, sortDirection, sortField } = req.query;
    const querySearch = {};
    if (search) {
      querySearch["$or"] = [{ firstName: search }, { lastName: search }];
    }

    const sort = {};

    if (sortField) {
      sort[sortField] = sortDirection === "asc" ? 1 : -1;
    }

    let query = userModel.find(querySearch).sort(sort);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const total = await userModel.countDocuments(querySearch);

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

//Slider Management

app.get("/slidermanagement/read/:id", async (req, res) => {
  const id = req.params.id;

  sliderModel.findById(id, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.get("/slidermanagement/read", async (req, res) => {
  sliderModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.post("/slidermanagement/insert", async (req, res) => {
  const { image, name } = req.body;

  const sliders = new sliderModel({
    image: image,
    name: name,
  });

  try {
    await sliders.save();
    res.send("inserted slider");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/slidermanagement/delete/:id", async (req, res) => {
  const id = req.params.id;

  await sliderModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.put("/slidermanagement/edit/:id", async (req, res) => {
  const { image, name, _id } = req.body;

  try {
    const updateSlider = await sliderModel.findById(_id);
    updateSlider.image = image;
    updateSlider.name = name;
    updateSlider.save();

    res.send("update slider");
  } catch (error) {
    console.log(error);
  }
});
app.listen(3001, () => {
  console.log("Server is running on port 3001 ");
});
