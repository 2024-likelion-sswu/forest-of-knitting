import React, { useState,useEffect } from 'react';
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
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required modules
import { Pagination } from 'swiper/modules';

const DetailedGallery = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const jwtToken = localStorage.getItem('jwtToken');
  const recordId = localStorage.getItem('detailedGalleryID');
  const [likes,setLikes]= useState(localStorage.getItem('likes'));
  const [likeClicked, setLikeClicked] = useState(true);

  //local에서 like눌렸는지 가져오기
  useEffect(() => {
    const starClicked = localStorage.getItem('starClicked');
    if (starClicked === 'true') {
      setLikeClicked(true);
    } else {
      setLikeClicked(false);
    }
  }, []);
  

  const [galleryContent, setGalleryContent] = useState({
    title: '마루킁킁뜨개했삼',
    time: '6시간 18분',
    preference: 4,
    bookmarks: true,
    imgSrc: [Example, Example02], 
    owner: '뜨개구리를만들고싶은소녀',
  });

  console.log(likeClicked);
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
          preference: responseContent.knitRecord.level,
          bookmarks: responseContent.isBooked,
          imgSrc: [responseContent.knitImgUrl, responseContent.designImgUrl],
          owner: responseContent.knitRecord.user.nickname,
        });
      }
    } catch (error) {
      console.error("Failed to fetch gallery details:", error.message);
    }
  };
  
  useEffect(() => {
    getDetailGallery ();
  }, []);

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

  const toggleBookmark = async () => {
    try {
      if (galleryContent.bookmarks) {
        await cancelBookmark(recordId);
        setGalleryContent((prev) => ({
          ...prev,
          bookmarks: false,
        }));
      } else {
        const time = 0;
        const isCompleted = false;
        await updateSavedDesign(recordId, time, isCompleted);
        setGalleryContent((prev) => ({
          ...prev,
          bookmarks: true,
        }));
      }
    } catch (error) {
      console.error("Bookmark toggle error:", error);
    }
  };


    //추천하기
    const clickStar = async () => {
      if (!likeClicked) {
        try {
          const formData = new FormData();
          formData.append('recordId', recordId);
    
          const response = await axios.post(`${BASE_URL}/record/recommend`, formData, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.status === 200) {
            setLikeClicked(true);
            // 좋아요 수 업데이트
            setLikes((prevLikes) => Number(prevLikes) + 1);
            setGalleryContent((prevContent) => ({
              ...prevContent,
              likes: Number(prevContent.likes) + 1,
              starClicked: true,
            }));
          } else {
            console.error('Failed to send recommendation');
          }
        } catch (error) {
          console.error('Error sending recommendation:', error);
        }
      } else {
        console.log('이미 추천되었습니다.');
      }
    };
    
    
    useEffect(() => {
      console.log('likeClicked state changed:', likeClicked);
    }, [likeClicked]);
    
  return (
    <div className="DetailedGallery-wrap container">
      <Header />
      <Nav name={'Gallery'}/>
      <img src={Bk} alt="bk" className="detail-bk" />
      <div className="detail-container">
        <Swiper        pagination={{ clickable: true }} modules={[Pagination]} spaceBetween={10}>
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
                <img src={likeClicked? StarFilled : Star} alt="star" className="star-img" onClick={clickStar} />
                <h4>{likes}</h4>
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
