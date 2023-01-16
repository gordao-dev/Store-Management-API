import { inject, injectable } from "tsyringe";

import HttpError from "@Shared/Infra/Http/Errors/HttpError";
import IProductsRepository from "../Repositories/IProductsRepository";
import Product from "../Infra/TypeORM/Entities/product.entity";
import IUpdateProduct from "../@Types/IUpdateProduct";
import { Joi } from "celebrate";

interface IRequest {
  actor: Product;
  data: IUpdateProduct;
}

interface IResponse {
  product: Product;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    data: { id, name, category, quantity },
  }: IRequest): Promise<IResponse> {
    const product = await this.productsRepository.findOne({
      id,
    });
    if (!product) {
      throw new HttpError("Produto não encontrado", 404);
    }

    const nameProductInUse = await this.productsRepository.findOne({
      name,
    });
    if (nameProductInUse && nameProductInUse.id !== product.id) {
      throw new HttpError("Produto já existente com esse nome!");
    }

    product.name = name;
    product.category = category;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    return {
      product,
    };
  }
}

export default UpdateProductService;
