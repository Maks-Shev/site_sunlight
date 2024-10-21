import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import CharityContainer from '../components/CharityContainer/CharityContainer';
import SpecialistCard from '../components/Specialists/SpecialistCard';
import SpecialistCardMedium from '../components/Specialists/SpecialistCardMedium';
import PaginationNum from '../components/UI/PaginationNum/PaginationNum';
import styles from '../style/AboutSpecialist.module.scss';
import { fetchExperts } from '../features/API/experts/expertsSlice';
import ServiceUnavailable from './ServiceUnavailable';

function AboutSpecialist() {
    const { surname, name, patronymic } = useParams(); // хук для извлечения параметров из URL
    const dispatch = useDispatch(); // хук, который возвращает функцию dispatch, позволяющую отправлять действия (actions) в Redux

    // Достаем из Redux список специалистов, статус и возможную ошибку, хуки для доступа к данным
    const specialists = useSelector((state) => state.experts.experts);
    const status = useSelector((state) => state.experts.status);
    const error = useSelector((state) => state.experts.error);

    // Состояния для хранения размера экрана и количества карточек специалистов
    const [isMediumOrMobileView, setIsMediumOrMobileView] = useState(window.innerWidth <= 1000);
    const [cardCount, setCardCount] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSpecialist, setCurrentSpecialist] = useState(null);
    const [shuffledSpecialists, setShuffledSpecialists] = useState([]);

    // Запрос специалистов с сервера при первом рендере или изменении статуса
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExperts());
        }
    }, [status, dispatch]);

    // Поиск текущего специалиста по параметрам из URL (ФИО)
    useEffect(() => {
        if (status === 'succeeded') {
            const foundSpecialist = specialists.find((spec) => // преобразуем данные в нижний регистр toLowerCase и убираем пробелы trim
                spec.name.toLowerCase().trim() === name.toLowerCase().trim() && 
                spec.surname.toLowerCase().trim() === surname.toLowerCase().trim() &&
                (spec.patronymic ? spec.patronymic.toLowerCase().trim() === (patronymic?.toLowerCase().trim() || '') : true) // проверяем есть ли фамилия и преобразуем
            );

            if (foundSpecialist) {
                setCurrentSpecialist(foundSpecialist);
            }
        }
    }, [surname, name, patronymic, specialists, status]);

    // Следим за изменениями размера окна и меняем отображение карточек специалистов
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1000) {
                setIsMediumOrMobileView(true);
                setCardCount(3); // На мобильных/средних экранах показываем по 3 карточки
            } else {
                setIsMediumOrMobileView(false);
                setCardCount(2); // На больших экранах — по 2 карточки
            }
        };
    
        handleResize(); // Обработчик изменения экрана сразу же вызывается
        window.addEventListener('resize', handleResize); // Добавляем слушатель событий изменения размера окна
    
        return () => window.removeEventListener('resize', handleResize); // Удаляем слушатель при размонтировании
    }, []);

    // Перемешиваем список специалистов для отображения случайных карточек
    useEffect(() => {
        if (specialists.length > 0) {
            setShuffledSpecialists(shuffleArray([...specialists]));
        }
    }, [specialists, currentSpecialist]);

    // Обработчик смены страницы в пагинации
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Скроллим страницу вверх при смене страницы
    };

    // Отображаем состояние загрузки
    if (status === 'loading') {
        return <div>Загрузка...</div>;
    }

    // Отображаем страницу с ошибкой, если сервис недоступен
    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    // Обрабатываем другие ошибки
    if (status === 'failed') {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <>
            <Header />
            <section className={`${styles.aboutSpec__container} container1200`}>
                {currentSpecialist ? ( // Отображаем текущего специалиста, если он найден
                    <div className={styles.aboutSpec__container__descAbout}>
                        <div className={styles.aboutSpec__container__descAbout__desc}>
                            <h3 className={styles.aboutSpec__container__descAbout__desc__name}>
                                {currentSpecialist.surname} {currentSpecialist.name} {currentSpecialist.patronymic || ''}
                            </h3>
                            <p className={styles.aboutSpec__container__descAbout__desc__positionWork}>
                                {currentSpecialist.job_title}
                            </p>
                            <p className={styles.aboutSpec__container__descAbout__desc__aboutSelf}>
                                {currentSpecialist.description}
                            </p>
                            <p className={styles.aboutSpec__container__descAbout__desc__txt}>
                                {currentSpecialist.responsibilities}
                            </p>
                        </div>
                        <div className={styles.aboutSpec__container__descAbout__imgBox}>
                            <img
                                className={styles.aboutSpec__container__descAbout__imgBox__img}
                                src={currentSpecialist.image}
                                alt={`${currentSpecialist.surname} ${currentSpecialist.name}`}
                            />
                        </div>
                    </div>
                ) : (
                    <div>Специалист не найден.</div>
                )}

                <aside className={styles.aboutSpec__container__anotherSpec}>
                    <div className={styles.aboutSpec__container__anotherSpec__specBox}>
                        <h3 className={styles.aboutSpec__container__anotherSpec__specBox__title}>Другие специалисты</h3>
                        <div className={styles.aboutSpec__container__anotherSpec__specBox__items}>
                            {shuffledSpecialists
                                .slice((currentPage - 1) * cardCount, currentPage * cardCount)
                                .map((otherSpec, index) => {
                                    const fullName = `${otherSpec.surname || ''} ${otherSpec.name || 'Unknown'} ${otherSpec.patronymic || ''}`.trim();
                                    return isMediumOrMobileView ? (
                                        <SpecialistCardMedium
                                            key={index}
                                            imgSrc={otherSpec.image}
                                            imgAlt={fullName}
                                            surname={otherSpec.surname}
                                            name={otherSpec.name}
                                            patronymic={otherSpec.patronymic}
                                            position={otherSpec.job_title || 'Unknown Position'}
                                            description={otherSpec.description}
                                            index={index}
                                        />
                                    ) : (
                                        <SpecialistCard
                                            key={index}
                                            imgSrc={otherSpec.image}
                                            imgAlt={fullName}
                                            surname={otherSpec.surname}
                                            name={otherSpec.name}
                                            patronymic={otherSpec.patronymic}
                                            position={otherSpec.job_title || 'Unknown Position'}
                                            description={otherSpec.description}
                                            index={index}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </aside>

                <div className={`${styles.pagination__container} container1200`}>
                    <PaginationNum
                        currentPage={currentPage}
                        totalPages={Math.ceil(shuffledSpecialists.length / cardCount)}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
            <section className={`${styles.charity__container} container1200`}>
                <CharityContainer />
            </section>
            <Footer />
        </>
    );
}

// Функция для перемешивания массива специалистов случайным образом
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default AboutSpecialist;