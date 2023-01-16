import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import cors from "cors";
import express from "express";
import { getLogger } from "log4js";
import ProductsHttp from "@Modules/Products/Infra/Http/Routes/index.routes";
import apiConfig from "@Shared/Config/apiConfig";
import TypeORM from "../TypeORM";
import Injections from "../Injections";

const logger = getLogger("server");

const main = async (): Promise<void> => {
  const typeORM = new TypeORM();
  await typeORM.setup();

  const injections = new Injections();
  injections.register();

  const app = express();

  app.use(cors());
  app.use(express.json());

  const productsHttp = new ProductsHttp();
  app.use("/products", productsHttp.register());

  app.listen(apiConfig.port, () => {
    logger.debug(`Server running under http://localhost:${apiConfig.port}`);
  });
};

main();
