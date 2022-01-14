const express = require("express");
const { validateActionId } = require("./actions-middlware");
const router = express.Router();

const Action = require("./actions-model");

router.get("/", (req, res) => {
  Action.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(404).json({ message: "blah blah blah error" });
    });
});

router.get("/:id", validateActionId, (req, res, next) => {
  console.log("getting action id");
});

module.exports = router;
