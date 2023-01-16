import ICreateCity from "../@Types/ICreateCity";
import IFilterCity from "../@Types/IFilterCity";
import City from "../Infra/TypeORM/Entities/city.entity";

interface ICityRepository {
  findOne(filter: IFilterCity): Promise<City | undefined>;
  create(data: ICreateCity): Promise<City>;
}

export default ICityRepository;
