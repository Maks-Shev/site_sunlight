import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../../features/API/projects/projectsSlice';
import styles from './Projects.module.scss';
import TitleBlock from '../../components/UI/TitleBlock/TitleBlock';
import RowProjectItem from './RowProjectItem';
import LinkStar from '../UI/TitleBlock/LinkStar';
import ServiceUnavailable from '../../pages/ServiceUnavailable';

function Projects() {
    const [shouldDisplayLink, setShouldDisplayLink] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projects, status, error } = useSelector((state) => state.projects);

    const projectsArray = Array.isArray(projects) ? projects : [];

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }

        const handleResize = () => {
            if (window.innerWidth <= 576) {
                setShouldDisplayLink(true);
                setIsSmallScreen(true);
            } else {
                setShouldDisplayLink(false);
                setIsSmallScreen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch, status]);

    const handleLinkClick = () => {
        navigate('/projects');
    };

    if (error && error.includes('Сервис временно недоступен')) {
        return <ServiceUnavailable />;
    }

    const displayedProjects = projectsArray.slice(0, 2);

    return (
        <section className={`${styles.projects} container`}>
            <div className={styles.projects__title}>
                <TitleBlock title="Проекты" />
                {!shouldDisplayLink && (
                    <LinkStar
                        linkText="Все проекты"
                        linkHref="/projects"
                        onClick={handleLinkClick}
                    />
                )}
            </div>
            <div className={styles.projects__description}>
                {status === 'loading' && <p>Загрузка проектов...</p>}
                {error && <p>{error}</p>}
                {displayedProjects.map((project, index) => (
                    <RowProjectItem 
                        key={project.id}
                        imgSrc={project.picture}
                        imgAlt={project.title}
                        textTitle={project.title}
                        textDesc={project.sun_projects_text}
                        projectLink={`/openProject/${project.id}`}
                        linkText="Читать дальше"
                        reverse={!isSmallScreen && window.innerWidth > 767 && index % 2 !== 0}
                    />
                ))}
            </div>
            {shouldDisplayLink && (
                <LinkStar
                    linkText="Все проекты"
                    linkHref="/projects"
                    onClick={handleLinkClick}
                />
            )}
        </section>
    );
}

export default Projects;