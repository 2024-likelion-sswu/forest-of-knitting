import React from 'react'
import Menu from '../../assets/img/Main/Menu.svg'

const Header = () => {
    return (
        <div className='Header_wrap'>
            <img src={Menu} alt="메뉴" />
        </div>
    )
}

export default Header