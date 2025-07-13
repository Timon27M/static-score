import styles from "./page.module.css";
import Main from "./Main";
export default function Home() {
  return (
    <div className={styles.page}>
      <Main />
    </div>
  );
}
