import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Nav from './Nav'
import Grove from '../../assets/img/Main/grove.png'
import Socks from '../../assets/img/Main/socks.png'
import Scarf from '../../assets/img/Main/scarf.png'
import axios from 'axios';

const Main = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [leftHour, setLeftHour] = useState(0);
    const [leftMin, setLeftMin] = useState(0);
    const [progressPercent, setProgressPercent] = useState(0);

    const items = [
        { name: '양말', image: Socks },
        { name: '장갑', image: Grove },
        { name: '목도리', image: Scarf },
    ];

    const fecthHome = (token) => {
        axios
            .get('https://sutest.store/user/home ', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
    
                setUserData(response.data.data);
                fecthTime();
            })
            .catch((error) => {
                console.error(error.response || error.message);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            console.error(' 로그인이 필요합니다.');
            navigate('/login');
            return;
        }
        fecthHome(token);
    }, [navigate]);

    const fecthTime = () => {
        if (!userData) return;

        const totalHoursForStep = userData.step * 10;
        const currentTotalMinutes = userData.hour * 60 + userData.minute;
        const totalMinutesForStep = totalHoursForStep * 60;

        const remainingMinutes = totalMinutesForStep - currentTotalMinutes;

        if (remainingMinutes < 0) {
            setLeftHour(0);
            setLeftMin(0);
        } else {
            setLeftHour(Math.floor(remainingMinutes / 60));
            setLeftMin(remainingMinutes % 60);
            const progress = ((totalMinutesForStep - remainingMinutes) / totalMinutesForStep) * 100;
            setProgressPercent(progress);
        }
    };

    return (
        <div className='Main_wrap container'>
            <Header />
            <Nav name={'Main'} />

            {!userData ? (
                <div>로딩 중...</div>
            ) : (
                <div className="knit">
                    <h3 className='name'>{userData.nickname}님</h3>
                    <h1>뜨개방</h1>
                    <div className="count">
                        <div className="all">
                            <p>내가 뜨개질 한 시간</p>
                            <span>{userData.hour}시간 {userData.minute}분</span>
                        </div>
                        <div className="item">
                            <p>다음 아이템 획득까지 남은 시간</p>
                            <span>{leftHour}시간 {leftMin}분</span>
                        </div>
                        <div className="progress_bar">
                            <div className="bar"  style={{ width: `${progressPercent}%` }}></div>
                            <div className="back"></div>
                            <div className="time">
                                <p className="start">{userData.step * 10 - 10}</p>
                                <p className="end">{userData.step * 10}</p>
                            </div>
                        </div>
                        <div className="item_list">
                            <ul>
                                {items.slice(0, userData.step-1).map((item, index) => (
                                    <li key={index}>
                                        <img src={item.image} alt={item.name} />
                                    </li>
                                ))}

                                <li  className="empty"></li>

                            </ul>
                        </div>
                    </div>
                    <div className="my_item">
                        <div className="level">
                            <p>{userData.step}단계 : {items[userData.step - 1]?.name}</p>
                        </div>
                        <div className="lv_item">
                            <img
                                src={items[userData.step - 1]?.image}
                                alt={items[userData.step - 1]?.name}
                                style={{ height: `${progressPercent}%` }}
                                className="front"
                            />
                            <img
                                src={items[userData.step - 1]?.image}
                                alt={items[userData.step - 1]?.name}
                                className="back"
                            />
                        </div>
                    </div>
                </div>
            )}
            <Link className="btn" to='/record'>뜨개 기록 추가하기</Link>
        </div>
    );
};

export default Main;

