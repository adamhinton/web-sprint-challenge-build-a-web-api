// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const { validateProjectId } = require("./projects-middleware");

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
});

module.exports = router;
