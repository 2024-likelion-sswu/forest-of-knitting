import React from 'react'
import { Link } from 'react-router-dom';
import Title from '../../assets/img/Login/Title.png'

const Login = () => {
  return (
    <div className='Login-wrap container'>
      <img src={Title} alt="title" className='title' />

      <div className="login_input">
        <input type="text" placeholder='아이디 입력' />
        <span className='error'></span>
      </div>
      <div className="login_input">
        <input type="password" placeholder='비밀번호 입력' />
        <span className='error'></span>
      </div>



      <div className="bottom">
        <div className="btn">로그인하기</div>
        <Link to='/signup'>회원가입하러 가기</Link>
      </div>

    </div>
  )
}

export default Login
