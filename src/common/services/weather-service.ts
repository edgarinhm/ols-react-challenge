import { WeatherApiKey } from "common/constants/weather-api-key-constant";
import { WeatherFind } from "./api/api-routes";
import { axiosInstance } from "./api/api-base";
import { WeatherModel } from "common/models/weather-model";

export const GetWeatherByCity = async (city: string): Promise<WeatherModel> => {
  const url = WeatherFind.get();
  return (await axiosInstance.get<WeatherModel>(url, { params: { q: city, appid: WeatherApiKey } }))
    .data;
};
