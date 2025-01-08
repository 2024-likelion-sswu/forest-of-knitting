import React, { useState, useEffect } from 'react';
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
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const jwtToken = localStorage.getItem('jwtToken');
  const [galleryContents, setGalleryContents] = useState(initialGalleryContents);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

  // record 전체글 조회
  const fetchGallery = async () => {
    try {
      const response = await fetch(`${BASE_URL}/record/all?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        const formattedData = responseData.data.map((item) => ({
          id: item.id,
          title: item.title,
          time: item.time,
          preference: item.level,
          likes: item.recommendation,
          imgSrc: item.imgUrl || Example, // 기본 이미지 설정
        }));
        setGalleryContents(formattedData);
      } else {
        console.error('Failed to fetch gallery contents');
      }
    } catch (error) {
      console.error('Error fetching gallery contents:', error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [currentPage]); 

//저장된 디자인 업데이트
const updateSavedDesign = async (id, time = 0, isCompleted = false) => {
  console.log(id, time, isCompleted);
  try {
    const response = await fetch(`${BASE_URL}/designknit/update`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        knitRecordId: id,
        time: time, // 시간 값을 인자로 받아 설정
        isCompleted: isCompleted, // 완료 여부도 인자로 받아 설정
      }),
    });

    if (!response.ok) {
      console.error('Failed to update saved design');
    }
  } catch (error) {
    console.error('Error updating saved design: ', error);
  }
};



  const toggleBookmark = (index) => {
    const updatedContents = [...galleryContents];
    updatedContents[index].bookmarks = !updatedContents[index].bookmarks;
    if(updatedContents[index].bookmarks){ //새로 북마크 할때
      
      const time = 0; 
      const isCompleted = false; 
      //console.log(updatedContents[index].id, time, isCompleted);
      updateSavedDesign(updatedContents[index].id, time, isCompleted); 
    }
    setGalleryContents(updatedContents);

  };

  //상세보기로 이동
  const toDetailedGallery = (id) => {
    localStorage.setItem('detailedGalleryID', id);  // 클릭한 id를 저장

    navigate('/gallery/detailedgallery');
  }

  return (
    <div className="gallery_wrap container">
      <Header />
      <Nav name={'Gallery'} />
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
              <span onClick={() => toDetailedGallery(galleryContents[0].id)}>자세히보기</span>
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
                  <img src={content.imgSrc} alt="top-img" className="top-img"
                  onClick={() => toDetailedGallery(galleryContents[index].id)}
                  />
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
