import styles from "./styles/index.module.css";

interface ISearchCiityForm {
  value: string;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsOpen: (isOpen: boolean) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchCiityForm({
  value,
  handleSubmit,
  handleChange,
  setIsOpen,
  handleKeyDown,
}: ISearchCiityForm) {
  return (
    <form onSubmit={handleSubmit} className={styles.serchForm}>
      <input
        type="text"
        value={value}
        placeholder="Search Location..."
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">
        <img src="/icons/searchIcon.svg" alt="search icon" />
      </button>
    </form>
  );
}
