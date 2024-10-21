import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SpecialistCardMedium.module.scss';

function SpecialistCardMedium({ imgSrc, imgAlt, surname, name, patronymic, position, description, index }) {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 375);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 375);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fullName = `${surname} ${name} ${patronymic || ''}`.trim();

    const handleNavigate = () => {
        navigate(`/aboutSpecialist/${surname}/${name}/${patronymic || ''}`);
    };

    return (
        <div className={styles.specialists__items__specBox__infoSpec}>
            <button onClick={handleNavigate} className={styles.specialists__items__specBox__infoSpec__button}>
                <img className={styles.specialists__items__specBox__infoSpec__img} src={imgSrc} alt={imgAlt} />
            </button>
            <p className={styles.specialists__items__specBox__infoSpec__nameSpec}>{fullName}</p>
            <p className={styles.specialists__items__specBox__infoSpec__text}>{position}</p>
            {!isMobileView && (
                <button onClick={handleNavigate} className={styles.specialists__items__specBox__infoSpec__link}>
                    Подробнее
                </button>
            )}
        </div>
    );
}

SpecialistCardMedium.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    patronymic: PropTypes.string,
    position: PropTypes.string.isRequired,
    description: PropTypes.string,
    index: PropTypes.number.isRequired,
};

export default SpecialistCardMedium;