import { GeneralData } from "../generalData/GeneralData";
import HourlyWeatherCards from "../../ui/hourlyWeather/HourlyWeatherCards";
import styles from "././styles/index.module.css";

export default function DetailsPanel() {
  return (
    <div className={styles.detailsPanel}>
      <span className={styles.staticTextContainer}>Weather Details...</span>
      <div className={styles.detailsContainer}>
        <GeneralData />
        <HourlyWeatherCards />
      </div>
    </div>
  );
}
