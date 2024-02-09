import { type Application } from "express";
import path from "path";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const setupSwagger = (app: Application): void => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Book Store Backend Service",
        version: "1.0.0",
        description:
          "This API's are prepared for an bookstore assignment to hyperhire",
      },
      servers: [
        {
          url: "http://localhost:8000",
        },
      ],
    },
    apis: [
      path.resolve(__dirname, "controller", "index.ts"),
      path.resolve(__dirname, "api", "routes", "employees.routes.ts"),
    ],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
