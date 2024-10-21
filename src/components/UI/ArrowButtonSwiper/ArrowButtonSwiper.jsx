import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ArrowButtonSwiper.module.scss';
import CustomSwiper from '../CustomSwiper/CustomSwiper';

const ArrowButtonSwiper = ({
	slides,
	breakpoints,
	spaceBetween = 24,
	speed = 500,
	slidesPerGroup = 1,
	arrowBoxCustom,
	prevCustom,
	nextCustom
}) => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const swiperRef = useRef(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 767);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const swiperInstance = swiperRef.current?.swiper;

		if (swiperInstance && !isMobile) {
			if (prevRef.current && nextRef.current) {
				swiperInstance.params.navigation.prevEl = prevRef.current;
				swiperInstance.params.navigation.nextEl = nextRef.current;
				swiperInstance.navigation.init();
				swiperInstance.navigation.update();
			} else {
				swiperInstance.navigation.destroy();
			}
		}
	}, [isMobile, prevRef.current, nextRef.current]);

	useEffect(() => {
		const swiperInstance = swiperRef.current?.swiper;

		if (swiperInstance && !isMobile) {
			const updateArrowState = () => {
				if (prevRef.current && nextRef.current) {
					prevRef.current.classList.toggle(
						styles.disabled,
						swiperInstance.isBeginning
					);
					nextRef.current.classList.toggle(
						styles.disabled,
						swiperInstance.isEnd
					);
				}
			};

			swiperInstance.on('slideChange', updateArrowState);
			updateArrowState();
		}
	}, [isMobile]);

	return (
		<>
			<div
				className={`${styles.arrowBox} ${arrowBoxCustom ? arrowBoxCustom : ''}`}
			>
				{!isMobile && (
					<>
						<div
							ref={prevRef}
							className={`${styles.arrowButton} ${styles.prev} ${prevCustom ? prevCustom : ''}`}
							onClick={() => {
								if (isMobile) {
									swiperRef.current?.swiper.slidePrev();
								} else {
									swiperRef.current?.swiper.slideToSlideGroup(2);
								}
							}}
						/>
						<div
							ref={nextRef}
							className={`${styles.arrowButton} ${styles.next} ${nextCustom ? nextCustom : ''}`}
							onClick={() => {
								if (isMobile) {
									swiperRef.current?.swiper.slideNext();
								} else {
									swiperRef.current?.swiper.slideToSlideGroup(2);
								}
							}}
						/>
					</>
				)}
			</div>
			<CustomSwiper
				ref={swiperRef}
				slides={slides}
				breakpoints={breakpoints}
				slidesPerGroup={slidesPerGroup}
				spaceBetween={spaceBetween}
				speed={speed}
				navigationEnabled={!isMobile}
				paginationEnabled={isMobile}
				navigation={
					!isMobile && prevRef.current && nextRef.current
						? { prevEl: prevRef.current, nextEl: nextRef.current }
						: null
				}
			/>
		</>
	);
};

ArrowButtonSwiper.propTypes = {
	slides: PropTypes.arrayOf(PropTypes.node).isRequired,
	breakpoints: PropTypes.object.isRequired,
	spaceBetween: PropTypes.number,
	speed: PropTypes.number,
	arrowBoxCustom: PropTypes.string,
	prevCustom: PropTypes.string,
	nextCustom: PropTypes.string
};

export default ArrowButtonSwiper;
