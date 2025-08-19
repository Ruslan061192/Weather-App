import { Outlet } from "react-router";
import styles from "../App/styles/App.module.css";
import { useEffect } from "react";
import { useWeatherStore } from "../core/store/useWeatherStore";
import { calcWeatherBackground } from "../core/utils/calcWeatherBackgound";
import { useUsersStore } from "../core/store/useUsersStore";
import Spinner from "../components/ui/loadPageSpinner/Spinner";

function App() {
  const { coords, currentWeather, getWeather, getCurrentCoords, isLoading, isError } =
  useWeatherStore();
  const { getUser } = useUsersStore();
  const weatherCode = !currentWeather
  ? undefined
  : currentWeather?.current?.condition.code;
  
  const weatherBackground = calcWeatherBackground(weatherCode);

  useEffect(() => {
    getUser();
    if (coords.lat && coords.lon) {
      getWeather(coords.lat, coords.lon);
    } else {
      getCurrentCoords();
          console.log("A");

    }
  }, [
    coords.lat,
    coords.lon,
    getCurrentCoords,
    getWeather,
    currentWeather,
    getUser,
  ]);

  console.log(isError)

  return (
    <div className={styles.mainWrap}>
      {!isLoading ? (
        <div
          className={`${styles.mainContainer} ${
            styles[!weatherBackground ? "" : weatherBackground]
          }`}
        >
          <Outlet />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default App;
