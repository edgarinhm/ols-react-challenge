import { WeatherModel } from "common/models/weather-model";
import { GetWeatherByCity } from "common/services/weather-service";
import { useEffect, useState } from "react";
import { Spinner } from "common/components/spinner/spinner";
import { GetWeatherIcon } from "common/functions/weather-functions";
import Card from "common/components/card/card";

const Weather = (): JSX.Element => {
  const [weather, setWeather] = useState<WeatherModel>();

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const data = await GetWeatherByCity("Cali");
        setWeather(data);
      } catch (error) {
        console.log("error");
      }
    };
    loadWeatherData();
  }, []);

  const weatherCondition = weather?.list[0].weather[0].main;
  const weatherCity = weather?.list[0].name;

  return (
    <Card width={"100%"}>
      <Card.Header title={`WEATHER: ${weatherCity ?? ""}, ${weatherCondition ?? ""}`} />
      <div>
        <img
          src={GetWeatherIcon(`${weatherCondition?.toLowerCase()}`)}
          loading="lazy"
          alt={"Wheater Condition"}
        />
      </div>
      <Spinner show={!weatherCondition} overlay="Component" />
    </Card>
  );
};

export default Weather;
