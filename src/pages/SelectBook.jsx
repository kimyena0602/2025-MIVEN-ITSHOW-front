import React from "react";
import Nav from "../components/Nav";
import styles from "../styles/selectbook.module.css";

// 이미지 import
import img1 from "../assets/images/selectbook1.png";
import img2 from "../assets/images/selectbook2.png";
import img3 from "../assets/images/selectbook3.png";
import img7 from "../assets/images/newpage.png";
import img4 from "../assets/images/selectbook4.png";
import img5 from "../assets/images/selectbook5.png";
import img6 from "../assets/images/selectbook6.png";

export default function SelectBook() {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.gallery}>
        <img src={img1} className={`${styles.image} ${styles.sizeXS}`} alt="book1" />
        <img src={img2} className={`${styles.image} ${styles.sizeS}`} alt="book2" />
        <img src={img3} className={`${styles.image} ${styles.sizeM}`} alt="book3" />
        
        <div className={styles.newPage}>
          <div className={styles.plus}>＋</div>
          <div className={styles.text}>new<br />page</div>
        </div>

        <img src={img4} className={`${styles.image} ${styles.sizeM}`} alt="book4" />
        <img src={img5} className={`${styles.image} ${styles.sizeS}`} alt="book5" />
        <img src={img6} className={`${styles.image} ${styles.sizeXS}`} alt="book6" />
      </div>
    </div>
  );
}
