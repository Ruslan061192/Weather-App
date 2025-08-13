import { formatWeatherDate } from "../../helpers/formatWeatherDate";
import { useWeatherStore } from "../../../../shared/store/useWeatherStore";
import styles from "././styles/index.module.scss";
import { calcWeatherIcons } from "../hourlyWeatherCards/helpers/calcTime";

export default function MainWeatherView() {
  const { currentWeather } = useWeatherStore();
  const temp = !currentWeather ? 0 : currentWeather?.current.temp_c;
  const location = !currentWeather
    ? "loading..."
    : currentWeather?.location.name;
  const dateDisplay = formatWeatherDate(currentWeather?.location.localtime);
  const weatherCode = currentWeather?.current.condition.code;
  const weatherIcons = calcWeatherIcons(weatherCode);

  return (
    <div className={styles.container}>
      <div className={styles.temp}>
        <span>
          {Math.floor(temp)}
          {"\u00b0"}
        </span>
      </div>
      <div className={styles.locationAndDate}>
        <span className={styles.location}>{location}</span>
        <span className={styles.dateNow}>{dateDisplay}</span>
      </div>
      <div className={styles.weatherIcon}>
        <img src={weatherIcons} />
      </div>
    </div>
  );
}
