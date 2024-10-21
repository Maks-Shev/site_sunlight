import PropTypes from 'prop-types';
import styles from './LinkStar.module.scss';
import { Link } from 'react-router-dom';

function LinkStar({ linkText, linkHref, onClick }) {
    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
    };

    return (
        <Link to={linkHref} className={styles.link} onClick={handleClick}>
            {linkText}
        </Link>
    );
}

LinkStar.propTypes = {
    linkText: PropTypes.string.isRequired,
    linkHref: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default LinkStar;