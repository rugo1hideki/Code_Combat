const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const Level = require("./models/level");

const app = express();

app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const createPath = (page) =>
  path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`listening port ${process.env.PORT}`);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.urlencoded({ extended: false }));

app.use(express.static("styles"));

app.get("/", (req, res) => {
  const title = "Main Menu";
  Level.find()
    .then((levels) => res.render(createPath("levels"), { levels, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
