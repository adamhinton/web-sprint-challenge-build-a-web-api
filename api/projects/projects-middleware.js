// add middlewares here related to projects
const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  console.log(req.params.id);
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
  // if the client doest not supply a name for the new hub
  // we want to respond with a 422 unprocessable entity
  // otherwise proceed to next middleware
  if (!req.body.name || !req.body.description || !req.body.completed) {
    next(res.status(400).json({ message: "put in a body, you dummy!" }));
  } else {
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
