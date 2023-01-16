import Product from "../Infra/TypeORM/Entities/product.entity";

interface IUpdateProduct {
  product: Product;
  id?: number;
  name?: string;
  quantity?: number;
  category?: string;
}

export default IUpdateProduct;
