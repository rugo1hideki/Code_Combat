const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelSchema = new Schema({
  Mat: {
    type: String,
    required: true,
  },
  Pos: {
    type: String,
    required: true,
  },
  Id: {
    type: String,
    required: true,
  },
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
