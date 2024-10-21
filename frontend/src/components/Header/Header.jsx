import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import HamburgerMenu from "./HamburgerMenu";
import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";

function Header({ className }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleModal = (event) => {
        event.stopPropagation();
        setIsModalOpen((prev) => !prev);
    };
    const toggleAuthModal = () => {
        setIsAuthModalOpen(!isAuthModalOpen);
    };

    const handleClickOutside = (event) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setIsModalOpen(false);
        }
    };
    const handleLogout = () => {
        setIsAuthenticated(false); // Логаут, сбрасываем состояние
        setIsAuthModalOpen(false);  // Закрываем модальное окно
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`${styles.header} ${className} container1200`}>
            <div
                className={`${styles.header__container} ${
                    className && `${className}__container`
                }`}>
                <div
                    className={`${styles.header__logo} ${
                        className && `${className}__logo`
                    }`}>
                    <NavLink to="/">
                        <img src="/header_footer/logo.png" alt="Логотип" />
                    </NavLink>
                </div>
                <div
                    className={`${styles.header__menu} ${
                        className && `${className}__menu`
                    }`}>
                    <nav
                        className={`${styles.header__nav} ${
                            className && `${className}__nav`
                        }`}>
                        <ul
                            className={`${styles.header__nav_list} ${
                                className && `${className}__nav_list`
                            }`}>
                            <li
                                className={`${styles.header__nav_item} ${
                                    className && `${className}__nav_item`
                                }`}>
                                <button
                                    className={`${styles.header__nav_button} ${
                                        className && `${className}__nav_button`
                                    }`}
                                    onClick={toggleModal}
                                    ref={buttonRef}>
                                    <span
                                        className={
                                            className &&
                                            `${className}__nav_button_text`
                                        }>
                                        О центре
                                    </span>
                                    <svg
                                        className={`${
                                            styles.header__icon_down
                                        } ${isModalOpen ? styles.rotate : ""} ${
                                            className &&
                                            `${className}__icon_down`
                                        }`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect
                                            width="19"
                                            height="19"
                                            transform="translate(0.5 0.5)"
                                            fill="white"
                                            fillOpacity="0"
                                        />
                                        <g clipPath="url(#clip2_1485)">
                                            <path
                                                d="M5.22 10.21C5.37 10.07 5.56 9.99 5.76 10C5.96 10 6.15 10.08 6.28 10.22L9.99 14.15L13.69 10.22C13.76 10.15 13.84 10.09 13.93 10.05C14.02 10.01 14.12 9.98 14.22 9.98C14.32 9.98 14.42 9.99 14.51 10.03C14.61 10.07 14.69 10.12 14.77 10.19C14.84 10.26 14.9 10.34 14.93 10.43C14.97 10.53 15 10.62 15 10.72C15 10.82 14.98 10.92 14.94 11.02C14.9 11.11 14.84 11.19 14.77 11.26L10.53 15.75C10.46 15.82 10.37 15.88 10.28 15.92C10.19 15.96 10.09 15.98 9.99 15.98C9.89 15.98 9.79 15.96 9.69 15.92C9.6 15.88 9.52 15.82 9.45 15.75L5.2 11.26C5.07 11.12 4.99 10.93 5 10.73C5 10.53 5.08 10.34 5.22 10.21Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip2_1485">
                                                <rect
                                                    width="19"
                                                    height="19"
                                                    transform="translate(0.5 0.5)"
                                                    fill="white"
                                                    fillOpacity="0"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                {isModalOpen && (
                                    <div
                                        className={`${styles.header__modal} ${
                                            className && `${className}__modal`
                                        }`}
                                        ref={modalRef}>
                                        <ul
                                            className={`${
                                                styles.header__modal_list
                                            } ${
                                                className &&
                                                `${className}__modal_list`
                                            }`}>
                                            <li
                                                className={`${
                                                    styles.header__modal_item
                                                } ${
                                                    className &&
                                                    `${className}__modal_item`
                                                }`}>
                                                <NavLink
                                                    to="/about"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${
                                                                  styles.active
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link_active`
                                                              }`
                                                            : `${
                                                                  styles.header__modal_link
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link`
                                                              }`
                                                    }>
                                                    Центр
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${
                                                    styles.header__modal_item
                                                } ${
                                                    className &&
                                                    `${className}__modal_item`
                                                }`}>
                                                <NavLink
                                                    to="/garden"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${
                                                                  styles.active
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link_active`
                                                              }`
                                                            : `${
                                                                  styles.header__modal_link
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link`
                                                              }`
                                                    }>
                                                    Сад
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${
                                                    styles.header__modal_item
                                                } ${
                                                    className &&
                                                    `${className}__modal_item`
                                                }`}>
                                                <NavLink
                                                    to="/workshops"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${
                                                                  styles.active
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link_active`
                                                              }`
                                                            : `${
                                                                  styles.header__modal_link
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link`
                                                              }`
                                                    }>
                                                    Мастерские
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${
                                                    styles.header__modal_item
                                                } ${
                                                    className &&
                                                    `${className}__modal_item`
                                                }`}>
                                                <a
                                                    href="http://guild-of-developers.ru"
                                                    className={
                                                        styles.header__modal_link
                                                    }>
                                                    Образовательный сайт
                                                </a>
                                            </li>
                                            <li
                                                className={`${
                                                    styles.header__modal_item
                                                } ${
                                                    className &&
                                                    `${className}__modal_item`
                                                }`}>
                                                <NavLink
                                                    to="/specialists"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${
                                                                  styles.active
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link_active`
                                                              }`
                                                            : `${
                                                                  styles.header__modal_link
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link`
                                                              }`
                                                    }>
                                                    Специалисты
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${
                                                    styles.header__modal_item
                                                } ${
                                                    className &&
                                                    `${className}__modal_item`
                                                }`}>
                                                <NavLink
                                                    to="/SRV"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${
                                                                  styles.active
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link_active`
                                                              }`
                                                            : `${
                                                                  styles.header__modal_link
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link`
                                                              }`
                                                    }>
                                                    СРВ
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${
                                                    styles.header__modal_item
                                                } ${
                                                    className &&
                                                    `${className}__modal_item`
                                                }`}>
                                                <NavLink
                                                    to="/school"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${
                                                                  styles.active
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link_active`
                                                              }`
                                                            : `${
                                                                  styles.header__modal_link
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link`
                                                              }`
                                                    }>
                                                    Школа
                                                </NavLink>
                                            </li>
                                            <li
                                                className={`${
                                                    styles.header__modal_item
                                                } ${
                                                    className &&
                                                    `${className}__modal_item`
                                                }`}>
                                                <NavLink
                                                    to="/reports"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? `${
                                                                  styles.active
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link_active`
                                                              }`
                                                            : `${
                                                                  styles.header__modal_link
                                                              } ${
                                                                  className &&
                                                                  `${className}__modal_link`
                                                              }`
                                                    }>
                                                    Отчеты
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li
                                className={`${styles.header__nav_item} ${
                                    className && `${className}__nav_item`
                                }`}>
                                <NavLink
                                    to="/help"
                                    className={`${styles.header__nav_link} ${
                                        className && `${className}__nav_link`
                                    }`}>
                                    Помочь
                                </NavLink>
                            </li>
                            <li
                                className={`${styles.header__nav_item} ${
                                    className && `${className}__nav_item`
                                }`}>
                                <NavLink
                                    to="/projects"
                                    className={`${styles.header__nav_link} ${
                                        className && `${className}__nav_link`
                                    }`}>
                                    Проекты
                                </NavLink>
                            </li>
                            <li
                                className={`${styles.header__nav_item} ${
                                    className && `${className}__nav_item`
                                }`}>
                                <NavLink
                                    to="/success"
                                    className={`${styles.header__nav_link} ${
                                        className && `${className}__nav_link`
                                    }`}>
                                    Территория успеха
                                </NavLink>
                            </li>
                            <li
                                className={`${styles.header__nav_item} ${
                                    className && `${className}__nav_item`
                                }`}>
                                <NavLink
                                    to="/partners"
                                    className={`${styles.header__nav_link} ${
                                        className && `${className}__nav_link`
                                    }`}>
                                    Партнёры
                                </NavLink>
                            </li>
                            <li
                                className={`${styles.header__nav_item} ${
                                    className && `${className}__nav_item`
                                }`}>
                                <NavLink
                                    to="/contacts"
                                    className={`${styles.header__nav_link} ${
                                        className && `${className}__nav_link`
                                    }`}>
                                    Контакты
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div
                        className={`${styles.header__actions} ${
                            className && `${className}__actions`
                        }`}>
                        <button
                            className={`${styles.header__user_button} ${
                                className && `${className}__user_button`
                            }`}
                            onClick={toggleAuthModal}
                            ref={buttonRef}>
                            <svg
                                width="45"
                                height="45"
                                viewBox="0 0 45 45"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22.5 22.5C25.48 22.5 28.34 21.31 30.45 19.2C32.56 17.09 33.75 14.23 33.75 11.25C33.75 8.26 32.56 5.4 30.45 3.29C28.34 1.18 25.48 0 22.5 0C19.51 0 16.65 1.18 14.54 3.29C12.43 5.4 11.25 8.26 11.25 11.25C11.25 14.23 12.43 17.09 14.54 19.2C16.65 21.31 19.51 22.5 22.5 22.5ZM30 11.25C30 13.23 29.2 15.14 27.8 16.55C26.39 17.95 24.48 18.75 22.5 18.75C20.51 18.75 18.6 17.95 17.19 16.55C15.79 15.14 15 13.23 15 11.25C15 9.26 15.79 7.35 17.19 5.94C18.6 4.54 20.51 3.75 22.5 3.75C24.48 3.75 26.39 4.54 27.8 5.94C29.2 7.35 30 9.26 30 11.25ZM45 41.25C45 45 41.25 45 41.25 45L3.75 45C3.75 45 0 45 0 41.25C0 37.5 3.75 26.25 22.5 26.25C41.25 26.25 45 37.5 45 41.25ZM41.25 41.23C41.24 40.31 40.67 37.53 38.13 34.99C35.68 32.54 31.08 30 22.5 30C13.91 30 9.31 32.54 6.86 34.99C4.32 37.53 3.75 40.31 3.75 41.23L41.25 41.23Z"
                                    fill="#ff8227"
                                />
                            </svg>
                            {isAuthenticated && <span>Профиль</span>}
                            {/* Отображаем "Профиль" для авторизованных */}

                            {/* Модальные окна в зависимости от состояния авторизации */}
                            {isAuthModalOpen &&
                                (isAuthenticated ? (
                                    <ProfileModal onLogout={handleLogout} />
                                ) : (
                                    <AuthModal
                                        onClose={toggleAuthModal}
                                        onLogin={() => setIsAuthenticated(true)}
                                    />
                                ))}
                        </button>

                        {/* <button className={`${styles.header__user_button} ${className && `${className}__user_button`}`}>
                            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5 22.5C25.48 22.5 28.34 21.31 30.45 19.2C32.56 17.09 33.75 14.23 33.75 11.25C33.75 8.26 32.56 5.4 30.45 3.29C28.34 1.18 25.48 0 22.5 0C19.51 0 16.65 1.18 14.54 3.29C12.43 5.4 11.25 8.26 11.25 11.25C11.25 14.23 12.43 17.09 14.54 19.2C16.65 21.31 19.51 22.5 22.5 22.5ZM30 11.25C30 13.23 29.2 15.14 27.8 16.55C26.39 17.95 24.48 18.75 22.5 18.75C20.51 18.75 18.6 17.95 17.19 16.55C15.79 15.14 15 13.23 15 11.25C15 9.26 15.79 7.35 17.19 5.94C18.6 4.54 20.51 3.75 22.5 3.75C24.48 3.75 26.39 4.54 27.8 5.94C29.2 7.35 30 9.26 30 11.25ZM45 41.25C45 45 41.25 45 41.25 45L3.75 45C3.75 45 0 45 0 41.25C0 37.5 3.75 26.25 22.5 26.25C41.25 26.25 45 37.5 45 41.25ZM41.25 41.23C41.24 40.31 40.67 37.53 38.13 34.99C35.68 32.54 31.08 30 22.5 30C13.91 30 9.31 32.54 6.86 34.99C4.32 37.53 3.75 40.31 3.75 41.23L41.25 41.23Z" fill="#ff8227"/>
                            </svg>
                        </button> */}
                        <img
                            className={`${styles.header__logo_secondary} ${
                                className && `${className}__logo_secondary`
                            }`}
                            src="/header_footer/logo_2_orange.svg"
                            alt="Логотип 2"
                        />
                    </div>
                    <div
                        className={`${styles.header__hamburger} ${
                            className && `${className}__hamburger`
                        }`}>
                        <HamburgerMenu />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
