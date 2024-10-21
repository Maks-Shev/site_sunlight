import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchProjectsById } from '../features/API/projects/projectsSlice';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import CharityContainer from '../components/CharityContainer/CharityContainer';
import ProjectsItemForPage from "../components/Projects/ProjectsItemForPage";
import styles from '../style/OpenProject.module.scss';
import ServiceUnavailable from './ServiceUnavailable';

function OpenProject() {
    const { id } = useParams(); // Получаем параметр id из URL, чтобы загрузить проект по ID
    const dispatch = useDispatch(); // хук, который возвращает функцию dispatch, позволяющую отправлять действия (actions) в Redux
    const { projects, status, error } = useSelector((state) => state.projects); // Извлекаем проекты, статус загрузки и возможную ошибку из состояния Redux
    const location = useLocation(); // хук useLocation для доступа к состоянию навигации (с предыдущей страницы)
    const navigate = useNavigate(); // хук useNavigate для перехода на другую страницу
    const { textTitle: stateTextTitle, imgSrc: stateImgSrc, imgAlt: stateImgAlt } = location.state || {}; // Получаем состояние проекта (название, изображение, альтернативный текст) из location.state, если оно передано

    const [projectsPerPage, setProjectsPerPage] = useState(2);  // Состояние для управления количеством проектов на странице
    const containerRef = useRef(null); // Хук useRef для ссылки на контейнер с проектами, чтобы отслеживать его размер
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 767); // Состояние для проверки, является ли текущее окно мобильным
    const [shuffledProjects, setShuffledProjects] = useState([]); // Состояние для хранения перемешанных проектов

    const validProjects = Array.isArray(projects) ? projects : []; // Проверка, является ли массив проектов валидным

    let project = validProjects.find(p => String(p.id) === String(id)); // Поиск текущего проекта по ID, если он уже загружен

    // Если проект не найден в массиве загруженных проектов, но есть состояние из предыдущей страницы,
    // используем данные из состояния для отображения
    if (!project && (stateTextTitle || stateImgSrc || stateImgAlt)) {
        project = {
            title: stateTextTitle,
            picture: stateImgSrc,
            denotation: stateImgAlt,
        };
    }

    // Загружаем проекты, если они еще не загружены, и загружаем конкретный проект по ID
    useEffect(() => {
        if (!validProjects.length) {
            dispatch(fetchProjects());
        }

        if (!project) {
            dispatch(fetchProjectsById(id));
        }
    }, [dispatch, id, project, validProjects.length]);

    // Прокручиваем страницу наверх при изменении URL
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Обрабатываем изменение размера окна для корректного отображения количества проектов
    useEffect(() => {
        const handleResize = () => {
            const width = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth;
            setIsMobileView(width < 767);

            // Меняем количество проектов на странице в зависимости от ширины экрана
            if (width >= 767 && width < 1000) {
                setProjectsPerPage(3);
            } else if (width < 767 && width >= 576) {
                setProjectsPerPage(2);
            } else if (width >= 1000) {
                setProjectsPerPage(2);
            } else if (width < 576) {
                setProjectsPerPage(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        // Очищаем слушатель события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Перемешиваем список проектов, когда проекты успешно загружены
    useEffect(() => {
        if (validProjects.length > 0) {
            setShuffledProjects(shuffleArray([...validProjects]));
        }
    }, [validProjects]);

    // Выбираем проекты для отображения на странице (ограничены количеством projectsPerPage)
    const displayedProjects = shuffledProjects.slice(0, projectsPerPage);

    // Обработчик клика по проекту — перенаправляет на страницу проекта
    const handleButtonClick = (project) => {
        navigate(`/openProject/${project.id}`, {
            state: {
                textTitle: project.title,
                imgSrc: project.picture,
                imgAlt: project.denotation,
            },
        });
        window.scrollTo(0, 0); // Прокручиваем страницу наверх после перехода
    };

    // Отображаем сообщение о загрузке проекта, если он еще не загружен
    if (status === 'loading' && !project) {
        return <p>Загрузка проекта...</p>;
    }

    // Отображаем сообщение об ошибке, если загрузка данных не удалась
    if (status === 'failed') {
        return <p>Ошибка: {error}</p>;
    }

    // Если проект не найден, отображаем соответствующее сообщение
    if (!project) {
        return <p>Проект не найден или данные отсутствуют.</p>;
    }

    // Если сервис недоступен, отображаем страницу с ошибкой
    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    return (
        <>
            <Header />
            {project && (
                <>
                    <div className={`${styles.title__container} container1200`}>
                        <h2 className={styles.title__container__textTitle}>{project.title}</h2>
                    </div>
                    <div className={`${styles.desc__container} container1200`}>
                        <div className={styles.desc__container__descUp}>
                            <div className={styles.desc__container__descUp__textBox}>
                                <p className={styles.desc__container__descUp__textBox__text}>
                                    {project.denotation}
                                </p>
                            </div>
                            <div className={styles.desc__container__descUp__imgBox}>
                                <img
                                    className={styles.desc__container__descUp__imgBox__img}
                                    src={project.picture}
                                    alt={project.title}
                                />
                            </div>
                        </div>
                        <div className={styles.desc__container__descDown}>
                            <p className={styles.desc__container__descDown__text}>
                                {project.sun_projects_text}
                            </p>
                        </div>
                    </div>
                </>
            )}
            <section className={`${styles.charity__container} container1200`}>
                <CharityContainer />
            </section>
            <section className={`${styles.anotherProjects__container} container1200`}>
                <h2 className={styles.anotherProjects__container__textTitle}>Другие проекты</h2>
                <div className={styles.anotherProjects__container__items} ref={containerRef}>
                    {displayedProjects.length > 0 ? (
                        displayedProjects.map((proj) => {
                            let isClosed = false;
                            const uniqueKey = `${proj.id}-${proj.title}`;

                            if (!isMobileView && displayedProjects.length - displayedProjects.indexOf(proj) <= 1) {
                                isClosed = true;
                            }

                            if (isMobileView && displayedProjects.indexOf(proj) === displayedProjects.length - 1) {
                                isClosed = true;
                            }

                            return (
                                <ProjectsItemForPage
                                    key={uniqueKey}
                                    projectId={proj.id}
                                    imgSrc={proj.picture}
                                    imgAlt={proj.title}
                                    textTitle={proj.title}
                                    textDesc={proj.denotation}
                                    isClosed={isClosed}
                                    projectLink={`/openProject/${proj.id}`}
                                    onButtonClick={() => handleButtonClick(proj)}
                                />
                            );
                        })
                    ) : (
                        <p>Загрузка проектов...</p>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

// Функция для перемешивания массива проектов случайным образом
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default OpenProject;