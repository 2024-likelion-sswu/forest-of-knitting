import React, { useState, useRef } from 'react';
import Header from './Header';
import Nav from './Nav';
import Star from '../../assets/img/Main/Star.svg';
import FullStar from '../../assets/img/Main/Star-f.svg';
import Plus from '../../assets/img/Main/Plus.svg';
import None from '../../assets/img/Main/noneimage.png';
import SwithOn from '../../assets/img/Main/SwitchOn.png'
import SwithOff from '../../assets/img/Main/Switchoff.png'
import { img } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

const RecordKnit = () => {
    const [designImage, setDesignImage] = useState(null);
    const [completeImage, setCompleteImage] = useState(null);
    const [difficulty, setDifficulty] = useState(0);
    const [share, setShare] = useState(true);
    const navigate = useNavigate();

    const designInputRef = useRef(null);
    const completeInputRef = useRef(null);

    const handleShare = () => {
        setShare(!share);
    }

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStarClick = (index) => {
        setDifficulty(index + 1);
    };

    const handleImageClick = (inputRef) => {
        inputRef.current.click();
    };

    const save = () =>{
        alert("저장되었습니다.");
        navigate('/main')
    }

    return (
        <div className='Record_wrap container'>
            <Header />
            <Nav name={'Main'} />

            <div className="wrap">
                <div className="title">나의 뜨개 기록</div>
                <div className="paper">
                    <div className="input_title">
                        <input type="text" placeholder='제목을 입력해주세요' />
                    </div>
                    <div className="save_time">
                        <h2>걸린시간</h2>
                        <div className="time">
                            <div className="hours">
                                <input type="text" placeholder='00' />
                            </div>
                            :
                            <div className="min">
                                <input type="text" placeholder='00' />
                            </div>
                        </div>
                    </div>
                    <div className="images">
                        <div className="design">
                            <p>도안 이미지 추가 <span><img src={Plus} alt="" /></span></p>
                            <div className="image_picker" onClick={() => handleImageClick(designInputRef)}>
                                {designImage ? <img src={designImage} alt="Design Preview" /> : <img src={None} alt="Preview" />}
                                <input
                                    ref={designInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, setDesignImage)}
                                    style={{ display: 'none' }} 
                                />
                            </div>
                        </div>
                        <div className="complete">
                            <p>완성 이미지 추가 <span><img src={Plus} alt="" /></span></p>
                            <div className="image_picker" onClick={() => handleImageClick(completeInputRef)}>
                                {completeImage ? <img src={completeImage} alt="Complete Preview" /> : <img src={None} alt="Preview" />}
                                <input
                                    ref={completeInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, setCompleteImage)}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="defficulty">
                        <p>난이도</p>
                        <div className="stars">
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={index < difficulty ? FullStar : Star}
                                    alt={`Star ${index + 1}`}
                                    onClick={() => handleStarClick(index)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="show_control">
                    <div className="d">
                        <p>공개 여부</p>
                        {share ? <img src={SwithOn} onClick={handleShare} /> : <img src={SwithOff} onClick={handleShare} />}
                    </div>

                </div>
            </div>
            <div className="btn" onClick={save}>저장하기</div>
        </div>
    );
};

export default RecordKnit;
