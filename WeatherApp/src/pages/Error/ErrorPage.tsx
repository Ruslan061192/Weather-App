import styles from "./styles/index.module.scss";

export default function ErrorPage() {
  return (
    <div className={styles.pageWrap}>
      <h1 className={styles.errorTitle}>Is Error page!</h1>
    </div>
  );
}
