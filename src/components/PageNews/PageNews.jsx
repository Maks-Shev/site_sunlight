import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CharityContainer from '../CharityContainer/CharityContainer';
import NewsCard from '../News/NewsCard/NewsCard';
import CustomSwiper from '../UI/CustomSwiper/CustomSwiper';
import PaginationNum from '../UI/PaginationNum/PaginationNum';
import styles from './PageNews.module.scss';
import { fetchNews } from '../../features/API/news/newsSlice';

function PageNews() {
    const dispatch = useDispatch();
    const newsList = useSelector((state) => state.news.news);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState(1);
    const [slidesPerView, setSlidesPerView] = useState(3);

    const swiperRef = useRef(null);

    useEffect(() => {
        if (newsList.length === 0) {
            dispatch(fetchNews());
        }
    }, [dispatch, newsList.length]);

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (windowWidth <= 576) {
                setSlidesPerView(1);
            } else if (windowWidth <= 768) {
                setSlidesPerView(2);
            } else {
                setSlidesPerView(3);
            }
        };
        updateSlidesPerView();

        const windowSizeHandler = () => {
            setWindowWidth(window.innerWidth);
            updateSlidesPerView();
        };
        window.addEventListener("resize", windowSizeHandler);
    
        return () => {
            window.removeEventListener("resize", windowSizeHandler);
        };
    }, [windowWidth]);

    const totalPages = Math.ceil(newsList.length / 6);

    const handleSlideChange = (activeIndex) => {
        const newPage = Math.floor(activeIndex / 2) + 1;
        setCurrentPage(newPage);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const newIndex = (page - 1) * 2;
        swiperRef.current.swiper.slideTo(newIndex);
    };

    const groupedSlides = [];
    for (let i = 0; i < newsList.length; i += 2) {
        groupedSlides.push(newsList.slice(i, i + 4));
    }

    return (
        <>
            <div className={`${styles.newsPage__container} container1200`}>
                <h2 className={styles.newsPage__title}>НОВОСТИ</h2>
                <div className={styles.newsPage__hero}>
                    <div className={styles.newsPage__description}>
                        <p>
                            Каждый день мы помогаем особым семьям Тольятти жить полноценной жизнью. Наша миссия: сопровождение семьи, в которой воспитывается ребёнок с инвалидностью с момента рождения до момента ухода.
                        </p>
                        <p>
                            В России дети со средней и тяжелой степенью инвалидности из-за отсутствия специализированных заведений лишены конституционного права на образование, а бесконечные реабилитации в отрыве от дома лишают их детства обычных детей. 
                        </p>

                    </div>
                    <picture>
                        <source srcSet="/img/news/news-hero-mobile.webp" media="(max-width: 576px)"/>
                        <source srcSet="/img/news/news-hero-tablet.webp" media="(max-width: 1000px)"/>
                        <img src="/img/news/news-hero-desktop.webp" alt="" className={styles.newsPage__img}/>
                    </picture>
                </div>
                <div className={styles.newsPage__slider}>
                    <CustomSwiper
                        ref={swiperRef}
                        slides={groupedSlides.map((group, index) => (
                            <div key={index} className={styles.slideGroup}>
                                <div className={styles.row}>
                                    {group.slice(0, 2).map((item) => (
                                        <NewsCard
                                            className={styles.newsPage__slide}
                                            id={item.id}
                                            key={item.id}
                                            imgSrc={item.image}
                                            imgAlt={item.title}
                                            title={item.title}
                                            description={item.description}
                                            date={item.date}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        breakpoints={{
                            375: { 
                                slidesPerView: 1, 
                                slidesPerGroup: 1, 
                                spaceBetween: 30 }, 
                            576: { 
                                slidesPerView: 2,
                                slidesPerGroup: 1, 
                                spaceBetween: 30 }, 
                            768: { 
                                slidesPerView: 3, 
                                slidesPerGroup: 1, 
                                spaceBetween: 20 }, 
                            1000: { 
                                slidesPerView: 3, 
                                slidesPerGroup: 1, 
                                spaceBetween: 60 }, 
                            }} 
                            spaceBetween={windowWidth > 1000 ? 60 : windowWidth > 576 ? 20 : 30} 
                            navigationEnabled={true} 
                            paginationEnabled={false} 
                            onSlideChange={handleSlideChange} 
                        /> 
                    </div> 
                <div className={styles.newsPage__pagination}> 
                    <PaginationNum currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> 
                </div> 
                <div> 
                    <CharityContainer /> 
                </div> 
            </div> 
        </> 
    );
}

export default PageNews;