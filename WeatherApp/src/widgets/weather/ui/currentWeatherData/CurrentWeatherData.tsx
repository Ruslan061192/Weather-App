import { useWeatherStore } from "../../../../shared/store/useWeatherStore";
import CurrentWeatherDataContainer from "../currentWeatherDataContainer/CurrentWeatherDataContainer";

export function CurrentWeatherData() {
  const { currentWeather } = useWeatherStore();

  const textStateWeather = currentWeather
    ? currentWeather.current.condition.text
    : "Loading... ";

  const dayTemp = currentWeather ?
                  currentWeather?.forecast?.forecastday.map((el) => el.day)
                  : null

  const humadity = currentWeather?.current.humidity ?
                   currentWeather?.current.humidity :
                   0;
    
  const cloudy = currentWeather ? currentWeather.current.cloud : 0;
  
  const maxTempC = dayTemp ? Math.max(...dayTemp?.map((el) => el.maxtemp_c)) : 0;
  const minTempC = dayTemp ? Math.min(...dayTemp?.map((el) => el.mintemp_c)) : 0;

  const windKph = currentWeather?.current?.wind_kph
    ? currentWeather.current.wind_kph
    : 0;

  return (
    <>
      <CurrentWeatherDataContainer
        textStateWeather={textStateWeather}
        cloudy={cloudy}
        maxTempC={maxTempC}
        minTempC={minTempC}
        windKph={windKph}
        humadity={humadity}
      />
    </>
  );
}
