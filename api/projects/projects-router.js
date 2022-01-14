// call validateProjectId anywhere with an :id
const express = require("express");
const router = express.Router();

const { validateProjectId, validateProject } = require("./projects-middleware");

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

// validateProjectId does most of the work here
router.get("/:id", validateProjectId, async (req, res) => {
  const project = await Project.get(req.params.id);
  res.json(project);
});

router.post("/", validateProject, (req, res) => {
  const projectInfo = req.body;
  Project.insert(projectInfo);
  res.json(projectInfo);
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {});

module.exports = router;
