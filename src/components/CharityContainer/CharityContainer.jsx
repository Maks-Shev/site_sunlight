import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CharityContainer.module.scss";
import Button from "../UI/Button/Button";

function CharityContainer() {
    const handleButtonClick = () => {
        console.log("Button clicked in CharityContainer");
    };

    return (
        <div className={styles.charity__container__items}>
            <h3 className={styles.charity__container__items__textTitle}>
                40 СЕМЕЙ ИЗ ТОЛЬЯТТИ КАЖДЫЙ ДЕНЬ ЗАВИСЯТ ОТ НАШЕЙ РАБОТЫ
            </h3>
            <p className={styles.charity__container__items__textDesc}>
                Центру требуется регулярная поддержка <br />
                благотворителей и волонтеров
            </p>
            <div className={styles.charity__container__items__btn}>
                <NavLink to="/volunteer">
                    <Button
                        text="Я хочу помочь"
                        bgColor="#FF8227"
                        textColor="white"
                        border="2px solid #FF8227"
                        borderRadius="8px"
                        padding="12px 12px"
                        fontSize="18px"
                        fontFamily="'Exo 2'"
                        width="100%"
                        onClick={handleButtonClick}
                    />
                </NavLink>
            </div>
        </div>
    );
}

export default CharityContainer;
