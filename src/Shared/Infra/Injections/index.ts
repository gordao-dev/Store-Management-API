import ProductsInjections from "@Modules/Products/Infra/Injections/ProductInjections";

class Injections {
  public register() {
    const productInjections = new ProductsInjections();
    productInjections.register();
  }
}

export default Injections;
