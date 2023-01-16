import { inject, injectable } from "tsyringe";

import IProductsRepository from "../Repositories/IProductsRepository";
import Product from "../Infra/TypeORM/Entities/product.entity";

interface IRequest {
  id: string;
}

interface IResponse {
  product: Product;
}

@injectable()
class ShowProductService {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const product = await this.productsRepository.findOne({ id });

    return {
      product,
    };
  }
}

export default ShowProductService;
