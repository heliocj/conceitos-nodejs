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
  const {title, url, techs, likes = 0} = request.body;

  const repositorie = {id: uuid(), title, url, techs, likes};

  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title, url, techs, likes = 0} = request.body;

  const repositorieindex = repositories.findIndex(repositorie => repositorie.id == id);

  if (repositorieindex < 0) {
      return response.status(400).json({error: "Repositorie not found!"});
  }

  const repositorie = {
      id,
      title,
      url,
      techs,
      likes
  };

  repositories[repositorieindex] = repositorie;

  return response.json(repositorie);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositorieindex = repositories.findIndex(repositorie => repositorie.id == id);

  if (repositorieindex < 0) {
      return response.status(400).json({error: "Repositorie not found!"});
  }
  
  repositories.splice(repositorieindex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositorieindex = repositories.findIndex(repositorie => repositorie.id == id);

  if (repositorieindex < 0) {
    return response.status(400).json({error: "Repositorie not found!"});
  }

  repositories[repositorieindex].likes = ++1;

  return response.json(repositories[repositorieindex]);

});

module.exports = app;
