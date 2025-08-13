import styles from "././styles/authSpinner.module.scss";

export default function AuthSpinner() {
  return (
    <div className={styles.spinnerWrap}>
      <span className={styles.spinner}></span>
    </div>
  );
}
