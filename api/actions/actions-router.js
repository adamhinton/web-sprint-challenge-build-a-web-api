const express = require("express");
// These middlewares make sure that an id actually exists, and that an action has a valid body.
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

// This doesn't catch if an id isn't valid, just returns an error. Will work on that later if I have time.
router.post("/", validateAction, async (req, res, next) => {
  await Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateActionId, validateAction, async (req, res) => {
  await Action.update(req.params.id, req.body)
    .then(() => {
      return Action.get(req.params.id);
    })
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id);
    res.json("removed");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
