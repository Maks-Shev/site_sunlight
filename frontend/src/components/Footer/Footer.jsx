import React, { useState } from "react";
import "./footer.css";
import "../../style/App.scss"
import { useLocation } from "react-router-dom";
import MapComponent from "./MapComponent";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import OfferModal from "./OfferModal";
import DataModal from "./DataModal";

function Footer() {
    const location = useLocation();
    const showMap = location.pathname !== "/contacts";
    const [showModal, setShowModal] = useState(false);
    const [isOfferModalOpen, setOfferModalOpen] = useState(false);
    const [isDataModalOpen, setDataModalOpen] = useState(false);
    const openOfferModal = () => setOfferModalOpen(true);
    const closeOfferModal = () => setOfferModalOpen(false);
    const openDataModal = () => setDataModalOpen(true);
    const closeDataModal = () => setDataModalOpen(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        comment: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Параметры для отправки письма через EmailJS
        const templateParams = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            comment: formData.comment,
        };

        // Отправка письма через EmailJS
        emailjs
            .send(
                "service_be1gs36",
                "template_uyeyfkc",
                templateParams,
                "HGRJyAvoAPXSDsxd6",
            )
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    alert("Ваш отзыв успешно отправлен!");
                },
                (err) => {
                    console.error("FAILED...", err);
                    alert("Произошла ошибка при отправке отзыва.");
                },
            );
        setShowModal(false);
    };

    return (
        <div className="container__footer container">
            <div className="footer">
                <div className="footer__up">
                    <div className="footer__up__left">
                        <Link to="/">
                            <img
                                src="/header_footer/logo.png"
                                alt="Логотип"
                            />
                        </Link>
                        <div className="footer__title">
                            <p className="footer__up__text">
                                ЦЕНТР ДЛЯ ОСОБЫХ ДЕТЕЙ
                            </p>
                            <p className="footer__up__title">
                                «СОЛНЕЧНЫЙ КРУГ»
                            </p>
                        </div>
                    </div>
                    <div className="footer__up__right">
                        <img
                            src="/header_footer/logo_2_black.png"
                            alt="Логотип 2"
                        />
                    </div>
                </div>
                <div className="footer__down">
                    <div className="footer__menu">
                        <ul>
                            <li>
                                <Link to="/about">О центре</Link>
                            </li>
                            <li>
                                <Link to="/help">Помочь</Link>
                            </li>
                            <li>
                                <Link to="/projects">Проекты</Link>
                            </li>
                            <li>
                                <Link to="/success">Территория успеха</Link>
                            </li>
                            <li>
                                <Link to="/partners">Партнеры</Link>
                            </li>
                            <li>
                                <Link to="/contacts">Контакты</Link>
                            </li>
                            <li>
                                <Link to="/reports">Отчеты</Link>
                            </li>
                            <li>
                                <button
                                    className="footer__review__button"
                                    onClick={() => setShowModal(true)}>
                                    Оставить отзыв
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="address">
                        <div className="footer__time">
                            <span className="footer__time__txt">
                                Работаем пн-пт
                            </span>
                            <span className="footer__time__txt">
                                с 8:00 до 17:30.
                            </span>
                        </div>
                        <address>
                            <p className="footer__address">
                                Тольятти, б-р Туполева, д. 6,
                            </p>
                            <a className="footer__tel" href="tel:+79278911772">
                                +7 (927) 891-17-72
                            </a>
                            <a
                                className="footer__email"
                                href="mailto:slkrug@ya.ru">
                                slkrug@ya.ru
                            </a>
                            <a className="social__logo__footer" href="https://vk.com/slkrug">
                                <svg width="32.000000" height="32.000000" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs/>
                                    <path id="Vector" d="M28.4 10.08C28.58 9.45 28.4 9 27.54 9L24.69 9C23.97 9 23.64 9.39 23.46 9.83C23.46 9.83 22.01 13.48 19.96 15.85C19.3 16.54 19 16.76 18.64 16.76C18.45 16.76 18.18 16.54 18.18 15.92L18.18 10.08C18.18 9.33 17.98 9 17.38 9L12.91 9C12.46 9 12.18 9.34 12.18 9.67C12.18 10.38 13.21 10.55 13.32 12.54L13.32 16.89C13.32 17.84 13.15 18.01 12.79 18.01C11.82 18.01 9.48 14.34 8.08 10.14C7.82 9.32 7.54 9 6.82 9L3.97 9C3.16 9 3 9.39 3 9.83C3 10.61 3.96 14.48 7.49 19.6C9.84 23.1 13.15 25 16.16 25C17.97 25 18.19 24.57 18.19 23.85L18.19 21.21C18.19 20.36 18.36 20.2 18.94 20.2C19.36 20.2 20.08 20.41 21.77 22.1C23.7 24.1 24.01 25 25.1 25L27.94 25C28.76 25 29.16 24.57 28.93 23.74C28.67 22.91 27.75 21.71 26.53 20.29C25.87 19.48 24.87 18.6 24.57 18.17C24.15 17.6 24.27 17.35 24.57 16.85C24.57 16.85 28.04 11.8 28.4 10.08L28.4 10.08Z" fill="currentColor" fillOpacity="1.000000" fillRule="evenodd"/>
                                </svg>
                            </a>
                        </address>
                    </div>
                    {showMap && (
                        <div className="map__container">
                            <div className="map">
                                <MapComponent className="map__component" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="footer__copyright">
                    <button onClick={openOfferModal}>Договор оферты</button>
                    <OfferModal
                        isOpen={isOfferModalOpen}
                        onClose={closeOfferModal}
                    />
                    <button onClick={openDataModal}>
                        Обработка персональных данных
                    </button>
                    <DataModal
                        isOpen={isDataModalOpen}
                        onClose={closeDataModal}
                    />
                    <p>©2024, Солнечный круг</p>
                    <div className="footer__dev__site">
                        <a href="http://guild-of-developers.ru">
                            <p>Разработка сайта</p>
                            <img src="/header_footer/sub_logo.svg" alt="" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Модальное окно */}
            {showModal && (
                <div className="reviews__modal">
                    <div className="reviews__modal__content">
                        <span
                            className="reviews__close"
                            onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h2>Оставить отзыв</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Имя:
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Фамилия:
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Телефон:
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Комментарий:
                                <textarea
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <button type="submit">Отправить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Footer;