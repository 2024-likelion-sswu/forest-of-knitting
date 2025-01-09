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

const SlideContent = ({ image, time, knitRecordId, isCompleted }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem('detailedGalleryID', knitRecordId);
    console.log(`Knit Record ID ${knitRecordId} saved to localStorage.`);
    if (isCompleted) {
      navigate('/gallery/detailedgallery');  // 완료된 도안은 /gallery/detailedgallery로
    } else {
      navigate('/knittime/designtime');  // 저장한 도안은 /knittime/designtime으로
    }
  };

  return (
    <div className="com-contents" onClick={handleClick}>
      <img src={image} alt="example-img" />
      <h1>{time}</h1>
    </div>
  );
};


const KnitTime = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const jwtToken = localStorage.getItem('jwtToken');

  const [completeData, setCompleteData] = useState([]);
  const [savedData, setSavedData] = useState([]);
  const [refreshData, setRefreshData] = useState(false); // 추가된 상태

  const formatTime = (hour, minute) => `${hour}시간 ${minute}분`;

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
          knitRecordId: item.knitRecordId,
          image: item.imgUrl,
          time: formatTime(item.hour, item.minute),
        }));
        setCompleteData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching completed designs:', error.message);
    }
  };

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
          knitRecordId: item.knitRecordId,
          image: item.imgUrl,
          time: formatTime(item.hour, item.minute),
          isCompleted: item.isCompleted,
        }));
        setSavedData(formattedData);
        console.log(formattedData);
      }
    } catch (error) {
      console.error('Error fetching saved designs:', error.message);
    }
  };

  const toTimer = () => {
    setRefreshData(true); // 데이터 새로 고침을 트리거
    navigate('/knittime/timerstart');
  };

  // 데이터 갱신 로직
  useEffect(() => {
    if (refreshData) {
      completeGet();
      savedGet();
      setRefreshData(false); // 데이터 갱신 후 초기화
    }
  }, [refreshData]); // 의존성 배열에 `refreshData` 추가

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
          scrollbar={{ hide: false, draggable: true }}
          modules={[Scrollbar]}
          className="swiper-container"
        >
          {completeData.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent
                image={slide.image}
                time={slide.time}
                knitRecordId={slide.knitRecordId}
                isCompleted={true}
              />
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
          scrollbar={{ hide: false, draggable: true }}
          modules={[Scrollbar]}
          className="swiper-container"
        >
          {savedData.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent
                image={slide.image}
                time={slide.time}
                knitRecordId={slide.knitRecordId}
                isCompleted={false}
              />
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
