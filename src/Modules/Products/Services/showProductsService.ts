import { inject, injectable } from "tsyringe";

import IProductsRepository from "../Repositories/IProductsRepository";
import Product from "../Infra/TypeORM/Entities/product.entity";

interface IResponse {
  product: Product;
}

@injectable()
class ShowProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductsRepository
  ) {}

  public async execute(): Promise<IResponse> {
    const product = await this.productRepository.find({});

    return {
      product,
    };
  }
}

export default ShowProductService;
