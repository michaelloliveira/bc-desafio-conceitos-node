const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
/**
 * List repositories
 */
app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

/**
 * save new repositorie
 * body json 
 * { 
 * title String
 * url String
 * techs array of String
 * }
 */
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repositorie)

  return response.json(repositorie)

});

/**
 * update repositorie
 * param uuid
 * body json 
 * { 
 * title String
 * url String
 * techs array of String
 * }
 */
app.put("/repositories/:id", (request, response) => {

  const { id } = request.params
  const { title, url, techs } = request.body

  const index = repositories.findIndex(rep => rep.id === id);

  if (index < 0) {
    return response.status(400).json({ erro: "repositorie not found" })
  }

  const repositorie = {
    id: repositories[index].id,
    title,
    url,
    techs,
    likes: repositories[index].likes
  }

  repositories[index] = repositorie

  return response.json(repositorie)

});
/**
 * delete a repositorie
 * param uuid
 */
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const index = repositories.findIndex(rep => rep.id === id);

  if (index < 0) {
    return response.status(400).json({ erro: "repositorie not found" })
  }

  repositories.splice(index, 1)

  return response.status(204).send()
});

/**
 * increase 1 like a repositorie by requisition
 * param uuid
 */
app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params

  const index = repositories.findIndex(rep => rep.id === id);

  if (index < 0) {
    return response.status(400).json({ erro: "Repositorie not found" })
  }

  repositories[index].likes++

  return response.json(repositories[index])

});

module.exports = app;
