const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userModel = require("./models/User");

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
  // es6 syntax destructure variables from object
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

app.get("/read", async (req, res) => {
  // let test = userModel.find({});

  // res.send(test);

  try {
    let query = userModel.find({});

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const total = await userModel.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);
    const result = await query;
    res.send(result);
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

app.put("/update", async (request, res) => {
  const { firstName, lastName, phone, email, _id } = request.body;
  console.log(request.body);

  try {
    await userModel.findById(_id, (err, updateUser) => {
      updateUser.firstName = firstName;
      updateUser.lastName = lastName;
      updateUser.email = email;
      updateUser.phone = phone;
      updateUser.save();
      res.send("Update");
    });
  } catch (err) {
    console.log(err);
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
