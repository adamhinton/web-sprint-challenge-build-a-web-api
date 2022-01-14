// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "blah blah blah error" });
    });
  //   console.log(Project.get(1));
});

module.exports = router;
