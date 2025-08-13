import { SVGIcon } from "../../../../shared/ui/svg-icon/SVGIcon";
import styles from "./styles/index.module.scss";

interface ICurrentWeatherDataContainer {
  textStateWeather: string;
  maxTempC: number;
  minTempC: number;
  humadity: number;
  cloudy: number;
  windKph: number;
}

export default function CurrentWeatherDataContainer({
  textStateWeather,
  maxTempC,
  minTempC,
  humadity,
  cloudy,
  windKph,
}: ICurrentWeatherDataContainer) {

  const rows = [
    { label: "Temp max", value: Math.floor(maxTempC), iconName: "maxTemp" },
    { label: "Temp min", value: Math.floor(minTempC), iconName: "minTemp" },
    { label: "Humadity", value: `${humadity}%`, iconName: "humadity" },
    { label: "Cloudy", value: `${cloudy}%`, iconName: "32_Broken-Cloudy" },
    { label: "Wind", value: `${windKph}km.h`, iconName: "wind" },
  ];

  return (
    <div className={styles.currentWeatherData}>
      <div className={styles.titleDescription}>
        <span>{textStateWeather}</span>
      </div>

      {rows.map((row, index) => (
        <div className={styles.dataRow} key={row.label + index}>
          <span>{row.label}</span>
          <div>
            <span>
              {row.value}
              {"\u00b0"}</span>
            <SVGIcon iconName={row.iconName} />
          </div>
        </div>
      ))}
    </div>
  );
}
