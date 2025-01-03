import React from 'react';
import Header from '../Main/Header';
import Nav from '../Main/Nav';
import Cloud from '../../assets/img/KnitTime/cloud.svg';
import Checked from '../../assets/img/KnitTime/checked.svg';
import ExampleImg from '../../assets/img/KnitTime/example-img.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

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

  //timer 페이지로 이동
  const toTimer = () => {
    navigate('/timerstart');
  };
  // 슬라이드 데이터 배열
  const completeData = [
    { image: ExampleImg, time: '4시간 34분' },
    { image: ExampleImg, time: '2시간 18분' },
    { image: ExampleImg, time: '3시간 45분' },
    { image: ExampleImg, time: '5시간 12분' },
    { image: ExampleImg, time: '6시간 30분' },
  ];

  const savedData = [
    { image: ExampleImg, time: '2시간 34분' },
    { image: ExampleImg, time: '3시간 18분' },
    { image: ExampleImg, time: '4시간 45분' },
    { image: ExampleImg, time: '5시간 12분' },
    { image: ExampleImg, time: '2시간 30분' },
  ];

  return (
    <div className="KnitTime_wrap container">
      <Header />
      <Nav />
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
      <button className='to-knitting' onClick={toTimer}>뜨개하기</button>
    </div>
  );
};

export default KnitTime;
