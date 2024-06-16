import { WeatherConditionType } from "common/enums/weather-condition-type";

export interface WeatherModel {
  message: string;
  cod: string;
  count: number;
  list: [
    {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      weather: [
        {
          id: number;
          main: WeatherConditionType;
          description: string;
          icon: string;
        },
      ];
    },
  ];
}
