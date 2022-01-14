const express = require("express");
const router = express.Router();

const Action = require("./actions-model");

router.get("/", (req, res) => {
  console.log("sucess! 123");
});

module.exports = router;
