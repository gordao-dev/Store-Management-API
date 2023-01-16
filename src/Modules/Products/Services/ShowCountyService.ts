import { inject, injectable } from "tsyringe";

import CityEntity from "../Infra/TypeORM/Entities/city.entity";
import axios from "axios";
import ICreateCity from "../@Types/ICreateCity";
import HttpError from "@Shared/Infra/Http/Errors/HttpError";
import ICityRepository from "../Repositories/ICityRepository";
import City from "../@Types/ICity";

interface IRequest {
  id: string;
  name: string;
}

interface IResponse {
  city: CityEntity;
}

@injectable()
class ShowCityService {
  constructor(
    @inject("CityRepository")
    private cityRepository: ICityRepository
  ) {}

  public async execute(id: number): Promise<IResponse> {
    const response = await axios.get<City[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios"
    );

    const cities = response.data;

    const cityExists = cities.find((city) => city.id === id);

    if (!cityExists) {
      throw new HttpError("Cidade não encontrada no IBGE!", 404);
    }

    const existingCityInDB = await this.cityRepository.findOne({
      externalId: id,
    });

    if (existingCityInDB) {
      return { city: existingCityInDB };
    }

    const cityNotExisting = await this.cityRepository.create({
      externalId: cityExists.id,
      name: cityExists.nome,
    });

    return {
      city: cityNotExisting,
    };
  }
}

export default ShowCityService;
