import styles from "././styles/index.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <span className={styles.spinner}></span>
      <span className={styles.spinnerText}>Loading...</span>
    </div>
  );
}
