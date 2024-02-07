import express, { NextFunction, Request, Response } from "express";
import db from "./repository/db";
import routes from "./controller";

db.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("database connection error: " + err.message));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(500).json({
    error: "Internal Server Error",
  });
  return;
});
app.use(routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
