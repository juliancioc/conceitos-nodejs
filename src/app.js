const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, description, url, techs } = request.body;
  const reposity = { id: uuid(), title, description, url, techs, likes: 0 };

  repositories.push(reposity);

  return response.json(reposity);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, description, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  const repository = {
    id,
    title,
    description,
    url,
    techs,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = repository;

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' })
  }

  repositories[repoIndex].likes++;

  return response.json(repositories[repoIndex])
});

module.exports = app;
