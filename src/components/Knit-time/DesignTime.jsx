import React from 'react';
import Header from '../Main/Header';
import Nav from '../Main/Nav';
import Refresh from '../../assets/img/KnitTime/refresh.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import ExampleImg from '../../assets/img/KnitTime/example-playlist.png';
import ExampleDesign from '../../assets/img/KnitTime/example-design.png';

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
        <Nav />
        <h1 className='design-h1'>뜨개하는 중...</h1>
        <div className='timer-design'>
            <div className='design-img'>
                <img src={ExampleDesign} alt="ExampleDesign" />
            </div>
            <div className='design-h2'>
                <h2>예상 소요시간: <span>8시간 8분</span></h2>
                <h2>by <span>진수</span></h2>
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
