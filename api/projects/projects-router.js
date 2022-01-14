// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const router = express.Router();

router.get("/api/projects", (req, res) => {
  console.log("bdjisfasji");
});

module.exports = router;
