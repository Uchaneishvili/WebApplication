const mongoose = require("mongoose");
const slidersSchema = new mongoose.Schema({
  image: {
    // data: Buffer,
    // contentType: String,
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
