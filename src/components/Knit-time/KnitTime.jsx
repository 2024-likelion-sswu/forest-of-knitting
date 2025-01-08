import React, { useEffect, useState } from 'react';
import Header from '../Main/Header';
import Nav from '../Main/Nav';
import Cloud from '../../assets/img/KnitTime/cloud.svg';
import Checked from '../../assets/img/KnitTime/checked.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
// Import required modules
import { Scrollbar } from 'swiper/modules';

// SlideContent 컴포넌트 생성
const SlideContent = ({ image, time }) => {
  return (
    <div className="com-contents">
      <img src={image} alt="example-img" />
      <h1>{time}</h1>
    </div>
  );
};

const KnitTime = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const jwtToken = localStorage.getItem('jwtToken');

  // State for complete and saved designs
  const [completeData, setCompleteData] = useState([]);
  const [savedData, setSavedData] = useState([]);

  // Format time from minutes to "X시간 Y분"
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  // Fetch completed designs
  const completeGet = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/designknit/completed`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const formattedData = response.data.map((item) => ({
          image: item.imgUrl,
          time: formatTime(item.time),
        }));
        setCompleteData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching completed designs:', error.message);
    }
  };

  // Fetch saved designs
  const savedGet = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/designknit/saved`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const formattedData = response.data.map((item) => ({
          image: item.imgUrl,
          time: formatTime(item.time),
        }));
        setSavedData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching saved designs:', error.message);
    }
  };

  // Navigate to timer page
  const toTimer = () => {
    navigate('/knittime/timerstart');
  };

  // Fetch data on component mount
  useEffect(() => {
    completeGet();
    savedGet();
  }, []);

  return (
    <div className="KnitTime_wrap container">
      <Header />
      <Nav name="knittime" />
      <section className="complete_pattern">
        <div className="my_complete">
          <img src={Cloud} alt="cloud-icon" />
          <h1>내가 완성한 도안</h1>
        </div>

        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          scrollbar={{
            hide: false, // 스크롤 바 항상 보이게
            draggable: true, // 드래그 가능
          }}
          modules={[Scrollbar]}
          className="swiper-container"
        >
          {completeData.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent image={slide.image} time={slide.time} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="saved_pattern">
        <div className="my_saved">
          <img src={Checked} alt="cloud-icon" />
          <h1>저장한 도안</h1>
        </div>

        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          scrollbar={{
            hide: false, // 스크롤 바 항상 보이게
            draggable: true, // 드래그 가능
          }}
          modules={[Scrollbar]}
          className="swiper-container"
        >
          {savedData.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent image={slide.image} time={slide.time} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <button className="to-knitting" onClick={toTimer}>
        뜨개하기
      </button>
    </div>
  );
};

export default KnitTime;
