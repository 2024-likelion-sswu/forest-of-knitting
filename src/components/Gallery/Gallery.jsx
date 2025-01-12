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
import axios from 'axios';

const initialGalleryContents = [
  {
    id: 1,
    title: '마루킁킁뜨개했삼',
    time: '6시간 18분',
    preference: 4,
    likes: 150,
    bookmarks: true,
    imgSrc: Example,
    starClicked: true,
  },
];

const Gallery = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const jwtToken = localStorage.getItem('jwtToken');
  const [galleryContents, setGalleryContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [isPageDataLoaded, setIsPageDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  

  // record 전체글 조회
  const fetchGallery = async () => {
    setIsLoading(true);  
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
          bookmarks: item.isBooked,
          likes: item.recommendation,
          imgSrc: item.imgUrl || Example, // 기본 이미지 설정
          starClicked:  item.myRecommend, 
        }));


        // 데이터가 정상적으로 로드된 경우
        if (formattedData.length > 0) {
          setGalleryContents((prevContents) => [...prevContents, ...formattedData]);
          setIsPageDataLoaded(true); // 데이터가 로드됨
          setIsLoading(false); 
        } else {
          setIsPageDataLoaded(false); // 데이터가 없으면 로드 실패
        }
      } else {
        console.error('Failed to fetch gallery contents');
      }
    } catch (error) {
      console.error('Error fetching gallery contents:', error);
      setIsPageDataLoaded(false); // 데이터 로드 실패
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [currentPage]);

  // 저장된 디자인 업데이트
  const updateSavedDesign = async (id, time = 0, isCompleted = false) => {
    try {
      const formData = new FormData();
      formData.append('knitRecordId', id?.toString() || '');
      formData.append('hour', Math.floor(time / 60)?.toString() || '');
      formData.append('minute', (time % 60)?.toString() || '');
      formData.append('isCompleted', isCompleted ? 'true' : 'false');

      const response = await fetch(`${BASE_URL}/designknit/update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error('Failed to update saved design');
      } else {
        console.log('Design updated successfully');
      }
    } catch (error) {
      console.error('Error updating saved design: ', error);
    }
  };

  // 북마크 취소
  const cancelBookmark = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${BASE_URL}/designknit/cancel/${parseInt(id)}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Response:', response.data.message);
      } else {
        console.error('디자인 취소 실패');
      }
    } catch (error) {
      console.error('디자인 취소 중 에러 발생:', error);
    }
  };

  const toggleBookmark = (index) => {
    const updatedContents = [...galleryContents];
    updatedContents[index].bookmarks = !updatedContents[index].bookmarks;
    if (updatedContents[index].bookmarks) {
      const time = 0;
      const isCompleted = false;
      updateSavedDesign(updatedContents[index].id, time, isCompleted);
    } else {
      cancelBookmark(updatedContents[index].id);
    }
    setGalleryContents(updatedContents);
  };

  //상세보기로 이동
  const toDetailedGallery = (uniqueId) => {
    // 고유 id에 해당하는 항목을 galleryContents에서 찾음
    const galleryItem = galleryContents.find(item => item.id === uniqueId);
    
    if (galleryItem) {
      // 해당 항목을 찾았다면, 데이터를 로컬 스토리지에 저장
      localStorage.setItem('starClicked', galleryItem.starClicked);
      localStorage.setItem('detailedGalleryID', uniqueId);  // 고유 id를 저장
      localStorage.setItem('likes', galleryItem.likes.toString());  // 고유 id에 해당하는 likes 값을 저장
      
      console.log(galleryItem);
      console.log(galleryItem.likes.toString());
    } else {
      console.log('해당 id를 가진 항목을 찾을 수 없습니다.');
    }
  
    navigate('/gallery/detailedgallery');
  };
  
  //무한 스크롤
  const handleReachEnd = () => {
    // 이전 페이지가 로드된 경우에만 다음 페이지를 불러옴
    if (isPageDataLoaded) {
      setCurrentPage((prevPage) => prevPage + 1); // 마지막 슬라이드에 도달하면 페이지 증가
    }
  };
  
  //추천하기
  const clickStar = async (index) => {
    const updatedContents = [...galleryContents];
    const currentContent = updatedContents[index];
  
    // 만약 클릭 상태가 false일 때만 추천 API를 호출
    if (!currentContent.starClicked) {
      try {
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('recordId', currentContent.id);  // recordId를 FormData에 추가

        const response = await axios.post(`${BASE_URL}/record/recommend`, formData, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data',  // multipart/form-data 설정
          },
        });
  
        if (response.status === 200) {
          console.log('Star recommendation sent successfully');
          // 추천 수를 증가시킴
          currentContent.likes += 1; // 추천 수를 증가시킨다
              // 클릭 상태를 반전시킴
          currentContent.starClicked = true;
        } else {
          console.error('Failed to send recommendation');
        }
      } catch (error) {
        console.error('Error sending recommendation:', error);
      }
    }
  
    setGalleryContents(updatedContents); // 변경된 내용 갱신
  };
  
  
  return (
    <div className="gallery_wrap container">
    {isLoading ? (
      <h1 className='gallery-loading'>로딩중</h1>  // 로딩 중일 때 표시
    ) : (
      <div className='gallery-running'>
        <Header />
        <Nav name={'Gallery'} />
        {galleryContents.length > 0 && galleryContents[0].imgSrc && (
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
                  <img
                    src={galleryContents[0].starClicked ? StarFilled : Star}
                    alt="star"
                    className="star-img"
                    onClick={() => clickStar(0)}
                  />
                  <span>{galleryContents[0].likes}</span>
                  <img
                    src={galleryContents[0].bookmarks ? BookmarkFilled : Bookmark}
                    alt="bookmark"
                    className="bookmark-img"
                    onClick={() => toggleBookmark(0)}
                  />
                </div>
                <div className="details">
                  <span onClick={() => toDetailedGallery(galleryContents[0].id)}>자세히보기</span>
                  <img src={RightArrow} alt="right-arrow" />
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="design-gallery">
          <div className="gal-bk"><img src={Bk} alt="bk" /></div>
          <h1>도안 갤러리</h1>
          <div className="gal-container">
            <Swiper
              direction={'vertical'}
              spaceBetween={10}
              slidesPerView={3.5}
              onReachEnd={handleReachEnd}
            >
              {galleryContents.map((content, index) => (
                <SwiperSlide key={index}>
                  <div className="content">
                    <img
                      src={content.imgSrc}
                      alt="top-img"
                      className="top-img"
                      onClick={() => toDetailedGallery(content.id)}
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
                        <img
                          src={content.starClicked ? StarFilled : Star}
                          alt="star"
                          className="star-img"
                          onClick={() => clickStar(index)}
                        />
                        <span>{content.likes}</span>
                        <img
                          src={content.bookmarks ? BookmarkFilled : Bookmark}
                          alt="bookmark"
                          className="bookmark-img"
                          onClick={() => toggleBookmark(index)}
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
    )}
  </div>
  );
};

export default Gallery;
