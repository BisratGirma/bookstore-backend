import express from "express";

import routes from "./controller";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
