import { CurrentWeatherData } from "../ui/currentWeatherData/CurrentWeatherData";
import HourlyWeatherCards from "../ui/hourlyWeatherCards/HourlyWeatherCards";
import styles from "././styles/index.module.scss";

export default function DetailsWeatherPanel() {
  return (
    <div className={styles.detailsWeatherPanel}>
      <span className={styles.staticTextContainer}>Weather Details...</span>
      <div className={styles.detailsWeatherContainer}>
        <CurrentWeatherData />
        <HourlyWeatherCards />
      </div>
    </div>
  );
}
