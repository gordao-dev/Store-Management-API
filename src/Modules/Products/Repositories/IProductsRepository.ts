import ICreateProduct from "../@Types/ICreateProduct";
import IFilterProducts from "../@Types/IFilterProducts";
import IPaginatedProducts from "../@Types/IPaginatedProducts";
import IUpdateProduct from "../@Types/IUpdateProduct";
import Product from "../Infra/TypeORM/Entities/product.entity";

interface IProductsRepository {
  findOne(filter: IFilterProduct): Promise<Product | undefined>;
  find(filter: IFilterProducts): Promise<IPaginatedProducts>;
  create(data: ICreateProduct): Promise<Product>;
  save(product: Product): Promise<Product>;
  update(data: IUpdateProduct): Promise<Product>;
  delete(id: number): Promise<void>;
}

export default IProductsRepository;
