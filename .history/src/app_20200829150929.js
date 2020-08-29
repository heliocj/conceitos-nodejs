const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require('uuidv4');

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes: 0};

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repositoryindex = repositories.findIndex(repository => repository.id == id);

  if (repositorieindex < 0) {
      return response.status(400).json({error: "Repository does not exist!"});
  }

  const repository = {
      id,
      title,
      url,
      techs
  };

  repositories[repositoryindex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoryindex = repositories.findIndex(repository => repository.id == id);

  if (repositoryindex < 0) {
      return response.status(400).json({error: "Repository does not exist!"});
  }
  
  repositories.splice(repositoryindex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

});

module.exports = app;
