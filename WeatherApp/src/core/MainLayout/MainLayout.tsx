import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router";


import styles from "./MainLayout.module.scss";

import { useWeatherStore } from "../../shared/store/useWeatherStore";
import { calcWeatherBackground } from "../../widgets/weather/helpers/calcWeatherBackgound";
import { useUsersStore } from "../../shared/store/useUsersStore";
import Spinner from "../../shared/ui/loaders/loadPageSpinner/Spinner";

export function MainLayout() {
  const { coords, currentWeather, getWeather, getCurrentCoords, isLoading,  } =
    useWeatherStore();

  const { getUser, userProfile } = useUsersStore();
  const weatherCode = !currentWeather
    ? undefined
    : currentWeather?.current?.condition.code;

  const weatherBackground = calcWeatherBackground(weatherCode);


  useEffect(() => {
    if (!userProfile) {
      getUser();
    }
    if (!currentWeather) {
      if (coords.lat && coords.lon) {
        getWeather(coords.lat, coords.lon);
      } else {
        getCurrentCoords();
      }
    }
  }, [
    currentWeather,
    coords.lon,
    coords.lat,
    getCurrentCoords,
    getWeather,
    getUser,
  ]);

  const mainContainerClasses = `${styles.mainContainer} ${weatherBackground ? styles[weatherBackground] : ""}`

  // console.log("MainLayout isLoading:", isLoading, currentWeather, userProfile);
  
  return (
    <div className={styles.mainWrap}>
      <Suspense fallback={<Spinner />}>
      {/* {isLoading ?  */}
        {/* <Spinner /> : */}
        <div className={mainContainerClasses}>
          <Outlet />
        </div>
        {/* } */}
      </Suspense>
    </div>
  );
}




