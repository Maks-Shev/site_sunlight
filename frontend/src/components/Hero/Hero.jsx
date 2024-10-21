import React from 'react';
import './Hero.scss';
import { DonationButton } from './DonationButton/DonationButton.jsx';
import { HelpButton } from './HelpButton/HelpButton.jsx';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';

export function Hero() {   

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);  // ширина экрана

    // отслеживаем изменение ширины экрана
    useEffect(() => {
        const windowSizeHandler = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", windowSizeHandler);
    
        return () => {
          window.removeEventListener("resize", windowSizeHandler);
        };
      }, []);           
    
    return (
        <section className='hero'>     
            <div className='hero__container'>
                <div className='hero__header'>
                    <Header className="custom-header"/>
                </div>
                <h1 className='hero__title'>
                    Центр для особых детей {windowWidth > 576 && <span className='hero__accent'>«СОЛНЕЧНЫЙ КРУГ»</span>}
                </h1>
                <Link to={'/about'} className='hero__link'>
                    {windowWidth > 576 ? 'Подробнее о центре' : '«СОЛНЕЧНЫЙ КРУГ»'}
                </Link>
                {/* <a href="#" className='hero__link'>
                    {windowWidth > 576 ? 'Подробнее о центре' : '«СОЛНЕЧНЫЙ КРУГ»'}
                </a> */}
            </div>       
            <div className='hero__donation donation'>
                <p className='donation__description'>
                    Даже самый маленький взнос становится огромным, если поступает каждый месяц
                </p>
                <div className='donation__buttons'>
                    <DonationButton donationValue={250}/>
                    <DonationButton donationValue={500}/>
                    <DonationButton donationValue={750}/>
                    <DonationButton donationValue={1000}/>
                    <DonationButton donationValue={'Другая сумма'}/>
                    <HelpButton />
                </div>
                <p className='donation__cbp'>
                    Пожертвование через
                </p>
            </div>
        </section>
    );
}

export default Hero;