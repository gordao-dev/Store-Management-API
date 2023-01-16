import ICreateCity from "@Modules/Products/@Types/ICreateCity";
import IFilterCity from "@Modules/Products/@Types/IFilterCity";
import ICityRepository from "@Modules/Products/Repositories/ICityRepository";
import { EntityRepository, getRepository, Repository } from "typeorm";
import City from "../Entities/city.entity";

@EntityRepository(City)
class CityRepository implements ICityRepository {
  private ormRepository: Repository<City>;

  constructor() {
    this.ormRepository = getRepository(City);
  }

  public create = async (data: ICreateCity): Promise<City> => {
    const city = this.ormRepository.create(data);
    await this.ormRepository.save(city);
    return city;
  };

  public findOne = async (filter: IFilterCity): Promise<City | undefined> => {
    const city = await this.ormRepository.findOne({
      where: filter,
    });

    return city;
  };
}

export default CityRepository;
