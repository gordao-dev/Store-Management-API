import ICreateProduct from "@Modules/Products/@Types/ICreateProduct";
import IFilterProducts from "@Modules/Products/@Types/IFilterProducts";
import IPaginatedProducts from "@Modules/Products/@Types/IPaginatedProducts";
import IUpdateProduct from "@Modules/Products/@Types/IUpdateProduct";
import IProductsRepository from "@Modules/Products/Repositories/IProductsRepository";
import offsetPaginationConfig from "@Shared/Config/offsetPaginationConfig";
import { EntityRepository, getRepository, Repository } from "typeorm";
import Product from "../Entities/product.entity";

@EntityRepository(Product)
class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public create = async (data: ICreateProduct): Promise<Product> => {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product);
    return product;
  };

  public findOne = async (
    filter: IFilterProducts
  ): Promise<Product | undefined> => {
    const product = await this.ormRepository.findOne({
      where: filter,
    });

    return product;
  };

  public async find({
    page = offsetPaginationConfig.minPage,
    limit = offsetPaginationConfig.maxLimit,
    orderBy,
    ...where
  }: IFilterProducts): Promise<IPaginatedProducts> {
    const [products, total] = await this.ormRepository.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [orderBy || "createdAt"]: "DESC",
      },
    });

    return {
      products,
      total,
    };
  }

  public update = async ({
    product,
  }: IUpdateProduct): Promise<Product | null> => {
    await this.ormRepository.manager.transaction(async (entityManager) => {
      var { product } = product;

      await entityManager.save(product);
    });

    return product;
  };

  public save = async (product: Product): Promise<Product> => {
    await this.ormRepository.save(product);
    return product;
  };

  public delete = async (id: number): Promise<void> => {
    await this.ormRepository.delete(id);
  };
}

export default ProductsRepository;
