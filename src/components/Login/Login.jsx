import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Title from '../../assets/img/Login/Title.png'
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [wrongpw, setWrongpw] = useState(false);
  const [notuser, setNotuser] = useState(false);

  const login = () => {
    axios
      .post('https://sutest.store/user/login', {
        userId: userId,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('jwtToken', response.data.data);
          navigate('/main')
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          setNotuser(false);
          setWrongpw(true);
        }
        else{
          setNotuser(true);
        }
        console.error('로그인 실패:', error.response || error.message);
      });
  }
  return (
    <div className='Login-wrap container'>
      <img src={Title} alt="title" className='title' />

      <div className="login_input">
        <input type="text" placeholder='아이디 입력' onChange={(e) => setUserId(e.target.value)} />
        {notuser&&<span className='error'>존재하지 않는 유저입니다.</span>}
      </div>
      <div className="login_input">
        <input type="password" placeholder='비밀번호 입력' onChange={(e) => setPassword(e.target.value)} />
        {wrongpw && <span className='error'>비밀번호가 일치하지 않습니다.</span>}
        
      </div>



      <div className="bottom">
        <button className="btn" onClick={login}>로그인하기</button>
        <Link to='/signup'>회원가입하러 가기</Link>
      </div>

    </div>
  )
}

export default Login
