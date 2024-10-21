import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from '../style/Specialists.module.scss';
import CharityContainer from '../components/CharityContainer/CharityContainer';
import specialistsImage from '/img/home/Specialists/specialistsAll.webp';
import SpecialistCardMedium from '../components/Specialists/SpecialistCardMedium';
import { fetchExperts } from '../features/API/experts/expertsSlice';
import PaginationNum from '../components/UI/PaginationNum/PaginationNum';
import ServiceUnavailable from './ServiceUnavailable';

function Specialists() {
    const dispatch = useDispatch(); // хук, который возвращает функцию dispatch, позволяющую отправлять действия (actions) в Redux

    // Извлекаем список специалистов, статус загрузки и ошибку из Redux-хранилища
    const specialists = useSelector((state) => state.experts.experts);
    const status = useSelector((state) => state.experts.status);
    const error = useSelector((state) => state.experts.error);

    // Функция для определения количества специалистов на странице в зависимости от ширины экрана
    const getSpecialistsPerPage = (width) => {
        if (width <= 576) {
            return 3;
        } else if (width <= 767) {
            return 6;
        } else {
            return 9;
        }
    };

    // Локальное состояние для отслеживания мобильного вида и количества специалистов на странице
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576); // Проверяем, является ли экран мобильным
    const [specialistsPerPage, setSpecialistsPerPage] = useState(getSpecialistsPerPage(window.innerWidth)); // Количество специалистов на странице
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница для пагинации

    // Загружаем список специалистов при первом рендере или изменении статуса
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExperts());
        }

        // Обработчик изменения размера окна
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setIsMobileView(screenWidth <= 576); // Обновляем состояние мобильного вида
            setSpecialistsPerPage(getSpecialistsPerPage(screenWidth)); // Обновляем количество специалистов на странице
        };

        window.addEventListener('resize', handleResize); // Добавляем обработчик изменения размера экрана
        return () => window.removeEventListener('resize', handleResize); // Удаляем обработчик при размонтировании компонента
    }, [status, dispatch]);

    // Вычисляем специалистов, которые должны отображаться на текущей странице
    const displayedSpecialists = specialists.slice(
        (currentPage - 1) * specialistsPerPage,
        currentPage * specialistsPerPage
    );

    // Прокручиваем страницу наверх при каждом рендере
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Вычисляем общее количество страниц для пагинации
    const totalPages = Math.ceil(specialists.length / specialistsPerPage);

    // Обработчик для смены страницы в пагинации
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Обновляем текущую страницу
        window.scrollTo(0, 0); // Прокручиваем страницу наверх при смене страницы
    };

    // Отображаем сообщение о загрузке, если данные специалистов еще загружаются
    if (status === 'loading') {
        return <div>Загрузка специалистов...</div>;
    }

    // Если сервис недоступен, показываем компонент ServiceUnavailable
    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    // Отображаем сообщение об ошибке, если загрузка данных не удалась
    if (status === 'failed') {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className={`${styles.title__container} container1200`}>
                <h2 className={styles.title__container__textTitle}>Специалисты</h2>
            </div>
            <div className={styles.titleSmall__container}>
                <div className={styles.titleSmall__container__desc}>
                    <h2 className={styles.titleSmall__container__textTitle}>Специалисты</h2>
                </div>
            </div>
            <div className={`${styles.specialists__container} container1200`}>
                <div className={styles.specialists__container__desc}>
                    <p className={styles.specialists__container__text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel turpis luctus, ultrices est eu, dapibus felis. Quisque sed sodales nulla, vitae lacinia ex. Morbi posuere sapien sit amet finibus mattis. Maecenas eu dui leo. Sed sodales, turpis a blandit rhoncus, ligula odio ultricies libero, vitae feugiat orci odio eu magna. Aenean eu risus est. Praesent pulvinar bibendum diam, ut ultrices magna condimentum ac. <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel turpis luctus, ultrices est eu, dapibus felis. Quisque sed sodales nulla, vitae lacinia ex. Morbi posuere sapien sit amet finibus mattis. Maecenas eu dui leo. Sed sodales, turpis a
                    </p>
                </div>
                <div className={styles.specialists__container__imgBox}>
                    <img src={specialistsImage} alt="Специалисты" />
                </div>
            </div>
            <div className={`${styles.specialistsItems__container} container`}>
                {displayedSpecialists.map((specialist, index) => {
                    const fullName = `${specialist.surname || ''} ${specialist.name || 'Unknown'} ${specialist.patronymic || ''}`.trim();
                    return (
                        <SpecialistCardMedium
                            key={index}
                            imgSrc={specialist.image}
                            imgAlt={fullName}
                            surname={specialist.surname}
                            name={specialist.name}
                            patronymic={specialist.patronymic}
                            position={specialist.job_title || 'Unknown Position'}
                            description={specialist.description}
                            index={index}
                        />
                    );
                })}
            </div>
            <div className={`${styles.pagination__container} container`}>
                <PaginationNum
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <section className={`${styles.charity__container} container1200`}>
                <CharityContainer />
            </section>
            <Footer />
        </>
    );
}

export default Specialists;