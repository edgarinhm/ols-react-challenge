import ClearImg from "/clear.png";
import CloudsImg from "/clouds.png";
import FogImg from "/fog.png";
import RainImg from "/rain.png";
export const GetWeatherIcon = (condition: string): string => {
  switch (condition) {
    case "clear":
      return ClearImg;
    case "clouds":
      return CloudsImg;
    case "fog":
      return FogImg;
    case "rain":
      return RainImg;
    default:
      return CloudsImg;
  }
};
