import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../assets/img/Main/home.svg'
import Archive from '../../assets/img/Main/archive.svg'
import Like from '../../assets/img/Main/like.svg'

const Nav = () => {
    return (
        <div className='Nav_wrap'>
            <Link to='/Archive'>
                <div className='nav-btn'>
                    <img src={Archive} alt="Archive" className='archive-btn'/>
                </div>
            </Link>
            <Link to='/'><div className='nav-btn'><img src={Home} alt="Home" className='home-btn'/></div></Link>
            <Link to='/Like'><div className='nav-btn'><img src={Like} alt="Like" className='like-btn'/></div></Link>
        </div>
    )
}

export default Nav