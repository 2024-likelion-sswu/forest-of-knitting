import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../../assets/img/Main/home.svg'
import Archive from '../../assets/img/Main/archive.svg'
import Like from '../../assets/img/Main/like.svg'

const Nav = () => {
    return (
        <div className='Nav_wrap'>
            <Link to='/Archive'><img src={Archive} alt="Archive" /></Link>
            <Link to='/'><img src={Home} alt="Home" /></Link>
            <Link to='/Like'><img src={Like} alt="Like" /></Link>
        </div>
    )
}

export default Nav