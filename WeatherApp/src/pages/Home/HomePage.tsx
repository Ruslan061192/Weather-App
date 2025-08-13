import styles from "./styles/Index.module.scss";
import DetailsWeatherPanel from "../../widgets/weather/detailsWeatherPanel/DetailsWeatherPanel";
import MainWeatherView from "../../widgets/weather/ui/mainWeatherView/MainWeatherView";
import AccordeonMenu from "../../shared/ui/accordeonMenu/AccordeonMenu";
import { useWeatherStore } from "../../shared/store/useWeatherStore";
import SearchCity from "../../widgets/weather/ui/searchCity/SearchCity";

export default function HomePage(): JSX.Element {
  const { isError } = useWeatherStore();

  // console.log("HomePage isError:", isError);

  return (
    <div className={styles.homePageWrap}>
      {isError ? (
        <div>{isError}</div>
      ) : (
        <div className={styles.homeContainer}>
          <AccordeonMenu />
          <SearchCity />
          <MainWeatherView />
          <DetailsWeatherPanel />
        </div>
      )}
    </div>
  );
}


