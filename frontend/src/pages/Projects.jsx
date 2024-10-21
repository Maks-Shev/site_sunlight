import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../features/API/projects/projectsSlice';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ProjectsItemForPage from "../components/Projects/ProjectsItemForPage";
import styles from '../style/Projects.module.scss';
import CharityContainer from '../components/CharityContainer/CharityContainer';
import PaginationNum from '../components/UI/PaginationNum/PaginationNum';
import ServiceUnavailable from './ServiceUnavailable';

function Projects() {
    const dispatch = useDispatch(); // хук, который возвращает функцию dispatch, позволяющую отправлять действия (actions) в Redux
    const { projects = [], status, error } = useSelector((state) => state.projects); // Извлекаем данные проектов, статус и ошибки из Redux
    // Состояние для текущей страницы пагинации и количества проектов на страницу
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage, setProjectsPerPage] = useState(6); // Количество проектов на одной странице по умолчанию
    const containerRef = useRef(null); // Используем useRef для ссылки на контейнер с проектами, чтобы отслеживать его размер
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 767); // Логическое состояние для проверки мобильного вида

    // Запрос на загрузку проектов, если они ещё не загружены (status === 'idle')
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [dispatch, status]);

    // Следим за изменениями размера окна и меняем отображение карточек проектов
    useEffect(() => {
        const handleResize = () => {
            const width = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth;
            setIsMobileView(width < 767); // Если ширина меньше 767px, переключаемся в мобильный режим
            // Меняем количество отображаемых проектов в зависимости от ширины экрана
            if (width < 767) {
                setProjectsPerPage(3);
            } else if (width < 1000) {
                setProjectsPerPage(9);
            } else {
                setProjectsPerPage(6);
            }
        };

        handleResize(); // Вызываем функцию сразу после монтирования компонента
        window.addEventListener('resize', handleResize); // Добавляем слушатель изменения размера окна
        return () => {
            window.removeEventListener('resize', handleResize); // Очищаем слушатель при размонтировании компонента
        };
    }, []);

    // Эффект для прокрутки страницы наверх при изменении текущей страницы
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    // Вычисляем проекты для отображения на текущей странице
    const displayedProjects = Array.isArray(projects) ? projects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    ) : [];

    const totalPages = Math.ceil(projects.length / projectsPerPage); // Рассчитываем общее количество страниц для пагинации

    // Обработчик для смены страницы в пагинации
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Прокручиваем страницу наверх при смене страницы
    };

    // Если сервис недоступен, отображаем страницу с ошибкой
    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    return (
        <>
            <Header />
            <div className={`${styles.title__container} container1200`}>
                <h2 className={styles.title__container__textTitle}>Все проекты</h2>
            </div>
            <section className={`${styles.projectsAll__container} container1200`} ref={containerRef}>
                {status === 'loading' && <p>Загрузка проектов...</p>}
                {error && <p>{error}</p>}
                {displayedProjects.length > 0 ? (
                    displayedProjects.map((project, index) => {
                        let isClosed = false;

                        if (!isMobileView && displayedProjects.length - index <= 2) {
                            isClosed = true;
                        }

                        if (isMobileView && index === displayedProjects.length - 1) {
                            isClosed = true;
                        }

                        return (
                            <ProjectsItemForPage 
                                key={project.id}
                                projectId={project.id}
                                imgSrc={project.picture}
                                imgAlt={project.title}
                                textTitle={project.title}
                                denotation={project.denotation}
                                isClosed={isClosed}
                                projectLink={`/openProject/${project.id}`}
                                onButtonClick={window.history.back}
                            />
                        );
                    })
                ) : (
                    <p>Нет проектов для отображения.</p>
                )}
            </section>
            <div className={`${styles.pagination__container} container1200`}>
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

export default Projects;