import React, { useEffect, useState } from "react";
import Header from "../Main/Header";
import Nav from "../Main/Nav";
import Refresh from "../../assets/img/KnitTime/refresh.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Timer from "./TimerD";
import axios from "axios";

// SlideContent 컴포넌트
const SlideContent = ({ image, title, url, duration }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="com-contents">
    <img src={image} alt="example-img" />
    <h1>{title}</h1>
    <h2>{duration}</h2>
  </a>
);

const DesignTime = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const jwtToken = localStorage.getItem("jwtToken");
  const recordId = localStorage.getItem("detailedGalleryID");

  const [galleryContent, setGalleryContent] = useState({
    title: "마루킁킁뜨개했삼",
    time: "6시간 18분",
    imgSrc: "",
    owner: "뜨개구리를만들고싶은소녀",
  });

  const [playlist, setPlaylist] = useState([]);
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // YouTube Data API 키
  const SEARCH_KEYWORDS = [
    "뜨개질 플레이리스트",
    "뜨개 플리",
    "잔잔 플레이리스트",
    "감성 플레이리스트",
    "뜨개질 음악모음",
    "뜨개 플레이리스트",
  ];

  const getRandomSearchKeyword = () => {
    const randomIndex = Math.floor(Math.random() * SEARCH_KEYWORDS.length);
    return SEARCH_KEYWORDS[randomIndex];
  };

  // 상세 record 가져오기
  const getDetailGallery = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/record/detail`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        params: { recordId },
      });

      if (response.status === 200) {
        const responseContent = response.data.data;
        setGalleryContent({
          title: responseContent.knitRecord.title,
          time: `${Math.floor(responseContent.knitRecord.time / 60)}시간 ${responseContent.knitRecord.time % 60
            }분`,
          OngoingTime: responseContent.knitRecord.user.accTime,
          imgSrc: responseContent.knitImgUrl,
          owner: responseContent.knitRecord.user.nickname,
        });
        localStorage.setItem("isBooked", responseContent.isBooked);
        localStorage.setItem("DesignTime", responseContent.knitRecord.user.accTime);
      }
    } catch (error) {
      console.error("Failed to fetch gallery details:", error.message);
    }
  };

  // YouTube 플레이리스트 가져오기
  const fetchPlaylist = async () => {
    const SEARCH_KEYWORD = getRandomSearchKeyword();
    try {

      const searchResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: SEARCH_KEYWORD,
          maxResults: 3,
          type: "video",
          key: API_KEY,
        },
      });

      if (searchResponse.status === 200) {
        const videoIds = searchResponse.data.items.map((item) => item.id.videoId).join(",");
        const videoDetailsResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            part: "contentDetails",
            id: videoIds,
            key: API_KEY,
          },
        });

        const items = searchResponse.data.items.map((item, index) => {
          const videoDetails = videoDetailsResponse.data.items[index];
          const duration = videoDetails.contentDetails.duration;

          return {
            image: item.snippet.thumbnails.medium.url,
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            duration: convertDuration(duration),
            videoId: item.id.videoId,
          };
        });

        setPlaylist(items);
      }
    } catch (error) {
      console.error("Failed to fetch YouTube playlist:", error.message);
    }
  };

  const convertDuration = (duration) => {
    const regex = /^PT(\d+H)?(\d+M)?(\d+S)?$/;
    const matches = regex.exec(duration);

    const hours = matches[1] ? parseInt(matches[1].replace("H", "")) : 0;
    const minutes = matches[2] ? parseInt(matches[2].replace("M", "")) : 0;
    const seconds = matches[3] ? parseInt(matches[3].replace("S", "")) : 0;

    if (hours > 0) {
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    } else {
      return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
  };

  useEffect(() => {
    getDetailGallery();
    fetchPlaylist();
  }, []);

  // 새로고침 버튼
  const handleRefresh = () => {
    fetchPlaylist(); // 새로운 YouTube 플레이리스트를 가져옵니다.
  };

  const SlideContent = ({ image, title, url, duration, videoId }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className="com-contents">
      <div className="video-player">
        <iframe
          width="311"
          height="176"
          type="text/html"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h1>{title}</h1>
      <h2>{duration}</h2>


    </a>
  );


  return (
    <div className="DesignTime_wrap container">
      <Header />
      <Nav name={"knittime"} />
      <h1 className="design-h1">뜨개하는 중...</h1>
      <div className="timer-design">
        <div className="design-img">
          <img src={galleryContent.imgSrc || ""} alt="ExampleDesign" />
        </div>
        <div className="design-h2">
          <h2>
            예상 소요시간: <span>{galleryContent.time}</span>
          </h2>
          <h2>
            by <span>{galleryContent.owner}</span>
          </h2>
        </div>
      </div>
      <section className="timer">
        <Timer />
      </section>
      <section className="playlist">
        <h1>
          뜨개마을 주민을 위한
          <br />
          PLAYLIST
        </h1>
        <img src={Refresh} alt="refresh-icon" className="img-icon" onClick={handleRefresh} />
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          className="swiper-container"
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {playlist.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent image={slide.image} title={slide.title} url={slide.url} videoId={slide.videoId} duration={slide.duration} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default DesignTime;
