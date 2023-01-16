import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import ShowCityService from "@Modules/Products/Services/ShowCountyService";
class CityControllers {
  public async get(
    request: Request,
    response: Response,
    _: NextFunction
  ): Promise<Response> {
    const { params } = request;

    const showCoutiesService = container.resolve(ShowCityService);

    const city = await showCoutiesService.execute(Number(params.id));

    return response.status(200).json(city);
  }
}

export default CityControllers;
