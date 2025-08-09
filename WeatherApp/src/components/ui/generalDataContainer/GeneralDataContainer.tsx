import styles from "./styles/index.module.css";

interface IGeneralDataContainer {
  textStateWeather: string;
  maxTempC: number;
  minTempC: number;
  humadity: number;
  cloudy: number;
  windKph: number;
}

export default function GeneralDataContainer({
  textStateWeather,
  maxTempC,
  minTempC,
  humadity,
  cloudy,
  windKph,
}: IGeneralDataContainer) {
  return (
    <div className={styles.generalData}>
      <div className={styles.titleDescription}>
        <span>{textStateWeather}</span>
      </div>
      <div className={styles.dataRow}>
        <span>Temp max</span>
        <div>
          <span>
            {Math.floor(maxTempC)}
            {"\u00b0"}
          </span>
          <img src="../../../public/icons/maxTemp.svg" />
        </div>
      </div>
      <div className={styles.dataRow}>
        <span>Temp min</span>
        <div>
          <span>
            {" "}
            {Math.floor(minTempC)}
            {"\u00b0"}
          </span>
          <img src="../../../public/icons/minTemp.svg" />
        </div>
      </div>
      <div className={styles.dataRow}>
        <span>Humadity</span>
        <div>
          <span>{humadity}%</span>
          <img src="../../../public/icons/humadity.svg" />
        </div>
      </div>
      <div className={styles.dataRow}>
        <span>Cloudy</span>
        <div>
          <span>{cloudy}%</span>
          <img src="../../../public/icons/32_Broken-Cloudy.svg" />
        </div>
      </div>
      <div className={styles.dataRow}>
        <span>Wind</span>
        <div>
          <span>{windKph}km.h</span>
          <img src="../../../public/icons/wind.svg" />
        </div>
      </div>
    </div>
  );
}
