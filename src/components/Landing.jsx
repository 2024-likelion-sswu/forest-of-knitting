import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../assets/img/Landing/title.png';
import Icon from '../assets/img/Landing/icon.png';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className='landing container'>
      <img src={Title} alt="Title" />
      <img src={Icon} alt="Icon" />
    </div>
  );
};

export default Landing;
