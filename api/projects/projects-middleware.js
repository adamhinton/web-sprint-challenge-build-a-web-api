const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      next({ status: 404, message: "user not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: "problem finding user",
    });
  }
}

function validateProject(req, res, next) {
  if (
    !req.body.name ||
    !req.body.description ||
    typeof req.body.completed === "undefined"
  ) {
    next(res.status(400).json({ message: "put in a body, you dummy!" }));
  } else {
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
