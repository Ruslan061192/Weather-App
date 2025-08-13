import { useWeatherStore } from "../../../../shared/store/useWeatherStore";
import styles from "././styles/index.module.scss";

export default function HomeWeatherButton() {
  const { getCurrentCoords } = useWeatherStore();

  const handleGetWeatherHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getCurrentCoords();
  };
  
  return (
    <div className={styles.homeButtonContainer}>
      <div className={styles.buttonWrap}>
        <button className={styles.homeButton} onClick={handleGetWeatherHome}>
          <img src="/icons/Home.svg" alt="homeWeather" />
        </button>
      </div>
      <span className={styles.homeText}>Show home weather</span>
    </div>
  );
}
