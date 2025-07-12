import styles from "./page.module.css";
import Component from "./component";
export default function Home() {
  return (
    <div className={styles.page}>
      <Component />
    </div>
  );
}
