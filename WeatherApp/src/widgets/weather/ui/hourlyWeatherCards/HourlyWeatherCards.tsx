import { useWeatherStore } from "../../../../shared/store/useWeatherStore";
import styles from "././styles/index.module.scss";
import { calcTime } from "./helpers/calcTime";

export default function HourlyWeatherCards() {
  const { currentWeather } = useWeatherStore();

  const hoursArray = currentWeather?.forecast?.forecastday;
  
  const hours = hoursArray?.map((el) => el.hour?.map((el) => el));

  return (
    <div className={styles.wrap}>
      <span className={styles.weatherTitle}>Today's Weather Forecast...</span>
      {hours?.map((hourArray, index) => (
        <div key={index} className={styles.weatherCards}>
          
          {hourArray.map((hour, idx) => {
            
            const { changeIcon, formattedTime } = calcTime(hour.time, hour.condition.code);

              return (
              <div key={idx} className={styles.weatherCard}>
                <div className={styles.weatherIcon}>
                  <img src={changeIcon} alt="" />
                </div>
                <div className={styles.descriptionBlock}>
                  <span className={styles.time}>{formattedTime}</span>
                  <span className={styles.description}>
                    {hour.condition.text}
                  </span>
                </div>
                <span className={styles.infoTemp}>
                  {Math.floor(hour.temp_c)}
                  {"\u00b0"}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
