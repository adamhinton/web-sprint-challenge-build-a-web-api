// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const { validateProjectId } = require("./projects-middleware");

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

router.get("/:id", validateProjectId, async (req, res) => {
  const project = await Project.get(req.params.id);
  res.json(project);
  //     .then((project) => {
  //       project
  //         ? res.json(project)
  //         : res.status(404).json({ message: "you messed it up!" });
  //     })
  //     .catch((err) => {
  //       res.status(404).json({ message: "the user with this id does not exist" });
  //     });
});

module.exports = router;
