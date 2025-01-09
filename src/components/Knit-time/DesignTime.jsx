import React,{ useEffect, useState} from 'react';
import Header from '../Main/Header';
import Nav from '../Main/Nav';
import Refresh from '../../assets/img/KnitTime/refresh.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import ExampleImg from '../../assets/img/KnitTime/example-playlist.png';
import ExampleDesign from '../../assets/img/KnitTime/example-design.png';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required modules
import { Pagination } from 'swiper/modules';
import Timer from './TimerD';

// SlideContent 컴포넌트 생성
const SlideContent = ({ image, time }) => {
    return (
      <div className="com-contents">
        <img src={image} alt="example-img" />
        <h1>{time}</h1>
      </div>
    );
  };



const DesignTime = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const jwtToken = localStorage.getItem('jwtToken');
  const recordId = localStorage.getItem('detailedGalleryID');
  const [galleryContent, setGalleryContent] = useState({
    title: '마루킁킁뜨개했삼',
    time: '6시간 18분',
    imgSrc: ExampleImg, 
    owner: '뜨개구리를만들고싶은소녀',
  });
  //get 상세 record
    const getDetailGallery = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/record/detail`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
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
            imgSrc: responseContent.knitImgUrl,
            owner: responseContent.knitRecord.user.nickname,
          });
          localStorage.setItem('isBooked',responseContent.isBooked);
          localStorage.setItem('DesignTime',responseContent.time);
        }
      } catch (error) {
        console.error("Failed to fetch gallery details:", error.message);
      }
    };
    
   
    
    useEffect(() => {
      getDetailGallery ();
    }, []);
    const completeData = [
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
      ];
  return (
    <div className='DesignTime_wrap container'>
        <Header />
        <Nav name={'knittime'}/>
        <h1 className='design-h1'>뜨개하는 중...</h1>
        <div className='timer-design'>
            <div className='design-img'>
                <img src={galleryContent.imgSrc? galleryContent.imgSrc :ExampleDesign} alt="ExampleDesign" />
            </div>
            <div className='design-h2'>
                <h2>예상 소요시간: <span>{galleryContent.time}</span></h2>
                <h2>by <span>{galleryContent.owner}</span></h2>
            </div>
        </div>
        <section className='timer'>
            <Timer/>
        </section>
        <section className='playlist'>
            <h1>뜨개마을 주민을 위한<br/>PLAYLIST</h1>
            <img src={Refresh} alt="refresh-icon" className='img-icon' />
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          className="swiper-container"
          pagination={{ clickable: true }} modules={[Pagination]}
        >
          {completeData.map((slide, index) => (
            <SwiperSlide key={index}>
              <SlideContent image={slide.image} time={slide.time} />
            </SwiperSlide>
          ))}
        </Swiper>
        </section>  
    </div>
  )
}
export default DesignTime
