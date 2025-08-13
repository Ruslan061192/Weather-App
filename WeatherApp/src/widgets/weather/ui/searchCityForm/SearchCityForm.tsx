import { SVGIcon } from "../../../../shared/ui/svg-icon/SVGIcon";
import styles from "./styles/index.module.scss";

interface ISearchCityForm {
  value: string;
  handleOpen: () => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchCityForm({
  value,
  handleSubmit,
  handleChange,
  handleOpen,
  handleKeyDown,
}: ISearchCityForm) {

  console.log("SearchCityForm rendered", value);

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={value}
        placeholder="Search Location..."
        onFocus={handleOpen}
        onChange={(e) => {
          console.log('value:', e.target.value);
          handleChange(e)}
        }
        onKeyDown={handleKeyDown}
      />
      <button type="submit">
        <SVGIcon iconName="searchIcon"/>
        {/* <img src="/icons/searchIcon.svg" alt="search icon" /> */}
      </button>
    </form>
  );
}
