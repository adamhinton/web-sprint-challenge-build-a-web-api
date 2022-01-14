// Write your "projects" router here!
const express = require("express");
const router = express.Router();

// const {
//   get,
//   insert,
//   update,
//   remove,
//   getProjectActions,
// } = require("./projects-model");

const Project = require("./projects-model");

router.get("/", async (req, res) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "blah blah blah error" });
    });
});

router.get("/:id", async (req, res) => {
  console.log("id:", req.params.id);
  await Project.get(req.params.id)
    .then((project) => {
      console.log("One project:", project);
      res.json(project);
    })
    .catch((err) => {
      res.status(404).json({ message: "the user with this id does not exist" });
    });
});

module.exports = router;
