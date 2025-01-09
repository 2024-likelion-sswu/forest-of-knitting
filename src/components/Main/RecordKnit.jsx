import React, { useState, useRef } from 'react';
import axios from 'axios';
import Header from './Header';
import Nav from './Nav';
import Star from '../../assets/img/Main/Star.svg';
import FullStar from '../../assets/img/Main/Star-f.svg';
import Plus from '../../assets/img/Main/Plus.svg';
import None from '../../assets/img/Main/noneimage.png';
import SwithOn from '../../assets/img/Main/SwitchOn.png';
import SwithOff from '../../assets/img/Main/Switchoff.png';
import { useNavigate } from 'react-router-dom';

const RecordKnit = () => {
    const [designImage, setDesignImage] = useState([]);
    const [completeImage, setCompleteImage] = useState([]);
    const [difficulty, setDifficulty] = useState(0);
    const [share, setShare] = useState(true);
    const [title, setTitle] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const navigate = useNavigate();

    const designInputRef = useRef(null);
    const completeInputRef = useRef(null);

    const handleShare = () => {
        setShare(!share);
    };

    const handleImageChange = (e, setImage) => {
        const files = e.target.files;
        if (files.length) {
            const fileArray = Array.from(files);
            setImage(prevState => [...prevState, ...fileArray]);
        }
    };

    const handleStarClick = (index) => {
        setDifficulty(index + 1);
    };

    const handleImageClick = (inputRef) => {
        inputRef.current.click();
    };

    const save = () => {
        if (isNaN(hour) || isNaN(minute) || hour < 0 || minute < 0 || minute >= 60) {
            alert('올바른 시간을 입력해주세요.');
            return;
        }

        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('hour', hour || 0);
        formData.append('minute', minute || 0);
        formData.append('level', difficulty);
        formData.append('isPosted', share);

        if (designImage.length > 0) {
            designImage.forEach((image, index) => {
                formData.append('designImages', image, `designImage_${index}.png`);
            });
        }

        if (completeImage.length > 0) {
            completeImage.forEach((image, index) => {
                formData.append('knitImages', image, `completeImage_${index}.png`);
            });
        }

        const token = localStorage.getItem('jwtToken');

        if (title && hour && minute && difficulty) {
            axios
                .post('https://sutest.store/record/create', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        alert('저장되었습니다.');
                        navigate('/main');
                    }
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                    alert('저장에 실패했습니다. 다시 시도해주세요.');
                });
        }
        else{
            alert("모든 필드를 작성하세요")
        }
    };

    return (
        <div className='Record_wrap container'>
            <Header />
            <Nav name={'Main'} />

            <div className="wrap">
                <div className="title">나의 뜨개 기록</div>
                <div className="paper">
                    <div className="input_title">
                        <input
                            type="text"
                            placeholder='제목을 입력해주세요'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="save_time">
                        <h2>걸린시간</h2>
                        <div className="time">
                            <div className="hours">
                                <input
                                    type="text"
                                    placeholder='00'
                                    value={hour}
                                    onChange={(e) => setHour(e.target.value)}
                                />
                            </div>
                            :
                            <div className="min">
                                <input
                                    type="text"
                                    placeholder='00'
                                    value={minute}
                                    onChange={(e) => setMinute(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="images">
                        <div className="design">
                            <p>도안 이미지 추가 <span><img src={Plus} alt="" /></span></p>
                            <div className="image_picker" onClick={() => handleImageClick(designInputRef)}>
                                {designImage.length > 0 ? (
                                    designImage.map((image, index) => (
                                        <img key={index} src={URL.createObjectURL(image)} alt={`Design Preview ${index + 1}`} />
                                    ))
                                ) : (
                                    <img src={None} alt="Preview" />
                                )}
                                <input
                                    ref={designInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, setDesignImage)}
                                    style={{ display: 'none' }}
                                    multiple
                                />
                            </div>
                        </div>
                        <div className="complete">
                            <p>완성 이미지 추가 <span><img src={Plus} alt="" /></span></p>
                            <div className="image_picker" onClick={() => handleImageClick(completeInputRef)}>
                                {completeImage.length > 0 ? (
                                    completeImage.map((image, index) => (
                                        <img key={index} src={URL.createObjectURL(image)} alt={`Complete Preview ${index + 1}`} />
                                    ))
                                ) : (
                                    <img src={None} alt="Preview" />
                                )}
                                <input
                                    ref={completeInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, setCompleteImage)}
                                    style={{ display: 'none' }}
                                    multiple
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
