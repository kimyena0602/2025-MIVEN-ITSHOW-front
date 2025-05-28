import React, { useEffect, useState } from "react";
import MyPageHeader from "./MyPageHeader";
import styles from "../styles/MyPageBody.module.css";
import "../global.css";

export default function MyPageBody() {
  return (
    <div>
      <MyPageHeader />
      <div className={styles.allBookListCtn}></div>
    </div>
  );
}
