const Action = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: "action not found" });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: "problem finding action",
    });
  }
}

function validateAction(req, res, next) {
  const { notes, description, project_id } = req.body;
  if (!notes || !description || !project_id) {
    next(
      res.status(400).json({
        message: "put in an action body, you dummy!",
      })
    );
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
};
