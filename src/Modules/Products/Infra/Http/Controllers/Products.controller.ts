import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import CreateProductService from "@Modules/Products/Services/CreateProductService";
import DeleteProductService from "@Modules/Products/Services/DeleteProductService";
import UpdateProductService from "@Modules/Products/Services/UpdateProductService";
import ShowProductService from "@Modules/Products/Services/ShowProductService";
import ShowCityService from "@Modules/Products/Services/ShowCountyService";
class ProductsControllers {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction
  ): Promise<Response> {
    const { body } = request;

    const createProductService = container.resolve(CreateProductService);

    const result = await createProductService.execute(body);

    return response.status(200).json(result);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { params } = request;

    const showProductService = container.resolve(ShowProductService);

    const result = await showProductService.execute({
      id: params.id,
    });

    return response.status(200).json(result);
  }

  public async update(
    request: Request,
    response: Response,
    _: NextFunction
  ): Promise<Response> {
    const { body, params, body: actor } = request;

    const updateProductService = container.resolve(UpdateProductService);

    const product = await updateProductService.execute({
      actor,
      data: {
        id: params.id,
        ...body,
      },
    });

    return response.status(200).json(product);
  }

  public async delete(
    request: Request,
    response: Response,
    _: NextFunction
  ): Promise<Response> {
    const { params } = request;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({
      id: params.id,
    });

    return response.status(204).json();
  }

  public async get(
    request: Request,
    response: Response,
    _: NextFunction
  ): Promise<Response> {
    const { params } = request;

    const showCoutiesService = container.resolve(ShowCityService);

    await showCoutiesService.execute(Number(params.id));

    return response.status(204).json();
  }
}

export default ProductsControllers;
