import { container } from "tsyringe";
import CityRepository from "../TypeORM/Repositories/CityRepository";
import ICityRepository from "@Modules/Products/Repositories/ICityRepository";

class CityInjections {
  public register(): void {
    container.registerSingleton<ICityRepository>(
      "CityRepository",
      CityRepository
    );
  }
}

export default CityInjections;
