import express from "express";

const app = express();

app.get("/users", (request, response) => {
  response.send({ name: "ednilson" });
});

app.listen(3333);
