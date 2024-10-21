import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Specialists.module.scss';
import directorMobile from '/img/home/Specialists/directorMobile.webp';
import SpecialistCard from './SpecialistCard';
import TitleBlock from '../../components/UI/TitleBlock/TitleBlock';
import { fetchExperts } from '../../features/API/experts/expertsSlice';
import LinkStar from '../UI/TitleBlock/LinkStar';
import CustomSwiper from '../UI/CustomSwiper/CustomSwiper';
import { Link } from 'react-router-dom';
import ServiceUnavailable from '../../pages/ServiceUnavailable';

function Specialists() {
    const dispatch = useDispatch();
    const experts = useSelector((state) => state.experts.experts);
    const expertsStatus = useSelector((state) => state.experts.status);
    const error = useSelector((state) => state.experts.error);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 576);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 576);
            setIsMobileView(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (expertsStatus === 'idle') {
            dispatch(fetchExperts());
        }
    }, [expertsStatus, dispatch]);

    if (expertsStatus === 'loading') {
        return <p>Загрузка специалистов...</p>;
    }

    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    if (expertsStatus === 'failed') {
        return <p>{error}</p>;
    }

    const directorExpert = experts.find(expert => 
        expert.name === 'Андрей' && expert.surname === 'Теряев' && expert.patronymic === 'Михайлович'
    );

    const filteredExperts = experts.filter(expert => expert !== directorExpert);
    const limitedExperts = filteredExperts.slice(0, 3);

    const limitedSlides = limitedExperts.map((expert, index) => (
        <div key={index}>
            <SpecialistCard
                imgSrc={expert.image || directorMobile}
                imgAlt={`${expert.surname || ''} ${expert.name || 'Unknown'} ${expert.patronymic || ''}`}
                surname={expert.surname || 'Unknown'}
                name={expert.name || 'Unknown'}
                patronymic={expert.patronymic || ''}
                position={expert.job_title || 'Unknown Position'}
                description={expert.description}
                index={index}
            />
        </div>
    ));

    const breakpoints = {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1001: { slidesPerView: 4 },
    };

    return (
        <section className={`${styles.specialists} container`}>
            <div className={styles.specialists__title}>
                <TitleBlock title="Специалисты" />
                {!isSmallScreen && (
                    <LinkStar linkText="Посмотреть всех" linkHref="/specialists" />
                )}
            </div>
            <div className={styles.specialists__items}>
                {directorExpert && (
                    <div className={styles.specialists__items__directorBox}>
                        <Link to={`/aboutSpecialist/${directorExpert.surname}/${directorExpert.name}/${directorExpert.patronymic || ''}`}>
                            <img
                                className={styles.specialists__items__directorBox__img}
                                src={isSmallScreen ? directorMobile : directorExpert.image}
                                alt={`${directorExpert.surname || ''} ${directorExpert.name || ''} ${directorExpert.patronymic || ''}`}
                            />
                        </Link>
                        <div className={styles.specialists__items__directorBox__infoText}>
                            <h3 className={styles.specialists__items__directorBox__infoText__nameSpec}>
                                {`${directorExpert.surname || ''} ${directorExpert.name || ''} ${directorExpert.patronymic || ''}`}
                            </h3>
                            <p className={styles.specialists__items__directorBox__infoText__text}>
                                {directorExpert.job_title || 'Unknown Position'}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.specialists__items__specBox}>
                {isMobileView ? (
                    <CustomSwiper
                        slides={limitedSlides}
                        breakpoints={breakpoints}
                        spaceBetween={24}
                        navigationEnabled={false}
                        paginationEnabled={true}
                    />
                ) : (
                    limitedExperts.map((expert, index) => (
                        <SpecialistCard
                            key={index}
                            imgSrc={expert.image || directorMobile}
                            imgAlt={`${expert.surname || ''} ${expert.name || 'Unknown'} ${expert.patronymic || ''}`}
                            surname={expert.surname || 'Unknown'}
                            name={expert.name || 'Unknown'}
                            patronymic={expert.patronymic || ''}
                            position={expert.job_title || 'Unknown Position'}
                            description={expert.description}
                            index={index}
                        />
                    ))
                )}
            </div>

            {isSmallScreen && (
                <LinkStar linkText="Посмотреть всех" linkHref="/specialists" />
            )}
        </section>
    );
}

export default Specialists;