import React, { useState } from 'react';
import Back from '../../assets/img/Login/back.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ModalTitle from '../../assets/img/Login/modal_title.png';
import CircledCheck from '../../assets/img/Login/Circled_Check.png';
import axios from 'axios';

const Signup = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [activeModal, setActiveModal] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(null); 
    const navigate = useNavigate();

    const back = () =>{
        navigate(-1);
    }
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setIsPasswordMatch(value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setIsPasswordMatch(password === value);
    };

    const gotoMain = () => {
        if (isPasswordMatch && nickname && password && userId ) {
            axios
                .post('http://13.209.30.143:8080/user/signup', {
                    userId: userId,
                    nickname: nickname,
                    password: password,
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log('회원가입 성공:', response.data);
                        setActiveModal(true);
                    }
                })
                .catch((error) => {
                    console.error('회원가입 실패:', error.response || error.message);
                });
        } else {
            alert('모든 필드를 올바르게 작성해주세요.');
        }
    };

    const checkDuplicate = () => {
        axios
            .get('http://13.209.30.143:8080/user/isDuplicate', {
                params: { userId },
            })
            .then((response) => {
                if (response.status === 200 ) {
                    setIsDuplicate(false);
                } else if (response.status === 409) {
                    setIsDuplicate(true);
                }
            })
            .catch((error) => {
                console.error('중복 확인 실패:', error.response || error.message);
            });
    };

    return (
        <div className="signup_wrap container">
            <div className="signup_header">
                <img src={Back} alt="" onClick={back} />
                <h1>회원가입</h1>
            </div>
            <div className="input_wrap">
                <div className="input_item">
                    <h5>닉네임</h5>
                    <input
                        type="text"
                        placeholder="닉네임 입력"
                        value={nickname}
                        onChange={handleNicknameChange}
                        maxLength={10}
                    />
                    <div className="count">{nickname.length} / 10</div>
                </div>
                <div className="input_item id">
                    <h5>아이디</h5>
                    <div className="check">
                        <input
                            type="text"
                            placeholder="아이디 입력"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <button onClick={checkDuplicate}>중복확인</button>
                    </div>
                    {isDuplicate === false && <div className="success">가입 가능한 아이디입니다.</div>}
                    {isDuplicate === true && <div className="error">이미 사용 중인 아이디입니다.</div>}
                </div>
                <div className="input_item">
                    <h5>비밀번호</h5>
                    <input
                        type="password"
                        placeholder="비밀번호 입력 (영어 대소문자, 숫자 포함 6자리 이상)"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="input_item">
                    <h5>비밀번호 확인</h5>
                    <input
                        type="password"
                        placeholder="비밀번호 확인 입력"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {!isPasswordMatch && (
                        <div className="error">비밀번호가 일치하지 않습니다.</div>
                    )}
                </div>
            </div>
            <div className="bot">
                <div className="btn" onClick={gotoMain}>회원가입 하기</div>
            </div>
            {activeModal && (
                <>
                    <div className="modal">
                        <img src={ModalTitle} alt="modal_title" />
                        <h5>실타래 마을의 일원이 되신 걸 <br /> 환영합니다!</h5>
                        <img src={CircledCheck} alt="" />
                        <Link to='/login' className="btn">로그인하러가기</Link>
                    </div>
                    <div className="blur"></div>
                </>
            )}
        </div>
    );
};

export default Signup;
