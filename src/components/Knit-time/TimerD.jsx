import React,{ useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TimerD = () =>  {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const jwtToken = localStorage.getItem('jwtToken');
  const recordId = localStorage.getItem('detailedGalleryID');
      const navigate = useNavigate();
      const [time, setTime] = useState(1);
      //const [time, setTime] = useState(localStorage.getItem('DesignTime')); // 타이머 시간 (초 단위)
  const [isRunning, setIsRunning] = useState(false); // 타이머 상태
  const [save, setSave] = useState(false);
  const [buttonColor, setButtonColor] = useState('#B5ABA4'); 
  const [designWrite, setDesignWrite] = useState(false);
  const [popupClicked, setPopupclicked] = useState(false);
  const isBooked = localStorage.getItem('isBooked');

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
    const hours = String(Math.floor(time / 60)).padStart(2, '0');
    const minutes = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  

  // useEffect로 타이머 동작 구현
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // 1분씩 증가하도록 수정
      }, 60000); // 1분마다 실행 (60,000 ms)
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
      if(time/60 > 0){
        updateCompletedDesign(recordId, time,true);
      }
      navigate('/knittime');
    }, 1000);
 
}

  const popupNo = () =>{
    setPopupclicked(true);
    setSave(false);
    updateSavedDesign(recordId, time,false);
    setTimeout(() => {
        setPopupclicked(false);

        navigate('/knittime');
      }, 1000);
    
  }

  const popupOut = () => {
    setSave(false);
  }

    // 완료한 디자인 업데이트
    const updateCompletedDesign = async (id, time, isCompleted = true) => {
      console.log(id, time, isCompleted);
      try {
        const formData = new FormData();
        formData.append('knitRecordId', id?.toString() || '');
        formData.append('hour', Math.floor(time / 60)?.toString() || '');
        formData.append('minute', (time % 60)?.toString() || '');
        formData.append('isCompleted', isCompleted ? 'true' : 'false');
  
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
  
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

  // 저장된 디자인 업데이트
  const updateSavedDesign = async (id, time, isCompleted = false) => {
    console.log(id, time, isCompleted);
    try {
      const formData = new FormData();
      formData.append('knitRecordId', id?.toString() || '');
      formData.append('hour', Math.floor(time / 60)?.toString() || '');
      formData.append('minute', (time % 60)?.toString() || '');
      formData.append('isCompleted', isCompleted ? 'true' : 'false');

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

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
