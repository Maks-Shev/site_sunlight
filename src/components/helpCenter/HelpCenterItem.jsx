import React from 'react';
import star from '/img/home/star.svg';
import helpCenterImage from '/img/home/helpCenter.webp';
import styles from './HelpCenterItem.module.scss';

function HelpCenterItem() {
    const collected = 50_000; // Пример собранной суммы, в дальнейшем вытягиваем у бека
    const goal = 100_000;
    const quantityHelpers = 35; // Количество помогающих, в дальнейшем вытягиваем у бека

    const percentage = (collected / goal) * 100;
    const filledWidth = `${percentage > 100 ? 100 : percentage}%`;

    const formatNumber = (num) => {
        return new Intl.NumberFormat('ru-RU').format(num);
    };

    return (
        <article className={styles.helpProductItem}>
            <div className={styles.helpProductItem__imgBox}>
                <img
                    className={styles.helpProductItem__imgBox__img}
                    src={helpCenterImage}
                    alt="Благотворительный сбор"
                />
                <p className={styles.helpProductItem__imgBox__title}>
                    Благотворительный сбор в честь Дня рождения Даниила Плотникова
                </p>
            </div>
            <div className={styles.helpProductItem__info}>
                <p className={styles.helpProductItem__info__description}>
                    В честь Дня Рождения нашего воспитанника Дани Плотникова его мама
                    Лилия открывает благотворительный сбор в поддержку центра «Солнечный
                    круг». А мы благодарим маму Дани и поздравляем их с сыном с
                    новолетием!
                </p>
                <button className={styles.helpProductItem__info__detailed}>Подробнее</button>
                <div className={styles.helpProductItem__info__scaleBox}>
                    <div className={styles.helpProductItem__info__scaleBox__collected}>
                        <p>{formatNumber(collected)} ₽</p>
                        <p>{formatNumber(goal)} ₽</p>
                    </div>

                    <div className={styles.helpProductItem__info__scaleBox__completed}>
                        <div
                            className={styles.helpProductItem__info__scaleBox__completed__filled}
                            style={{ width: filledWidth }}
                        />
                    </div>
                    <div
                        className={styles.helpProductItem__info__scaleBox__star}
                        style={{ left: `calc(${filledWidth} - 18.5px)` }}>
                        <img src={star} alt="star" />
                    </div>
                </div>
                <div className={styles.helpProductItem__info__buttonBox}>
                    <button className={styles.helpProductItem__info__buttonBox__button}>Помочь сейчас</button>
                </div>
                <p className={styles.helpProductItem__info__footer}>
                    Нас поддержали:{' '}
                    <span className={styles.helpProductItem__info__footer__footerLittle}>
                        Анна А., Борис Б., Виктория В., и{' '}
                        <span className={styles.helpProductItem__info__footer__footerLittle__footerColor}>
                            ещё {quantityHelpers}
                        </span>
                    </span>
                </p>
            </div>
        </article>
    );
}

export default HelpCenterItem;