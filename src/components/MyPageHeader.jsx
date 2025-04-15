import react, { useState } from "react";
import Nav from "./Nav";
import styles from "../styles/MyPage.module.css";

import MypageImg from "../assets/images/Mypagepicture.png";

export default function MyPageHeader() {
  return (
    <div>
      <Nav />
      <div className={styles.Mypageprofile}>
        <div className={styles.Mypagepicture}>
          <img
            className={styles.picture}
            src={MypageImg}
            alt="프로필 이미지입니다."
          />
        </div>
        <div className={styles.Mypagewrite}>
          <div className={styles.Mpwname}></div>
          <div className={styles.Mpwmessage}></div>
        </div>
        <div className={styles.Mypageedit}>
          <div className={styles.Mpefriend}></div>
          <div className={styles.Mpemusic}></div>
        </div>
      </div>
    </div>
  );
}
