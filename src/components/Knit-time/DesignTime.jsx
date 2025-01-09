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
const SlideContent = ({ image, title, url, duration }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="com-contents">
      <img src={image} alt="example-img" />
      <h1>{title}</h1>
      <h2>{duration}</h2>
    </a>
  );
};

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
  const SEARCH_KEYWORD = "뜨개질 듣기 좋은 노래"; // 검색 키워드

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
          time: `${Math.floor(responseContent.knitRecord.time / 60)}시간 ${
            responseContent.knitRecord.time % 60
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
    // YouTube 플레이리스트 가져오기
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
          params: {
            part: "snippet",
            q: SEARCH_KEYWORD,
            maxResults: 5,
            type: "video",
            key: API_KEY,
          },
        });
  
        if (response.status === 200) {
          const videoIds = response.data.items.map((item) => item.id.videoId).join(",");
          
          // videos API 호출하여 비디오 상세 정보 가져오기
          const videoDetailsResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
            params: {
              part: "contentDetails",
              id: videoIds,
              key: API_KEY,
            },
          });
  
          const items = response.data.items.map((item, index) => {
            const videoDetails = videoDetailsResponse.data.items[index];
            const duration = videoDetails.contentDetails.duration;
  
            const formattedDuration = convertDuration(duration);
  
            return {
              image: item.snippet.thumbnails.medium.url,
              title: item.snippet.title,
              url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              duration: formattedDuration,
            };
          });
  
          setPlaylist(items);
        }
      } catch (error) {
        console.error("Failed to fetch YouTube playlist:", error.message);
      }
    };
  
  // ISO 8601 형식의 시간을 mm:ss 형식으로 변환하는 함수
  const convertDuration = (duration) => {
    const regex = /^PT(\d+H)?(\d+M)?(\d+S)?$/;
    const matches = regex.exec(duration);
  
    const hours = matches[1] ? parseInt(matches[1].replace('H', '')) : 0;
    const minutes = matches[2] ? parseInt(matches[2].replace('M', '')) : 0;
    const seconds = matches[3] ? parseInt(matches[3].replace('S', '')) : 0;
  
    // 시간을 MM:SS 형식으로 반환 (hours가 없으면 00:MM:SS)
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    } else {
      return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
  };
  useEffect(() => {
    getDetailGallery();
    fetchPlaylist();
  }, []);


  //새로고침 버튼
  const handleRefresh = () => {
    fetchPlaylist(); // 새로운 YouTube 플레이리스트를 가져옵니다.
  };

  return (
    <div className="DesignTime_wrap container">
      <Header />
      <Nav name={"knittime"} />
      <h1 className="design-h1">뜨개하는 중...</h1>
      <div className="timer-design">
        <div className="design-img">
          <img
            src={galleryContent.imgSrc || ""}
            alt="ExampleDesign"
          />
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
        <img src={Refresh} alt="refresh-icon" className="img-icon" onClick={handleRefresh}/>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          className="swiper-container"
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {playlist.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent image={slide.image} title={slide.title} url={slide.url}duration={slide.duration}  />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default DesignTime;
