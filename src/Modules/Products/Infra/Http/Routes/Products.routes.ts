import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProductsControllers from "../Controllers/Products.controller";
import {
  OptinalLimit,
  OptinalPage,
  OptionalAnyString,
  OptionalNumber,
  RequiredAnyString,
  RequiredEnum,
  RequiredNumber,
  RequiredUUID,
} from "@Shared/Infra/Http/Validators/Joi";

class ProductsRoutes {
  public register(): Router {
    // Routes
    const productsRoutes = Router();

    // Controllers
    const producstController = new ProductsControllers();

    productsRoutes.get(
      "/:id",
      celebrate({
        [Segments.PARAMS]: {
          id: RequiredNumber,
        },
      }),
      producstController.show
    );

    productsRoutes.post(
      "/create",
      celebrate({
        [Segments.BODY]: {
          name: RequiredAnyString,
          category: RequiredAnyString,
          quantity: RequiredNumber,
          status: RequiredEnum,
        },
      }),
      producstController.create
    );

    productsRoutes.get(
      "/:id",
      celebrate({
        [Segments.BODY]: {
          id: RequiredNumber,
          name: RequiredAnyString,
        },
      }),
      producstController.show
    );

    productsRoutes.put(
      "/:id",
      celebrate({
        [Segments.PARAMS]: {
          id: Joi.number(),
        },
        [Segments.BODY]: {
          name: OptionalAnyString,
          category: OptionalAnyString,
          quantity: OptionalAnyString,
        },
      }),
      producstController.update
    );

    productsRoutes.delete(
      "/:id",
      celebrate({
        [Segments.PARAMS]: {
          id: Joi.number(),
        },
      }),
      producstController.delete
    );

    return productsRoutes;
  }
}

export default ProductsRoutes;
