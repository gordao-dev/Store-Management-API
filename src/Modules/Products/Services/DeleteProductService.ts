import { inject, injectable } from "tsyringe";

import HttpError from "@Shared/Infra/Http/Errors/HttpError";
import IProductsRepository from "../Repositories/IProductsRepository";
import { Joi } from "celebrate";

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findOne({
      id,
    });
    if (!product) {
      throw new HttpError("Produto não encontrado", 404);
    }

    await this.productsRepository.delete(product.id);
  }
}

export default DeleteProductService;
