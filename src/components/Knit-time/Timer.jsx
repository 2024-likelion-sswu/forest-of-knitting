import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Timer = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL; 
  const jwtToken = localStorage.getItem('jwtToken'); 
      const navigate = useNavigate();
  const [time, setTime] = useState(1); // 타이머 시간 (분 단위)
  const [isRunning, setIsRunning] = useState(false); // 타이머 상태
  const [save, setSave] = useState(false);
  const [buttonColor, setButtonColor] = useState('#B5ABA4'); 
  const updateAccumulatedTime = async (hour, minute) => {

  
    try {
      // PATCH 요청을 보낼 URL에 쿼리 파라미터를 추가
      const response = await fetch(`${BASE_URL}/updateAccTime?hour=${hour}&minute=${minute}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // JWT 인증이 필요하다면 이 헤더를 추가
          'Content-Type': 'application/json',
        },
      });
  
      // 응답이 성공적인지 확인
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);  // 성공 메시지 출력
      } else {
        console.error('Failed to update accumulated time');
      }
    } catch (error) {
      console.error('Error updating accumulated time:', error);
    }
  };
  
  // 타이머 시작
  const startTimer = () => {
    setIsRunning(true);
    setButtonColor('#4b3f2f');
  };

  // 타이머 종료
  const stopTimer = () => {
    setIsRunning(false);
    setButtonColor('#B5ABA4');
    const hours = Math.floor(time / 60); 
    const minutes = time % 60; 
    updateAccumulatedTime(hours, minutes);
    //팝업
    setSave(true);
    setTimeout(() => {
        setSave(false);

        navigate('/main');
      }, 3000); 
  };

  // 시간 형식 변환 (hh:mm)
  const formatTime = (time) => {
    const hours = String(Math.floor(time / 60)).padStart(2, '0'); // 시간 계산
    const minutes = String(time % 60).padStart(2, '0'); // 분 계산
    return `${hours}:${minutes}`; // hh:mm 형식으로 반환
  };

  // useEffect로 타이머 동작 구현
  React.useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 60000); // 1분 단위로 타이머 진행
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className="timer-wrapper">
      <div className="timer-display"  style={{ color: buttonColor }}>{formatTime(time)}</div>
      <div className="timer-buttons">
        <button onClick={startTimer} className='startTimer'>시작</button>
        <button onClick={stopTimer} className='stopTimer'>종료</button>
      </div>
        {/* isRunning이 true일 때만 popup 표시 */}
        {save && (
        <div className="popup">
          <div className="content">뜨개한 시간을<br/>저장할게요!</div>
          <div className="popup-bk"></div>
        </div>
        )}
    </div>
  );
};

export default Timer;
