const mongoose = require("mongoose");
const slidersSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Sliders = mongoose.model("Sliders", slidersSchema);
module.exports = Sliders;
