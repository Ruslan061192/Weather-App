import styles from "./styles/Index.module.css";
import DetailsPanel from "../../components/shared/detailsPanel/DetailsPanel ";
import MainWeatherView from "../../components/shared/mainWeatherView/MainWeatherView ";
import AccordeonMenu from "../../components/shared/accordeonMenu/AccordeonMenu";
import { useWeatherStore } from "../../core/store/useWeatherStore";
import SearchCity from "../../components/shared/serchCity/SearchCity";

export default function HomePage(): JSX.Element {
  const { isError } = useWeatherStore();

  return (
    <div className={styles.homePageWrap}>
      {isError ? (
        <div>{isError}</div>
      ) : (
        <div className={styles.homeContainer}>
          <AccordeonMenu />
          <SearchCity />
          <MainWeatherView />
          <DetailsPanel />
        </div>
      )}
    </div>
  );
}
