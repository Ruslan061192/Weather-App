import styles from "././styles/authSpinner.module.css";

export default function AuthSpinner() {
  return (
    <div className={styles.spinnerWrap}>
      <span className={styles.spinner}></span>
    </div>
  );
}
