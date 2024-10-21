import { useNavigate } from 'react-router-dom';
import styles from './RowProjectItem.module.scss';
import PropTypes from 'prop-types';

function RowProjectItem({ imgSrc, imgAlt, textTitle, textDesc, projectLink, linkText, reverse }) {
    const navigate = useNavigate();

    const handleLinkClick = () => {
        navigate(projectLink, {
            state: { textTitle, imgSrc, imgAlt }
        });
    };
    return (
        <div className={`${styles.rowProjectItem} ${reverse ? styles.reverse : ''}`}>
            <div className={styles.rowProjectItem__imgBox}>
                <img 
                    className={styles.rowProjectItem__imgBox__img} 
                    src={imgSrc} 
                    alt={imgAlt} 
                />
                <p className={styles.rowProjectItem__imgBox__text}>
                    {textTitle}
                </p>
            </div>
            <div className={styles.rowProjectItem__textBox}>
                <p className={styles.rowProjectItem__textBox__desc}>
                    {textDesc}
                </p>
                <span className={styles.rowProjectItem__textBox__link} onClick={handleLinkClick}>
                    {linkText}
                </span>
            </div>
        </div>
    );
}

RowProjectItem.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
    textTitle: PropTypes.string.isRequired,
    textDesc: PropTypes.string.isRequired,
    projectLink: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    reverse: PropTypes.bool,
};

export default RowProjectItem;