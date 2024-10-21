import React from 'react';
import PropTypes from 'prop-types';
import Button from "../UI/Button/Button";
import { useNavigate, Link } from 'react-router-dom';
import styles from './ProjectsItemForPage.module.scss';

function ProjectsItemForPage({ imgSrc, imgAlt, textTitle, textDesc, onButtonClick, isClosed, projectId, projectLink, denotation }) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/openProject/${projectId}`, {
            state: { textTitle, imgSrc, imgAlt }
        });
        if (onButtonClick) {
            onButtonClick();
        }
        window.scrollTo(0, 0);
    };

    return (
        <div className={styles.projectsAll__item}>
            <Link 
                className={styles.projectsAll__item__link} 
                to={projectLink}
                state={{ textTitle, imgSrc, imgAlt }}
            >
                <img 
                    className={`${styles.projectsAll__item__linkImg} ${isClosed ? styles.closed : ''}`} 
                    src={imgSrc} 
                    alt={imgAlt} 
                    onClick={handleButtonClick}
                />
                {isClosed && <div className={styles.closed__label}>Проект закрыт</div>}
            </Link>
            <div className={styles.projectsAll__item__desc}>
                <p className={styles.projectsAll__item__desc__title}>{textTitle}</p>
                <p className={`${styles.projectsAll__item__desc__text} ${styles.clampText}`}>
                    {textDesc} {denotation && <span className={styles.denotation}>({denotation})</span>}
                </p>
            </div>
            <div className={styles.projectsAll__item__btn}>
                <Button
                    text="Подробнее"
                    bgColor="#FF8227"
                    textColor="white"
                    border="2px solid #FF8227"
                    borderRadius="8px"
                    padding="11px 55px"
                    fontSize="18px"
                    fontFamily="'Exo 2'"
                    width="100%"
                    onClick={handleButtonClick}
                />
            </div>
        </div>
    );
}

ProjectsItemForPage.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    textTitle: PropTypes.string.isRequired,
    textDesc: PropTypes.string,
    onButtonClick: PropTypes.func,
    isClosed: PropTypes.bool,
    projectId: PropTypes.number,
    projectLink: PropTypes.string.isRequired,
    denotation: PropTypes.string,
};

export default ProjectsItemForPage;