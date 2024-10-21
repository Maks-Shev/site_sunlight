import PropTypes from 'prop-types';
import styles from './TitleBlock.module.scss';

function TitleBlock({ title }) {
    return (
        <div className={styles.titleBox}>
            <h2 className={styles.title}>{title}</h2>
        </div>
    );
}

TitleBlock.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TitleBlock;