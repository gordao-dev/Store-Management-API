enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

interface ICreateProduct {
  name: string;
  category: string;
  status: ProductStatus;
  quantity: number;
}

export default ICreateProduct;
