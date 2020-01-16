const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Todo = new Schema({
  title: {
    type: String,
    require: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model("todos", Todo);
