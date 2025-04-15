import React from "react";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  return (
    <div>
      <div className={styles.Gradation}></div>
      <div className={styles.Allnavcontainer}>
        <div className={styles.Logo}>
          <p className={styles.Clicklogo}>LOGO</p>
        </div>
        <div className={styles.Navdetail}>
          <div className={styles.Navfirstline}>
            <p className={`${styles.Clickhome} ${styles.Clicknav}`}>Home</p>
            <p className={`${styles.Clickbookgallery} ${styles.Clicknav}`}>
              Book Gallery
            </p>
          </div>
          <div className={styles.Navsecondline}>
            <p className={`${styles.Clickwrite} ${styles.Clicknav}`}>Write</p>
            <p className={`${styles.Clickmypage} ${styles.Clicknav}`}>
              My Page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
