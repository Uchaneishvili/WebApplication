const mongoose = require("mongoose");
const carsSchema = new mongoose.Schema({
  manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
});

const Cars = mongoose.model("Cars", carsSchema);
module.exports = Cars;
