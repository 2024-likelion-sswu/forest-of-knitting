import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TimerD = () =>  {
      const navigate = useNavigate();
  const [time, setTime] = useState(0); // 타이머 시간 (초 단위)
  const [isRunning, setIsRunning] = useState(false); // 타이머 상태
  const [save, setSave] = useState(false);
  const [buttonColor, setButtonColor] = useState('#B5ABA4'); 
  const [designWrite, setDesignWrite] = useState(false);
  const [popupClicked, setPopupclicked] = useState(false);

  // 타이머 시작
  const startTimer = () => {
    setIsRunning(true);
    setButtonColor('#4b3f2f');
  };

  // 타이머 종료
  const stopTimer = () => {
    setIsRunning(false);
    setButtonColor('#B5ABA4');
    //팝업
    setSave(true);
  };

  // 시간 형식 변환 (MM:SS)
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // useEffect로 타이머 동작 구현
  React.useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);


  //완성한 도안에 기록할게요!
  const popupOk = () =>{
    setDesignWrite(true);
    setPopupclicked(true);
    setSave(false);
    setTimeout(() => {
        setPopupclicked(false);
        navigate('/knittime');
      }, 1000);
   
  }

  const popupNo = () =>{
    setPopupclicked(true);
    setSave(false);
    setTimeout(() => {
        setPopupclicked(false);
      }, 1000);
    
  }

  const popupOut = () => {
    setSave(false);
  }

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
          <div className="dtimer-content">도안을 완성했나요?<br/>
          <div className='dtimer-btn'>
            <button onClick={popupOk}>네!</button>
            <button onClick={popupNo}>아직.</button>
          </div>
          </div>
          <div className="popup-text-bk" onClick={popupOut}></div>
        </div>
        )}
        {popupClicked && (
  <div className="popup-text">
    {designWrite ? (
      <>
        완성한 도안에<br />기록할게요!
      </>
    ) : (
        <>
      뜨개한 시간을<br/> 저장할게요!
      </>
    )}
  </div>
)}
        {popupClicked &&<div className="popup-text-bk" onClick={popupOut}></div>}
    </div>
  );
};

export default TimerD
