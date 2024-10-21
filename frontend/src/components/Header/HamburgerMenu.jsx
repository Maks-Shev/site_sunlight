import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from './HamburgerMenu.module.scss';

function HamburgerMenu() {
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const hamburgerMenuRef = useRef(null);
    const subMenuRef = useRef(null);
    const body = document.querySelector('body');

    const toggleHamburgerMenu = (event) => {
        event.stopPropagation();
        setIsHamburgerMenuOpen((prev) => {           
            if (!prev) setIsSubMenuOpen(false);
            return !prev;
        });        
    };

    const toggleSubMenu = (event) => {
        event.stopPropagation();
        setIsSubMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (
            hamburgerMenuRef.current &&
            !hamburgerMenuRef.current.contains(event.target) &&
            subMenuRef.current &&
            !subMenuRef.current.contains(event.target)
        ) {
            setIsHamburgerMenuOpen(false);
            setIsSubMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 767 && isHamburgerMenuOpen) {
                body.classList.add('noScroll');
            } else {
                body.classList.remove('noScroll');
            }
        };
    
        // Проверяем размер экрана при монтировании и изменении состояния меню
        handleResize();
    
        // Добавляем событие для отслеживания изменения размера окна
        window.addEventListener('resize', handleResize);
    
        return () => {
            // Убираем обработчик события при размонтировании компонента
            window.removeEventListener('resize', handleResize);
            body.classList.remove('noScroll'); // Убираем класс при размонтировании компонента
        };
    }, [isHamburgerMenuOpen]); // при изменении состояния бургер-меню(открыто/закрыто), убираем/добавляем класс "noScroll"

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.hamburger}>
            <div 
                className={styles.hamburger__icon} 
                onClick={toggleHamburgerMenu}
                ref={hamburgerMenuRef}
            >
                <div className={`${styles.hamburger__line} ${isHamburgerMenuOpen ? styles['hamburger__line--active'] : ''}`}></div>
                <div className={`${styles.hamburger__line} ${isHamburgerMenuOpen ? styles['hamburger__line--active'] : ''}`}></div>
                <div className={`${styles.hamburger__line} ${isHamburgerMenuOpen ? styles['hamburger__line--active'] : ''}`}></div>
            </div>

            <div className={`${styles.hamburger__menu} ${isHamburgerMenuOpen ? styles['hamburger__menu--open'] : ''}`}>
                    <nav className={styles.hamburger__nav}>
                        <ul className={styles.hamburger__list}>
                            <li className={styles.hamburger__item}>
                            <button
                                className={styles.hamburger__button}
                                onClick={toggleSubMenu}
                                ref={subMenuRef}
                            >
                                <span>О центре</span>
                                <svg
                                    className={`${styles.hamburger__icon_down} ${isSubMenuOpen ? styles['hamburger__icon_down--rotate'] : ''}`}
                                    width="10" height="6" viewBox="0 0 10 6"
                                    fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.229184 0.225519C0.372228 0.0880472 0.564059 0.0129274 0.762522 0.0166679C0.960985 0.0204084 1.14984 0.102703 1.28759 0.245467L4.99202 4.17324L8.69645 0.245467C8.76379 0.171316 8.84534 0.11142 8.93627 0.0693285C9.0272 0.0272372 9.12567 0.00380733 9.22584 0.000426662C9.326 -0.00295401 9.42583 0.0137832 9.5194 0.0496473C9.61297 0.0855114 9.69838 0.139773 9.77058 0.209215C9.84277 0.278657 9.90027 0.361868 9.93968 0.453917C9.97909 0.545966 9.9996 0.64498 9.99999 0.745092C10.0004 0.845204 9.98067 0.944377 9.94199 1.03673C9.90331 1.12909 9.84647 1.21276 9.77483 1.28277L5.53121 5.77108C5.46135 5.84348 5.3776 5.90106 5.28496 5.94039C5.19232 5.97973 5.09268 6 4.99202 6C4.89136 6 4.79173 5.97973 4.69908 5.94039C4.60644 5.90106 4.52269 5.84348 4.45283 5.77108L0.209214 1.28277C0.0715912 1.13988 -0.00361115 0.948259 0.00013343 0.750014C0.00387802 0.551769 0.0862632 0.363118 0.229184 0.225519Z"
                                    fill="currentColor"
                                    />
                                </svg>
                            </button>
                                <div className={`${styles.hamburger__submenu} ${isSubMenuOpen ? styles['hamburger__submenu--open'] : ''}`}>
                                        <ul className={styles.hamburger__submenu_list}>
                                            <li className={styles.hamburger__submenu_item}>
                                                <NavLink
                                                    to='/about'
                                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                                    onClick={toggleHamburgerMenu}
                                                >
                                                    Центр
                                                </NavLink>
                                            </li>
                                            <li className={styles.hamburger__submenu_item}>
                                                <NavLink
                                                    to='/garden'
                                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                                    onClick={toggleHamburgerMenu}
                                                >
                                                    Сад
                                                </NavLink>
                                            </li>
                                            <li className={styles.hamburger__submenu_item}>
                                                <NavLink
                                                    to='/workshops'
                                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                                    onClick={toggleHamburgerMenu}
                                                >
                                                    Мастерские
                                                </NavLink>
                                            </li>
                                            <li className={styles.hamburger__submenu_item}>
                                                <a href='http://guild-of-developers.ru'>
                                                    Образовательный сайт
                                                </a>
                                            </li>
                                            <li className={styles.hamburger__submenu_item}>
                                                <NavLink
                                                    to='/specialists'
                                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                                    onClick={toggleHamburgerMenu}
                                                >
                                                    Специалисты
                                                </NavLink>
                                            </li>
                                            <li className={styles.hamburger__submenu_item}>
                                                <NavLink
                                                    to='/SRV'
                                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                                    onClick={toggleHamburgerMenu}
                                                >
                                                    СРВ
                                                </NavLink>
                                            </li>
                                            <li className={styles.hamburger__submenu_item}>
                                                <NavLink
                                                    to='/school'
                                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                                    onClick={toggleHamburgerMenu}
                                                >
                                                    Школа
                                                </NavLink>
                                            </li>
                                            <li className={styles.hamburger__submenu_item}>
                                                <NavLink
                                                    to='/reports'
                                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                                    onClick={toggleHamburgerMenu}
                                                >
                                                    Отчеты
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                            </li>

                            <li className={styles.hamburger__item}>
                                <NavLink
                                    to='/help'
                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                    onClick={toggleHamburgerMenu}
                                >
                                    Помочь
                                </NavLink>
                            </li>
                            <li className={styles.hamburger__item}>
                                <NavLink
                                    to='/projects'
                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                    onClick={toggleHamburgerMenu}
                                >
                                    Проекты
                                </NavLink>
                            </li>
                            <li className={styles.hamburger__item}>
                                <NavLink
                                    to='/success'
                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                    onClick={toggleHamburgerMenu}
                                >
                                    Территория успеха
                                </NavLink>
                            </li>
                            <li className={styles.hamburger__item}>
                                <NavLink
                                    to='/partners'
                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                    onClick={toggleHamburgerMenu}
                                >
                                    Партнёры
                                </NavLink>
                            </li>
                            <li className={styles.hamburger__item}>
                                <NavLink
                                    to='/contacts'
                                    className={({ isActive }) => isActive ? styles['hamburger__link--active'] : ''}
                                    onClick={toggleHamburgerMenu}
                                >
                                    Контакты
                                </NavLink>
                            </li>
                            <li className={styles.hamburger__item}>
                                <a className={styles.hamburger__social} href='https://vk.com/slkrug'>
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M28.4 10.08C28.58 9.45 28.4 9 27.54 9L24.69 9C23.97 9 23.64 9.39 23.46 9.83C23.46 9.83 22.01 13.48 19.96 15.85C19.3 16.54 19 16.76 18.64 16.76C18.45 16.76 18.18 16.54 18.18 15.92L18.18 10.08C18.18 9.33 17.98 9 17.38 9L12.91 9C12.46 9 12.18 9.34 12.18 9.67C12.18 10.38 13.21 10.55 13.32 12.54L13.32 16.89C13.32 17.84 13.15 18.01 12.79 18.01C11.82 18.01 9.48 14.34 8.08 10.14C7.82 9.32 7.54 9 6.82 9L3.97 9C3.16 9 3 9.39 3 9.83C3 10.61 3.96 14.48 7.49 19.6C9.84 23.1 13.15 25 16.16 25C17.97 25 18.19 24.57 18.19 23.85L18.19 21.21C18.19 20.36 18.36 20.2 18.94 20.2C19.36 20.2 20.08 20.41 21.77 22.1C23.7 24.1 24.01 25 25.1 25L27.94 25C28.76 25 29.16 24.57 28.93 23.74C28.67 22.91 27.75 21.71 26.53 20.29C25.87 19.48 24.87 18.6 24.57 18.17C24.15 17.6 24.27 17.35 24.57 16.85C24.57 16.85 28.04 11.8 28.4 10.08Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
            </div>
        </div>
    );
}

export default HamburgerMenu;