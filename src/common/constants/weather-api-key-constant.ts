const { WeatherKey } = window["environment-config" as keyof typeof window] ?? {};
export const WeatherApiKey = import.meta.env.VITE_WEATHER_API_KEY ?? WeatherKey;
