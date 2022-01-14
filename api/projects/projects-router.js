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

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
  //   const projectInfo = req.body;
  await Project.update(req.params.id, req.body)
    .then(() => {
      return Project.get(req.params.id);
    })
    .then((project) => {
      res.json(project);
    });
});

router.delete("/:id", validateProjectId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id);
    res.json("removed");
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const result = await Project.getProjectActions(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
