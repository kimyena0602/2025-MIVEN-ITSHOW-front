import React from "react";
import Nav from "../components/Nav";
import styles from "../styles/MyPageHeader.module.css";
import MypageImg from "../assets/images/Mypagepicture.png";
import { FaUserFriends } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

export default function MyPageHeader() {
  return (
    <div className={styles.wrapper}>
      <Nav />
      <div className={styles.container}>
        <img src={MypageImg} alt="프로필" className={styles.profileImage} />
        <div className={styles.infoSection}>
          <div className={styles.nameRow}>
            <span className={styles.username}>미벤</span>
            <span className={styles.subtext}>작성한 구절 24개</span>
          </div>

          {/* 👇 새롭게 묶은 하단 섹션 */}
          <div className={styles.lowerSection}>
            <div className={styles.quoteBox}>
              <h3 className={styles.quoteTitle}>언어의 온도</h3>
              <p className={styles.quoteText}>
                흔히들 말한다. 상대가 원하는 걸 해주는 것이 사랑이라고, 하지만
                그건 작은 사랑일지도 모른다. <br /> 상대가 싫어하는 걸 하지 않는
                것이야말로 큰 사랑이 아닐까.
              </p>
            </div>

            <div className={styles.actionSection}>
              <div className={styles.buttons}>
                <button className={styles.btn}>
                  <FiSettings className={styles.icon} />
                  프로필 편집
                </button>
                <button className={styles.btn}>
                  <FaUserFriends className={styles.icon} />
                  친구
                </button>
              </div>
              <div className={styles.music}>
                <FaPlay className={styles.playIcon} />
                <span className={styles.songnameartist}>
                  <p className={styles.songname}>Island In The Sun</p>{" "}
                  <span className={styles.artist}>Weezer</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
