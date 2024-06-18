import { WeatherModel } from "common/models/weather-model";
import { GetWeatherByCity } from "common/services/weather-service";
import { useEffect, useState } from "react";
import styles from "./weather.module.scss";
import { Spinner } from "common/components/spinner/spinner";

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
        <img
          src={`/${weatherCondition?.toLowerCase()}.png`}
          loading="lazy"
          alt="Wheater Condition"
        />
      </div>
      <Spinner show={!weatherCondition} overlay="Component" />
    </div>
  );
};

export default Weather;
