import { useWeatherStore } from "../../../core/store/useWeatherStore";
import GeneralDataContainer from "../../ui/generalDataContainer/GeneralDataContainer";

export function GeneralData() {
  const { currentWeather } = useWeatherStore();

  currentWeather?.forecast?.forecastday.map((el) => el.day);

  const textStateWeather = currentWeather
    ? currentWeather.current.condition.text
    : "Loading... ";

  const dayTemp = !currentWeather
    ? null
    : currentWeather?.forecast?.forecastday.map((el) => el.day);

  const humadity = currentWeather?.current.humidity
    ? currentWeather?.current.humidity
    : 0;
  const cloudy = currentWeather ? currentWeather.current.cloud : 0;
  const maxTempC = dayTemp ? dayTemp?.map((el) => el.maxtemp_c) : null;
  const minTempC = dayTemp ? dayTemp?.map((el) => el.mintemp_c) : null;
  const windKph = currentWeather?.current.wind_kph
    ? currentWeather.current.wind_kph
    : 0;

  return (
    <>
      <GeneralDataContainer
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
