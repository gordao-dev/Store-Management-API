import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { RequiredNumber } from "@Shared/Infra/Http/Validators/Joi";
import CityControllers from "../Controllers/City.controllers";

class CityRoutes {
  public register(): Router {
    // Routes
    const cityRoutes = Router();

    // Controllers
    const cityController = new CityControllers();

    cityRoutes.get(
      "/:id",
      celebrate({
        [Segments.PARAMS]: {
          id: RequiredNumber,
        },
      }),
      cityController.get
    );
    return cityRoutes;
  }
}

export default CityRoutes;
