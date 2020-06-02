import express from "express";

const routes = express.Router();

routes.get("/users", (request, response) => {
  return response.json({ name: "ednilson" });
});

export default routes;
