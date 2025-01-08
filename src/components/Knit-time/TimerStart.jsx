import React from 'react';
import Header from '../Main/Header';
import Nav from '../Main/Nav';
import Refresh from '../../assets/img/KnitTime/refresh.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import ExampleImg from '../../assets/img/KnitTime/example-playlist.png';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required modules
import { Pagination } from 'swiper/modules';
import Timer from './Timer';

// SlideContent 컴포넌트 생성
const SlideContent = ({ image, time }) => {
    return (
      <div className="com-contents">
        <img src={image} alt="example-img" />
        <h1>{time}</h1>
      </div>
    );
  };
const TimerStart = () => {
    const completeData = [
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
        { image: ExampleImg, time: '𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 | “사람들은 다른 사람들의 열정에 끌리게 되어있어” 열정있게 뜨개질 하면서 듣기 좋은 노래 knit with me' },
      ];
  return (
    <div className='TimerStart_wrap container'>
        <Header />
        <Nav name={'knittime'}/>
        <h1 className='timer-h1'>뜨개하는 중...</h1>
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

export default TimerStart
