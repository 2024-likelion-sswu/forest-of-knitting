import React, { useState } from 'react';
import Header from '../Main/Header';
import Nav from '../Main/Nav';
import Example from '../../assets/img/Gallery/example-img.png';
import Example02 from '../../assets/img/Gallery/example-img02.png';
import Star from '../../assets/img/Gallery/star.svg';
import StarFilled from '../../assets/img/Gallery/star-filled.svg';
import Bookmark from '../../assets/img/Gallery/bookmark.svg';
import BookmarkFilled from '../../assets/img/Gallery/bookmark_filled.svg';
import Bk from '../../assets/img/Gallery/gallery-bk.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required modules
import { Pagination } from 'swiper/modules';

const DetailedGallery = () => {
  const [galleryContent, setGalleryContent] = useState({
    title: '마루킁킁뜨개했삼',
    time: '6시간 18분',
    preference: 4,
    likes: 150,
    bookmarks: true,
    imgSrc: [Example, Example02], 
    owner: '뜨개구리를만들고싶은소녀',
  });

  // 북마크 상태를 토글하는 함수
  const toggleBookmark = () => {
    setGalleryContent((prevContent) => ({
      ...prevContent,
      bookmarks: !prevContent.bookmarks,
    }));
  };

  return (
    <div className="DetailedGallery-wrap container">
      <Header />
      <Nav name={'Gallery'}/>
      <img src={Bk} alt="bk" className="detail-bk" />
      <div className="detail-container">
        <Swiper        pagination={{ clickable: true }} modules={[Pagination]}>
          {galleryContent.imgSrc.map((img, index) => (
            <SwiperSlide key={index} className='swiper-content'>
              <img src={img} alt={`top-img-${index}`} className="top-img" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="content">
          <div>
            <div className="template">
              <h2>{galleryContent.title}</h2>
              <h3>
                걸린 시간 <span>{galleryContent.time}</span>
              </h3>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < galleryContent.preference ? StarFilled : Star}
                    alt="star"
                  />
                ))}
              </div>
            </div>
            <div className="mark">
              <div className="mark-content">
                <img src={Star} alt="star" className="star-img" />
                <h4>{galleryContent.likes}</h4>
              </div>
              <img
                src={galleryContent.bookmarks ? BookmarkFilled : Bookmark}
                alt="bookmark"
                className="bookmark-img"
                onClick={toggleBookmark} // 북마크 상태 토글
              />
            </div>
          </div>
          <h3 className='owner'>by. {galleryContent.owner}</h3>
        </div>
      </div>
    </div>
  );
};

export default DetailedGallery;
