import React, { useState, useRef, useEffect } from "react";
import Nav from "../components/Nav";
import styles from "../styles/MyPageHeader.module.css";
import { FiSettings, FiCamera } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa";
import { useCoverColor } from "../contexts/CoverColorContext";
import { HexColorPicker } from "react-colorful";
import mypageHeaderData from "../data/mypageheaderData.json";
import "../global.css";

export default function MyPageHeader() {
  const [data, setData] = useState(mypageHeaderData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedUsername, setEditedUsername] = useState(
    mypageHeaderData.user.username
  );
  const [editedQuoteTitle, setEditedQuoteTitle] = useState(
    mypageHeaderData.quote.title
  );
  const [editedQuoteText, setEditedQuoteText] = useState(
    mypageHeaderData.quote.text
  );
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#15719E");
  const [showCustomColorInput, setShowCustomColorInput] = useState(false);
  const [customColor, setCustomColor] = useState("#15719E");
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");
  const [quoteCount, setQuoteCount] = useState(0);

  // 음악 관련 state
  const [musicData, setMusicData] = useState({
    song: "1000",
    artist: "NCT WISH",
    album: "Weezer (Green Album)",
    image: "https://i.scdn.co/image/ab67616d0000b273bf5eb4fb32418903b46a0ae3",
    preview: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicSearch, setShowMusicSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewPlayingIndex, setPreviewPlayingIndex] = useState(null);

  const audioRef = useRef(null);
  const previewAudioRef = useRef(null);
  const songNameRef = useRef(null);
  const artistRef = useRef(null);
  const { setCoverColor } = useCoverColor();

  // 텍스트 오버플로우 체크 및 애니메이션 적용
  useEffect(() => {
    const checkTextOverflow = (element, text) => {
      if (element?.current) {
        const elementWidth = element.current.offsetWidth;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const fontSize = element === songNameRef ? "16px" : "13px";
        const fontFamily =
          element === songNameRef ? "Pretendard" : "PretendardL";
        context.font = `${fontSize} ${fontFamily}`;
        const textWidth = context.measureText(text).width;

        if (textWidth > elementWidth) {
          element.current.classList.add(styles.overflow);
        } else {
          element.current.classList.remove(styles.overflow);
        }
      }
    };

    checkTextOverflow(songNameRef, musicData.song);
    checkTextOverflow(artistRef, musicData.artist);
  }, [musicData.song, musicData.artist]);

  // 초기 음악 검색
  useEffect(() => {
    const searchInitialMusic = async () => {
      try {
        const response = await fetch(
          `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
            "1000 NCT WISH"
          )}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "7138ae1e3cmsh63d4fa598445c5dp183b4ajsn1c9c5bdd5a48",
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        );
        const result = await response.json();

        if (result.data?.[0]) {
          const foundMusic = result.data[0];
          setMusicData({
            song: foundMusic.title,
            artist: foundMusic.artist.name,
            album: foundMusic.album.title,
            image: foundMusic.album.cover_medium || foundMusic.album.cover,
            preview: foundMusic.preview,
          });
        }
      } catch (err) {
        console.error("초기 음악 로딩 오류:", err);
      }
    };

    searchInitialMusic();
  }, []);

  // Deezer API 검색
  const searchMusic = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "7138ae1e3cmsh63d4fa598445c5dp183b4ajsn1c9c5bdd5a48",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      const result = await response.json();
      setSearchResults(result.data?.slice(0, 20) || []);
    } catch (err) {
      setError("음악 검색 중 오류가 발생했습니다.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어 디바운스
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery && showMusicSearch) {
        searchMusic(searchQuery);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, showMusicSearch]);

  // 모달 미리듣기
  const togglePreviewMusic = (musicIndex, previewUrl) => {
    if (!previewUrl) {
      alert("이 곡은 미리듣기가 제공되지 않습니다.");
      return;
    }

    // 메인 플레이어 정지
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }

    // 다른 미리듣기 정지
    if (previewPlayingIndex !== null && previewPlayingIndex !== musicIndex) {
      previewAudioRef.current?.pause();
    }

    // 현재 곡 토글
    if (previewPlayingIndex === musicIndex) {
      previewAudioRef.current?.pause();
      setPreviewPlayingIndex(null);
    } else {
      if (previewAudioRef.current) {
        previewAudioRef.current.src = previewUrl;
        previewAudioRef.current
          .play()
          .catch(() => alert("미리듣기 재생 중 오류가 발생했습니다."));
        setPreviewPlayingIndex(musicIndex);
      }
    }
  };

  // 음악 선택
  const selectMusic = (selectedMusic) => {
    setMusicData({
      song: selectedMusic.title,
      artist: selectedMusic.artist.name,
      album: selectedMusic.album.title,
      image: selectedMusic.album.cover_medium || selectedMusic.album.cover,
      preview: selectedMusic.preview,
    });
    setShowMusicSearch(false);
    setSearchQuery("");

    // 미리듣기 정지
    previewAudioRef.current?.pause();
    setPreviewPlayingIndex(null);

    // 메인 플레이어 정지
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  // 메인 플레이어 토글
  const togglePlayMusic = () => {
    if (!musicData.preview) {
      alert("이 곡은 미리듣기가 제공되지 않습니다.");
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        ?.play()
        .catch(() => alert("음악 재생 중 오류가 발생했습니다."));
      setIsPlaying(true);
    }
  };

  // 오디오 이벤트
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener("ended", handleEnded);
      return () => audio.removeEventListener("ended", handleEnded);
    }
  }, [musicData.preview]);

  useEffect(() => {
    const audio = previewAudioRef.current;
    if (audio) {
      const handleEnded = () => setPreviewPlayingIndex(null);
      audio.addEventListener("ended", handleEnded);
      return () => audio.removeEventListener("ended", handleEnded);
    }
  }, []);

  //
  useEffect(() => {
    const apiBaseUrl = "http://3.38.185.232:8080";

    fetch(`${apiBaseUrl}/api/profile`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5nbWkxQG5hdmVyLmNvbSIsImlhdCI6MTc0OTY1NjMzMCwiZXhwIjoxNzQ5Njc0MzMwfQ.wJnL0vwAftOv2JnAG9lpA3EpKaY0IZ_NsUXPAQsUas0",
      },
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          return response.text().then((text) => {
            console.log("Error response body:", text);
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Success:", responseData);
        setUserName(responseData.data.name || ""); // 이름 저장
        setQuoteCount(responseData.data.quoteCount || 0); // 구절 수 저장
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCoverColor(color);
    setIsColorPickerOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  const handleSave = () => {
    setData((prevData) => ({
      ...prevData,
      user: { ...prevData.user, username: editedUsername },
      quote: {
        ...prevData.quote,
        title: editedQuoteTitle,
        text: editedQuoteText,
      },
    }));
    setIsEditing(false);
  };

  const closeModal = () => {
    setShowMusicSearch(false);
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
    previewAudioRef.current?.pause();
    setPreviewPlayingIndex(null);
  };

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
              src={selectedImage || "assets/images/Mypagepicture.png"}
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
                <span className={styles.username}>{userName}</span>
                <span className={styles.subtext}>
                  작성한 구절 {quoteCount}개
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
                className={`${styles.music} ${isPlaying ? styles.playing : ""}`}
                style={{
                  backgroundColor: isEditing
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.5)",
                  color: selectedColor,
                  cursor: isEditing ? "pointer" : "default",
                }}
                onClick={() => isEditing && setShowMusicSearch(true)}
              >
                {musicData.image && (
                  <img
                    src={musicData.image}
                    alt="앨범 커버"
                    className={styles.albumCoverImage}
                  />
                )}
                <button
                  className={styles.playButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayMusic();
                  }}
                  style={{ color: selectedColor }}
                >
                  {isPlaying ? (
                    <FaPause className={styles.playIcon} />
                  ) : (
                    <FaPlay className={styles.playIcon} />
                  )}
                </button>
                <div className={styles.musicInfo}>
                  <p ref={songNameRef} className={styles.songname}>
                    {musicData.song}
                  </p>
                  <span ref={artistRef} className={styles.artist}>
                    {musicData.artist}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 음악 검색 모달 */}
      {showMusicSearch && (
        <div className={styles.musicSearchModal}>
          <div className={styles.musicSearchContainer}>
            <div className={styles.searchHeader}>
              <h3>곡을 검색해주세요</h3>
              <button className={styles.closeBtn} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className={styles.searchInputContainer}>
              <input
                type="text"
                placeholder="곡명, 아티스트를 검색해보세요"
                className={styles.musicSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={styles.searchIcon}>🔍</button>
            </div>

            <div className={styles.musicList}>
              {isLoading && <div className={styles.loading}>검색 중...</div>}
              {error && <div className={styles.errorMessage}>{error}</div>}
              {!isLoading &&
                !error &&
                searchResults.length === 0 &&
                searchQuery && (
                  <div className={styles.loading}>검색 결과가 없습니다.</div>
                )}
              {!isLoading && !error && searchQuery === "" && (
                <div className={styles.loading}>검색어를 입력해주세요.</div>
              )}

              {searchResults.map((music, index) => (
                <div
                  key={index}
                  className={styles.musicItem}
                  onClick={() => selectMusic(music)}
                >
                  <div className={styles.albumCover}>
                    {music.album.cover_small ? (
                      <img
                        src={music.album.cover_small}
                        alt={music.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "20px" }}>🎵</span>
                    )}
                  </div>
                  <div className={styles.musicInfoModal}>
                    <div className={styles.songTitle}>{music.title}</div>
                    <div className={styles.artistName}>{music.artist.name}</div>
                  </div>
                  <button
                    className={styles.playBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePreviewMusic(index, music.preview);
                    }}
                  >
                    {previewPlayingIndex === index ? "⏸" : "▶"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 오디오 엘리먼트 */}
      {musicData.preview && (
        <audio
          ref={audioRef}
          src={musicData.preview}
          onEnded={() => setIsPlaying(false)}
        />
      )}
      <audio ref={previewAudioRef} />
    </div>
  );
}
