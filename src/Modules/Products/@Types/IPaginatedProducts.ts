import Product from "../Infra/TypeORM/Entities/product.entity";

interface IPaginatedProducts {
  products: Product[];
  total: number;
}

export default IPaginatedProducts;
