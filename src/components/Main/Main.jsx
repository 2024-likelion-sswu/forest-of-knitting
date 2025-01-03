import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'
import Nav from './Nav'
import Grove from '../../assets/img/Main/grove.png'
import Socks from '../../assets/img/Main/socks.png'
import Scarf from '../../assets/img/Main/scarf.png'

const Main = () => {
    return (
        <div className='Main_wrap container'>
            <Header />
            <Nav name={'Main'} />

            <div className="knit">
                <h3 className='name'>뜨개구리를 뜨고 싶은 소녀</h3>
                <h1>뜨개방</h1>
                <div className="count">
                    <div className="all">
                        <p>내가 뜨개질 한 시간</p>
                        <span>22시간 47분</span>
                    </div>
                    <div className="item">
                        <p>다음 아이템 획득까지 남은 시간</p>
                        <span>7시간 13분</span>
                    </div>
                    <div className="progress_bar">
                        <div className="bar" style={{ width: '50%' }}></div>
                        <div className="back"></div>
                        <div className="time">
                            <p className="start">20</p>
                            <p className="end">30</p>
                        </div>

                    </div>
                    <div className="item_list">
                        <ul>
                            <li><img src={Socks} alt="" /></li>
                            <li><img src={Grove} alt="" /></li>
                            <li className='empty'> </li>
                        </ul>
                    </div>
                </div>
                <div className="my_item">
                    <div className="level">
                        <p>3단계 : 목도리</p>
                    </div>
                    <div className="lv_item">
                        <img src={Scarf} alt="" className='front' />
                        <img src={Scarf} alt="" className='back' />
                    </div>

                </div>
            </div>
            <Link className="btn" to='/record'>뜨개 기록 추가하기</Link>
        </div>
    )
}

export default Main