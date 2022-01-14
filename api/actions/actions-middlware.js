// add middlewares here related to actions
const Action = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: "action not found" });
    } else {
      console.log("action validated");
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
  console.log("validating action...");
}

module.exports = {
  validateActionId,
  validateAction,
};
