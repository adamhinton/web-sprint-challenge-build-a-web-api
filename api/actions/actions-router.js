const express = require("express");
const { validateActionId, validateAction } = require("./actions-middlware");
const router = express.Router();

const Action = require("./actions-model");

router.get("/", (req, res) => {
  Action.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(404).json({ message: "blah blah blah error" });
    });
});

router.get("/:id", validateActionId, async (req, res, next) => {
  const action = await Action.get(req.params.id);
  res.json(action);
});

//this isn't quite right, passes codegrade tests but returns an error when I call it in postman
router.post("/", validateAction, async (req, res, next) => {
  await Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.

// router.post("/", validateProject, (req, res) => {
//   const projectInfo = req.body;
//   Project.insert(projectInfo);
//   res.json(projectInfo);
// });
