import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import styles from "../styles/MyPageHeader.module.css";
import { FiSettings } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { FiCamera } from "react-icons/fi";
import { useCoverColor } from "../contexts/CoverColorContext";
import { HexColorPicker } from "react-colorful";
import "../global.css";

export default function MyPageHeader() {
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedQuoteTitle, setEditedQuoteTitle] = useState("");
  const [editedQuoteText, setEditedQuoteText] = useState("");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#15719E");
  const [showCustomColorInput, setShowCustomColorInput] = useState(false);
  const [customColor, setCustomColor] = useState("#15719E");

  const { setCoverColor } = useCoverColor();

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCoverColor(color);
    setIsColorPickerOpen(false);
  };

  useEffect(() => {
    fetch("/data/mypageheaderData.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setEditedUsername(json.user.username);
        setEditedQuoteTitle(json.quote.title);
        setEditedQuoteText(json.quote.text);
      })
      .catch((err) => console.error("데이터 불러오기 실패", err));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSave = () => {
    setData((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        username: editedUsername,
      },
      quote: {
        title: editedQuoteTitle,
        text: editedQuoteText,
      },
    }));
    setIsEditing(false);
  };

  if (!data) return <div>불러오는 중...</div>;

  return (
    <div className={styles.wrapper}>
      <Nav />
      {isEditing && <div className={styles.overlay}></div>}
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          {isEditing && (
            <label htmlFor="imageUpload" className={styles.cameraIconWrapper}>
              <FiCamera className={styles.cameraIcon} />
            </label>
          )}
          <label htmlFor="imageUpload">
            <img
              src={
                selectedImage || require("../assets/images/Mypagepicture.png")
              }
              alt="프로필"
              className={styles.profileImage}
            />
          </label>
          {isEditing && (
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          )}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.nameRow}>
            {isEditing ? (
              <>
                <input
                  className={styles.usernameInput}
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                />
                <button
                  className={styles.coverColorBtn}
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                >
                  커버색상
                </button>
                {isColorPickerOpen && (
                  <div className={styles.colorPicker}>
                    {[
                      "#b4005c",
                      "#e85454",
                      "#b681f2",
                      "#5f6d4e",
                      "#ffaa00",
                      "#89e1ff",
                      "#f4b2bc",
                      "#ffcfff",
                      "#4cb8b3",
                      "#c275b7",
                      "#e65c00",
                      "#1561b3",
                      "#b28f85",
                      "#ffe600",
                      "#444c6a",
                      "#c90000",
                    ].map((color) => (
                      <div
                        key={color}
                        className={styles.colorBox}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                      />
                    ))}
                    <div
                      className={styles.moreColors}
                      onClick={() =>
                        setShowCustomColorInput(!showCustomColorInput)
                      }
                    >
                      <div className={styles.gradientDot}></div>
                      더보기 +
                    </div>
                    {showCustomColorInput && (
                      <div className={styles.customColorInputWrapper}>
                        <HexColorPicker
                          color={customColor}
                          onChange={setCustomColor}
                        />
                        <button
                          className={styles.applyBtn}
                          onClick={() => handleColorSelect(customColor)}
                        >
                          적용
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <span className={styles.subtext}>
                  작성한 구절 {data.user.quoteCount}개
                </span>
              </>
            ) : (
              <>
                <span className={styles.username}>{data.user.username}</span>
                <span className={styles.subtext}>
                  작성한 구절 {data.user.quoteCount}개
                </span>
              </>
            )}
          </div>

          <div className={styles.lowerSection}>
            <div
              className={`${styles.quoteBox} ${
                isEditing ? styles.editingQuoteBox : ""
              }`}
            >
              {isEditing ? (
                <>
                  <input
                    className={styles.quoteTitleInput}
                    value={editedQuoteTitle}
                    onChange={(e) => setEditedQuoteTitle(e.target.value)}
                    style={{ color: selectedColor }}
                  />
                  <textarea
                    className={styles.quoteTextArea}
                    value={editedQuoteText}
                    onChange={(e) => setEditedQuoteText(e.target.value)}
                    style={{ color: selectedColor }}
                  />
                  <button className={styles.completeBtn} onClick={handleSave}>
                    완료
                  </button>
                </>
              ) : (
                <>
                  <h3
                    className={styles.quoteTitle}
                    style={{ color: selectedColor }}
                  >
                    {data.quote.title}
                  </h3>
                  <p
                    className={styles.quoteText}
                    style={{ color: selectedColor }}
                  >
                    {data.quote.text}
                  </p>
                </>
              )}
            </div>

            <div className={styles.actionSection}>
              <div className={styles.buttons}>
                <button
                  className={styles.btn}
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ color: selectedColor }}
                >
                  <FiSettings className={styles.icon} />
                  프로필 편집
                </button>
              </div>

              <div
                className={styles.music}
                style={{
                  backgroundColor: isEditing
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.5)",
                  color: selectedColor,
                }}
              >
                <FaPlay className={styles.playIcon} />
                <span className={styles.songnameartist}>
                  <p className={styles.songname}>{data.music.song}</p>
                  <span className={styles.artist}>{data.music.artist}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
