import { baseUrl, searchContryEndpoint } from "../constants/urls";
import IUniversity from "../models/IUniversity";

const searchByCountry = async (country: string): Promise<IUniversity[]> => {
  const response = await fetch(baseUrl + searchContryEndpoint + country);
  return await response.json();
};

export default searchByCountry;
