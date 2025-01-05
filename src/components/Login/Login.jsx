import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Title from '../../assets/img/Login/Title.png'
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const login = () => {
    axios
      .post('http://13.209.30.143:8080/user/login', {
        userId: userId,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('jwtToken',  response.data);
          navigate('/main')

        }
      })
      .catch((error) => {
        console.error('로그인 실패:', error.response || error.message);
      });
  }
  return (
    <div className='Login-wrap container'>
      <img src={Title} alt="title" className='title' />

      <div className="login_input">
        <input type="text" placeholder='아이디 입력'  onChange={(e) => setUserId(e.target.value)}/>
        <span className='error'></span>
      </div>
      <div className="login_input">
        <input type="password" placeholder='비밀번호 입력' onChange={(e)=> setPassword(e.target.value)} />
        <span className='error'></span>
      </div>



      <div className="bottom">
        <div className="btn" onClick={login}>로그인하기</div>
        <Link to='/signup'>회원가입하러 가기</Link>
      </div>

    </div>
  )
}

export default Login
