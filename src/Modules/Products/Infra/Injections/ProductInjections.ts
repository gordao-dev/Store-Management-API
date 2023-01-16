import { container } from "tsyringe";
import ProductsRepository from "../TypeORM/Repositories/ProductsRepository";
import IProductsRepository from "@Modules/Products/Repositories/IProductsRepository";

class ProductsInjections {
  public register(): void {
    container.registerSingleton<IProductsRepository>(
      "ProductsRepository",
      ProductsRepository
    );
  }
}

export default ProductsInjections;
