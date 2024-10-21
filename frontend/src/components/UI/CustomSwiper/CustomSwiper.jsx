import React, { forwardRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import PropTypes from 'prop-types';
import styles from './CustomSwiper.module.scss';

const CustomSwiper = forwardRef(({
    slides,
    breakpoints = {},
    spaceBetween = 0,
    navigationEnabled = false,
    paginationEnabled = false,
    navigation = null,
    onSlideChange,
}, ref) => {
    return (
        <div className={styles.swiperWrapper}>
            <Swiper
                ref={ref}
                spaceBetween={spaceBetween}
                slidesPerView={1}
                breakpoints={breakpoints}
                slidesPerGroup={1}
                speed={600}
                navigation={navigationEnabled && navigation ? navigation : false}
                pagination={paginationEnabled ? {
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<span class="${className} ${styles.customBullet}"></span>`;
                    },
                } : false}
                onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
                modules={[Navigation, Pagination]}
            >
                {slides.map((slideContent, index) => (
                    <SwiperSlide key={index}>
                        {slideContent}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
});

CustomSwiper.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.node).isRequired,
    breakpoints: PropTypes.object,
    spaceBetween: PropTypes.number,
    navigationEnabled: PropTypes.bool,
    paginationEnabled: PropTypes.bool,
    navigation: PropTypes.object,
    onSlideChange: PropTypes.func,
};

export default CustomSwiper;
