const express = require("express");
const db = require("../models/db");

const route = express.Router();
route.get("/api/content", (req, res) => {
  db.promise()
    .query(`select * from content`)
    .then((data) => {
      res.status(200).json({ message: "ok", data: data[0] });
    })
    .catch((error) => {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "An error occurred" }); // Send generic error to client
    });
});

route.use((req, res) => {
  res.status(404).json({ messaeme: "Not Found" });
});

module.exports = route;
