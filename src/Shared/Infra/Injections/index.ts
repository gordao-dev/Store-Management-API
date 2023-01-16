import CityInjections from "@Modules/Products/Infra/Injections/CityInjections";
import ProductsInjections from "@Modules/Products/Infra/Injections/ProductInjections";

class Injections {
  public register() {
    const productInjections = new ProductsInjections();
    productInjections.register();

    const cityInjections = new CityInjections();
    cityInjections.register();
  }
}

export default Injections;
