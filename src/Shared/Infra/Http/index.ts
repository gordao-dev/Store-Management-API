import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import cors from "cors";
import express from "express";
import { getLogger } from "log4js";
import apiConfig from "@Shared/Config/apiConfig";
import { errors as CelebrateErrors } from "celebrate";
import TypeORM from "../TypeORM";
import Injections from "../Injections";
import Http from "@Modules/Products/Infra/Http/Routes/index.routes";
import ErrorHandlerMiddleware from "./Middlewares/ErrorHandlerMiddleware";

const logger = getLogger("server");

const main = async (): Promise<void> => {
  const typeORM = new TypeORM();
  await typeORM.setup();

  const injections = new Injections();
  injections.register();

  const app = express();

  app.use(cors());
  app.use(express.json());

  const http = new Http();
  app.use("/", http.register());
  app.use(CelebrateErrors());
  app.use(ErrorHandlerMiddleware);

  app.listen(apiConfig.port, () => {
    logger.debug(`Server running under http://localhost:${apiConfig.port}`);
  });
};

main();
