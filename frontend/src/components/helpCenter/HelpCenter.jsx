import React, { useState, useEffect } from 'react';
import HelpCenterItem from './HelpCenterItem';
import TitleBlock from '../../components/UI/TitleBlock/TitleBlock';
import LinkStar from '../../components/UI/TitleBlock/LinkStar';
import ArrowButtonSwiper from '../UI/ArrowButtonSwiper/ArrowButtonSwiper';
import CustomSwiper from '../UI/CustomSwiper/CustomSwiper';
import './HelpCenter.scss';

const HelpCenter = () => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const slides = [
        <HelpCenterItem key={1} />,
        <HelpCenterItem key={2} />,
        <HelpCenterItem key={3} />,
        <HelpCenterItem key={4} />,
    ];

    const breakpoints = {
        0: { slidesPerView: 1, slidesPerGroup: 1 },
        1001: { slidesPerView: 2, slidesPerGroup: 2 },
    };

    return (
        <section className='help-center'>
            <div className='help-center__header container'>
                <TitleBlock title='Помощь центру' />
                {!isMobileView && <LinkStar linkText='Подробнее' linkHref='#' />}
            </div>

            <div className='help-center__swiper'>
                {isMobileView ? (
                    <CustomSwiper 
                        slides={slides} 
                        breakpoints={breakpoints}
                        slidesPerGroup={1} 
                        spaceBetween={24} 
                        navigationEnabled={false}
                        paginationEnabled={true}
                        speed={500}
                    />
                ) : (
                    <ArrowButtonSwiper 
                        slides={slides} 
                        breakpoints={breakpoints} 
                        slidesPerGroup={1}
                        spaceBetween={24} 
                        speed={500}
                    />
                )}
            </div>

            <div className='help-center__footer container'>
                {isMobileView && <LinkStar linkText='Подробнее' linkHref='#' />}
            </div>
        </section>
    );
};

export default HelpCenter;