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

app.use(routes);

app.use(function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
  return;
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
