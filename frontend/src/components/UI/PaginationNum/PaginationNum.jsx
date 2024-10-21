import PropTypes from 'prop-types';
import styles from './PaginationNum.module.scss';

const PaginationNum = ({ currentPage, totalPages, onPageChange }) => {
    const renderPagination = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`${styles.pagination__button} ${currentPage === i ? styles.active : ''}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);

            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`${styles.pagination__button} ${currentPage === i ? styles.active : ''}`}
                    >
                        {i}
                    </button>
                );
            }

            if (startPage > 1) {
                pages.unshift(
                    <span key="start-ellipsis" className={styles.pagination__ellipsis}>...</span>
                );
                pages.unshift(
                    <button
                        key={1}
                        onClick={() => onPageChange(1)}
                        className={`${styles.pagination__button} ${currentPage === 1 ? styles.active : ''}`}
                    >
                        1
                    </button>
                );
            }

            if (endPage < totalPages) {
                pages.push(
                    <span key="end-ellipsis" className={styles.pagination__ellipsis}>...</span>
                );
                pages.push(
                    <button
                        key={totalPages}
                        onClick={() => onPageChange(totalPages)}
                        className={`${styles.pagination__button} ${currentPage === totalPages ? styles.active : ''}`}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return pages;
    };

    return (
        <>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className={`${styles.pagination__button} ${currentPage === 1 ? styles.disabled : ''}`}
                disabled={currentPage === 1}
            >
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="9.85355" y1="0.353553" x2="0.853553" y2="9.35355" stroke="black"/>
                    <line x1="0.853553" y1="8.64645" x2="9.85355" y2="17.6464" stroke="black"/>
                </svg>
            </button>
            {renderPagination()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className={`${styles.pagination__button} ${currentPage === totalPages ? styles.disabled : ''}`}
                disabled={currentPage === totalPages}
            >
                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="-0.5" x2="12.7279" y2="-0.5" transform="matrix(0.707107 0.707107 0.707107 -0.707107 1.5 0)" stroke="black"/>
                    <line y1="-0.5" x2="12.7279" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 10.5 9)" stroke="black"/>
                </svg>
            </button>
        </>
    );
};

PaginationNum.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PaginationNum;