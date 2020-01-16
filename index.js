require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 4000;
const todoItemRoutes = require("./routes/todo-routes");

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("You can talk to your db now");
  })
  .catch((error) => {
    console.log(`Db connection error: ${error}`);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", todoItemRoutes);

app.listen(PORT, () => {
  console.log(`server is up and at em, on port: ${PORT}`);
});
