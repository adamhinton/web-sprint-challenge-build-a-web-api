// add middlewares here related to actions
const Action = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    console.log("validating");
  } catch (err) {
    console.log("validating error");
  }
}

module.exports = {
  validateActionId,
};
