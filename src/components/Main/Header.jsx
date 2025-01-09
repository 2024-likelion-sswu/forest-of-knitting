import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Menu from '../../assets/img/Main/Menu.svg';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {setIsMenuOpen(!isMenuOpen);};
    const handleLogout = () => {
        const confirmLogout = window.confirm('로그아웃 하겠습니까?');
        if (confirmLogout) {
            localStorage.removeItem('jwtToken');
            navigate('/');
        }
    };
    const menuVariants = {
        hidden: {
            opacity: 0,
            x: 5,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
        exit: {
            opacity: 0,
            x: 5,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div className="Header_wrap">
            <img
                src={Menu}
                alt="메뉴"
                onClick={toggleMenu}
                className="menu-icon"
            />
            <AnimatePresence>
                {isMenuOpen && (
                    <div
                        className="menu"
                        onClick={toggleMenu}
                    >
                        <motion.div
                            className="headmotion-wrap"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={menuVariants}
                        >
                            <ul>
                                <li>뜨개하는 소녀님</li>
                                <li className="logout" onClick={handleLogout}>
                                    로그아웃
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
