import { inject, injectable } from "tsyringe";

import HttpError from "@Shared/Infra/Http/Errors/HttpError";
import Product from "../Infra/TypeORM/Entities/product.entity";
import ICreateProduct from "../@Types/ICreateProduct";
import IProductsRepository from "../Repositories/IProductsRepository";

interface IResponse {
  product: Product;
}

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute(data: ICreateProduct): Promise<IResponse> {
    const existingProduct = await this.productsRepository.findOne({
      name: data.name,
    });

    if (existingProduct) {
      throw new HttpError("Este produto já foi criado", 409);
    }

    const product = await this.productsRepository.create(data);

    return {
      product,
    };
  }
}

export default CreateProductService;
