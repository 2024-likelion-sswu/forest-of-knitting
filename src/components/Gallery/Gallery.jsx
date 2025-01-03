import React, { useState } from 'react';
import Header from '../Main/Header';
import Nav from '../Main/Nav';
import Example from '../../assets/img/Gallery/example-img.png';
import Star from '../../assets/img/Gallery/star.svg';
import StarFilled from '../../assets/img/Gallery/star-filled.svg';
import Bookmark from '../../assets/img/Gallery/bookmark.svg';
import BookmarkFilled from '../../assets/img/Gallery/bookmark_filled.svg';
import RightArrow from '../../assets/img/Gallery/rigth-Arrow.svg';
import Bk from '../../assets/img/Gallery/gallery-bk.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const initialGalleryContents = [
  {
    title: '마루킁킁뜨개했삼',
    time: '6시간 18분',
    preference: 4,
    likes: 150,
    bookmarks: true,
    imgSrc: Example,
  },
  {
    title: '새로운 뜨개 작품',
    time: '4시간 12분',
    preference: 5,
    likes: 200,
    bookmarks: false,
    imgSrc: Example,
  },
  {
    title: '여름 니트 가디건',
    time: '8시간 45분',
    preference: 3,
    likes: 75,
    bookmarks: true,
    imgSrc: Example,
  },
  {
    title: '겨울 머플러 뜨개질',
    time: '3시간 30분',
    preference: 4,
    likes: 120,
    bookmarks: false,
    imgSrc: Example,
  },
  // 추가 콘텐츠
];

const Gallery = () => {
  const [galleryContents, setGalleryContents] = useState(initialGalleryContents);

  const toggleBookmark = (index) => {
    const updatedContents = [...galleryContents];
    updatedContents[index].bookmarks = !updatedContents[index].bookmarks;
    setGalleryContents(updatedContents);
  };

  return (
    <div className="gallery_wrap container">
      <Header />
      <Nav name={'Gallery'}/>
      <section className="today-design">
        <h1>오늘의 도안</h1>
        <div className="content">
          <img src={galleryContents[0].imgSrc} alt="top-img" className="top-img" />
          <div className="template">
            <h2>{galleryContents[0].title}</h2>
            <h3>걸린 시간 <span>{galleryContents[0].time}</span></h3>
          </div>
          <div className="mark">
            <div className="mark-content">
              <img src={Star} alt="star" className="star-img" />
              <span>{galleryContents[0].likes}</span>
              <img
                src={galleryContents[0].bookmarks ? BookmarkFilled : Bookmark}
                alt="bookmark"
                className="bookmark-img"
                onClick={() => toggleBookmark(0)} // 클릭 시 북마크 상태 토글
              />
            </div>
            <div className="details">
              <span>자세히보기</span>
              <img src={RightArrow} alt="right-arrow" />
            </div>
          </div>
        </div>
      </section>
      <section className="design-gallery">
        <div className="gal-bk"><img src={Bk} alt="bk" /></div>
        <h1>도안 갤러리</h1>
        <div className="gal-container">
          <Swiper
             direction={'vertical'}
            spaceBetween={10} 
            slidesPerView={3.5} 
          >
            {galleryContents.map((content, index) => (
              <SwiperSlide key={index}>
                <div className="content">
                  <img src={content.imgSrc} alt="top-img" className="top-img" />
                  <div className="template">
                    <h2>{content.title}</h2>
                    <h3>걸린 시간 <span>{content.time}</span></h3>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={i < content.preference ? StarFilled : Star}
                          alt="star"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mark">
                    <div className="mark-content">
                      <img src={Star} alt="star" className="star-img" />
                      <span>{content.likes}</span>
                      <img
                        src={content.bookmarks ? BookmarkFilled : Bookmark}
                        alt="bookmark"
                        className="bookmark-img"
                        onClick={() => toggleBookmark(index)} // 클릭 시 북마크 상태 토글
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
