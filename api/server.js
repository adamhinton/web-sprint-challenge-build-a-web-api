const express = require("express");
const server = express();
server.use(express.json());

//fill this in later, not defined yet
// const projectsRouter = require("./projects", projectsRouter);
// const actionsRouter = require("./projects", actionsRouter);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get("/", (req, res) => {
  res.send(`<h2>Projects/Actions API</h2>`);
});

module.exports = server;
