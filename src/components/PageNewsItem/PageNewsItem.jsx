import React, { useEffect, useState } from 'react';
import NewsCard from '../News/NewsCard/NewsCard';
import CharityContainer from '../CharityContainer/CharityContainer';
import styles from './PageNewsItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsById, fetchNews } from '../../features/API/news/newsSlice';
import ArrowButtonSwiper from '../UI/ArrowButtonSwiper/ArrowButtonSwiper';

function getRandomNumbers(min, max, exclude) {
    const numbers = [];
    while (numbers.length < 3) {
        const random = Math.floor(Math.random() * (max - min)) + min;
        if (!numbers.includes(random) && random !== exclude) {
            numbers.push(random);
        }
    }
    return numbers;
}

function PageNewsItem({ id }) {
    const dispatch = useDispatch();

    const { news, currentNews, status, error } = useSelector((state) => state.news);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (status === 'idle' || currentNews?.id !== id) {
            dispatch(fetchNewsById(id));
        }
    }, [dispatch, status, id, currentNews?.id]);

    useEffect(() => {
        if (status === 'succeeded') {
            const foundNews = news.find((newsItem) => newsItem.id === id);
        
            if (foundNews) {
                setCurrentNews(foundNews);
            }
        }
    }, [id, news, status]);

    useEffect(() => {
        if (news.length > 0 && id) {
            setRandomNumbers(getRandomNumbers(1, news.length, Number(id)));
        }
    }, [news, id]);

    useEffect(() => {
        const windowSizeHandler = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", windowSizeHandler);

        return () => {
            window.removeEventListener("resize", windowSizeHandler);
        };
    }, []);

    if (status === 'loading' || !currentNews) {
        return <p>Загрузка...</p>;
    }

    if (status === 'succeeded' && news.length === 0) {
        dispatch(fetchNews());
    }

    if (status === 'failed') {
        return <p>Ошибка: {error}</p>;
    }

    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    if (!currentNews) {
        return <p>Новость не найдена.</p>;
    }

    const randomNewsFirst = news.find((newsItem) => newsItem.id === randomNumbers[0]);
    const randomNewsSecond = news.find((newsItem) => newsItem.id === randomNumbers[1]);
    const randomNewsThird = news.find((newsItem) => newsItem.id === randomNumbers[2]);

    const slides = Array(3).fill().map((_, idx) => (
        <picture className={styles.newsItem__picture} key={idx}>
            <img src={currentNews?.image} alt={currentNews?.title} className={styles.newsItem__img}/>
        </picture>
    ));

    const breakpoints = {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 }
    };
    
    return ( 
        <>
            <section className={`${styles.newsItem} container1200`}>
                <div className={styles.newsItem__hero}>
                    <span className={styles.newsItem__date}>{currentNews?.date}</span>
                    <h3 className={styles.newsItem__title}>{currentNews?.title}</h3>
                    <p className={styles.newsItem__description}>{currentNews?.description}</p>
                    <div className={styles.newsItem__slider}>
                        <ArrowButtonSwiper
                            slides={slides}
                            breakpoints={breakpoints}
                            spaceBetween={20}
                            speed={600}
                            arrowBoxCustom={styles.customArrowBox}
                            prevCustom={styles.customPrev}
	                        nextCustom={styles.customNext}
                        />
                    </div>  
                </div>
                <div className={`${styles.newsItem__others} ${styles.others}`}>
                    <h4 className={styles.others__title}>Другие новости</h4>
                    <div className={styles.others__container}>
                        {randomNewsFirst && (
                            <NewsCard 
                                id={randomNewsFirst.id}
                                key={randomNewsFirst.title}
                                imgSrc={randomNewsFirst.image}
                                imgAlt={randomNewsFirst.title}
                                title={randomNewsFirst.title}
                                description={randomNewsFirst.description}
                                date={randomNewsFirst.date}
                            />
                        )}
                        {randomNewsSecond && (
                            <NewsCard 
                                id={randomNewsSecond.id}
                                key={randomNewsSecond.title}
                                imgSrc={randomNewsSecond.image}
                                imgAlt={randomNewsSecond.title}
                                title={randomNewsSecond.title}
                                description={randomNewsSecond.description}
                                date={randomNewsSecond.date}
                            /> 
                        )}
                        {(windowWidth < 576 || windowWidth > 768 && windowWidth <= 1000) && randomNewsThird && (
                            <NewsCard 
                                id={randomNewsThird.id}
                                key={randomNewsThird.title}
                                imgSrc={randomNewsThird.image}
                                imgAlt={randomNewsThird.title}
                                title={randomNewsThird.title}
                                description={randomNewsThird.description}
                                date={randomNewsThird.date}
                            /> 
                        )}
                    </div>
                </div>
            </section>           
            <div className={`${styles.newsItem__banner} container1200`}>
                <CharityContainer />
            </div>
        </>
     );
}

export default PageNewsItem;