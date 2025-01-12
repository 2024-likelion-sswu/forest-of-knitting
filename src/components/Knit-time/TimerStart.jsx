import React, { useEffect, useState } from "react";
import Header from '../Main/Header';
import Nav from '../Main/Nav';
import Refresh from '../../assets/img/KnitTime/refresh.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required modules
import { Pagination } from 'swiper/modules';
import Timer from './Timer';


const SlideContent = ({ image, title, url, duration }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="com-contents">
    <img src={image} alt="example-img" />
    <h1>{title}</h1>
    <h2>{duration}</h2>
  </a>
);
const TimerStart = () => {
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
            videoId: item.id.videoId,
          };
        });

        setPlaylist(items);
      }
    } catch (error) {
      console.error("Failed to fetch YouTube playlist:", error.message);
    }
  };
  const handleRefresh = () => {
    fetchPlaylist();
  };


  useEffect(() => {
    fetchPlaylist();
  }, []);


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
    <div className='TimerStart_wrap container'>
      <Header />
      <Nav name={'knittime'} />
      <h1 className='timer-h1'>뜨개하는 중...</h1>
      <section className='timer'>
        <Timer />
      </section>
      <section className='playlist'>
        <h1>뜨개마을 주민을 위한<br />PLAYLIST</h1>
        <img src={Refresh} alt="refresh-icon" className='img-icon' />
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          className="swiper-container"
          pagination={{ clickable: true }} modules={[Pagination]}
        >
          {playlist.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent image={slide.image} title={slide.title} url={slide.url} videoId={slide.videoId}  />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  )
}

export default TimerStart
