import { WeatherModel } from "common/models/weather-model";
import { GetWeatherByCity } from "common/services/weather-service";
import { useEffect, useState } from "react";
import styles from "./weather.module.scss";

const Weather = (): JSX.Element => {
  const [weather, setWeather] = useState<WeatherModel>();

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const data = await GetWeatherByCity("Cali");
        setWeather(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadWeatherData();
  }, []);

  const weatherCondition = weather?.list[0].weather[0].main;
  const weatherCity = weather?.list[0].name;

  return (
    <div className={styles.weather}>
      {"WEATHER: "}
      {`${weatherCity}, ${weatherCondition}`}
      <div>
        <img src={`/${weatherCondition?.toLowerCase()}.png`} alt="Wheater Condition" />
      </div>
    </div>
  );
};

export default Weather;
