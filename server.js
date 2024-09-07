const express = require("express");
const mongoose = require("mongoose");

const portss = 3000;

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://venkatasairaccha:venkatasairaccha@cluster0.3doi0vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((req, res) => {
    console.log("database connected ...");
  })
  .catch((err) => {
    console.log(err.message);
  });


//importing file of CRUDAPI.js IN server.js
app.use(require("./Routes/CRUDAPI"));


app.listen(portss, () => {
  console.log(`server running at ${portss}`);
});