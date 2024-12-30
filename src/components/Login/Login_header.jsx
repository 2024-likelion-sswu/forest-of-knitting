import React from 'react'
import Back_btn from '../../assets/img/Login/back.svg'

const Login_header = () => {
  return (
    <div className='login_header'>
        <img src={Back_btn} alt="뒤로가기" />
        <h1> 회원가입</h1>
    </div>
  )
}

export default Login_header
