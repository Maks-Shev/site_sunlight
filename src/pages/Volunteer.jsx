import React, { useState, useEffect, useLayoutEffect } from "react";
import emailjs from "emailjs-com";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../style/volunteer.css";
import DataModal from "../components/Footer/DataModal";
import ModalError from "../components/Volunteer/ModalError";
import ModalConfirm from "../components/Volunteer/ModalConfirm";
import Select, { components } from "react-select";
import "../style/App.scss";

function Volunteer() {
    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутка страницы к началу
    }, []);

    const [selectedOption, setSelectedOption] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        phone: "",
        helpType: "",
    });

    const [errors, setErrors] = useState({}); // State для ошибок
    const [isErrorModalOpen, setErrorModalOpen] = useState(false); // Состояние для ошибки
    const [errorMessage, setErrorMessage] = useState(""); // Сообщение об ошибке
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    const options = [
        { value: "cleaning", label: "Уборка территорий/помещений" },
        { value: "courier", label: "Курьер" },
        { value: "childcare", label: "Помощь в работе с детьми" },
        { value: "design", label: "Дизайн" },
        { value: "photography", label: "Фото/видео съемка" },
        { value: "construction", label: "Строительные и ремонтные работы" },
        { value: "electrician", label: "Электрик, сантехник" },
        { value: "other", label: "Другая профессиональная помощь" },
    ];

    const [isDataModalOpen, setDataModalOpen] = useState(false);
    const openDataModal = () => setDataModalOpen(true);
    const closeDataModal = () => setDataModalOpen(false);
    const closeErrorModal = () => setErrorModalOpen(false);
    const closeSuccessModal = () => setSuccessModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Сброс ошибки при вводе
    };

    const handleSelectChange = (option) => {
        setSelectedOption(option);
        setFormData({ ...formData, helpType: option ? option.label : "" });
        setErrors({ ...errors, helpType: "" }); // Сброс ошибки при выборе
    };

    // Функция валидации полей
    const validate = () => {
        const newErrors = {};

        // Проверка на латиницу и кириллицу для Имени, Фамилии и Отчества с минимальной длиной
        const namePattern = /^[a-zA-Zа-яА-ЯёЁ]+$/;
        if (!formData.firstName.trim()) {
            newErrors.firstName = "Введите имя.";
        } else if (!namePattern.test(formData.firstName.trim())) {
            newErrors.firstName = "Имя может содержать только буквы.";
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "Имя должно содержать не менее 2 символов.";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Введите фамилию.";
        } else if (!namePattern.test(formData.lastName.trim())) {
            newErrors.lastName = "Фамилия может содержать только буквы.";
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName =
                "Фамилия должна содержать не менее 2 символов.";
        }

        if (
            formData.middleName.trim() &&
            !namePattern.test(formData.middleName.trim())
        ) {
            newErrors.middleName = "Отчество может содержать только буквы.";
        } else if (
            formData.middleName.trim().length > 0 &&
            formData.middleName.trim().length < 2
        ) {
            newErrors.middleName =
                "Отчество должно содержать не менее 2 символов, если заполнено.";
        }

        // Валидация email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Введите email.";
        } else if (!emailPattern.test(formData.email.trim())) {
            newErrors.email = "Введите корректный email.";
        }

        // Валидация телефона
        const phonePattern = /^[\d+\-()\s]{10,20}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = "Введите телефон.";
        } else if (!phonePattern.test(formData.phone.trim())) {
            newErrors.phone =
                "Телефон может содержать только цифры и символы +, -, (, ).";
        }

        // Проверка типа помощи
        if (!formData.helpType.trim()) {
            newErrors.helpType = "Выберите тип помощи.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        const templateParams = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            middleName: formData.middleName,
            email: formData.email,
            phone: formData.phone,
            helpType: formData.helpType,
        };

        emailjs
            .send(
                "service_be1gs36",
                "template_uyeyfkc",
                templateParams,
                "HGRJyAvoAPXSDsxd6",
            )
            .then(
                (response) => {
                    setSuccessModalOpen(true);
                },
                (err) => {
                    setErrorMessage(
                        "Произошла ошибка при отправке анкеты. Попробуйте снова.",
                    );
                    setErrorModalOpen(true); // Открываем модальное окно при ошибке
                },
            );
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useLayoutEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const customStyles = {
        control: (provided) => {
            let selectWidth;

            if (windowWidth <= 360) {
                selectWidth = 256;
            } else if (windowWidth <= 576) {
                selectWidth = 290;
            } else {
                selectWidth = 614;
            }

            return {
                ...provided,
                width: selectWidth,
                height: 46,
                marginTop: 6,
                padding: "0 15px",
                borderRadius: 5,
                border: "1px solid rgba(113, 113, 122, 1)",
                boxShadow: "none",
                cursor: "pointer",
            };
        },
        dropdownIndicator: (provided) => ({
            ...provided,
            padding: "0 10px",
            color: "rgba(113, 113, 122, 1)",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        menu: (provided) => ({
            ...provided,
            marginTop: "5px",
            width: "615px",
            borderRadius: "5px",
            border: "1px solid rgba(113, 113, 122, 1)",
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: "400px",
            padding: "0",
        }),
        option: (provided, state) => ({
            ...provided,
            height: "40px",
            backgroundColor: state.isFocused ? "rgba(255, 212, 60, 1)" : "#fff",
            color: state.isSelected ? "black" : "inherit",
            padding: "12px 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            fontFamily: "Nunito",
            fontSize: "16px",
            fontWeight: 500,
        }),
        singleValue: (provided) => ({
            ...provided,
            fontFamily: "Nunito",
            fontSize: "16px",
            fontWeight: 500,
        }),
        placeholder: (provided) => ({
            ...provided,
            fontFamily: "Nunito",
            fontSize: "16px",
            fontWeight: 500,
        }),
    };

    const CustomOption = (props) => {
        return (
            <components.Option {...props}>
                {props.label}
                {props.isSelected && (
                    <span style={{ marginLeft: "10px" }}>✔️</span>
                )}
            </components.Option>
        );
    };

    return (
        <>
            <Header />
            <div className="volunteer__container">
                <div className="volunteer__content">
                    <h2 className="volunteer__title">
                        Анкета <br className="volunteer__br" /> для записи
                        волонтёром
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="volunteer__name">
                            <label>
                                <span className="required">Имя</span>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    className={
                                        errors.firstName ? "input-error" : ""
                                    }
                                    onChange={handleInputChange}
                                />
                                {errors.firstName && (
                                    <span className="error">
                                        {errors.firstName}
                                    </span>
                                )}
                            </label>
                            <label>
                                <span className="required">Фамилия</span>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    className={
                                        errors.lastName ? "input-error" : ""
                                    }
                                    onChange={handleInputChange}
                                />
                                {errors.lastName && (
                                    <span className="error">
                                        {errors.lastName}
                                    </span>
                                )}
                            </label>
                            <label>
                                <span className="nod__required">Отчество</span>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleInputChange}
                                />
                                {errors.middleName && (
                                    <span className="error">
                                        {errors.middleName}
                                    </span>
                                )}
                            </label>
                        </div>
                        <div className="volunteer__contacts">
                            <label>
                                <span className="required">E-mail</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className={
                                        errors.email ? "input-error" : ""
                                    }
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <span className="error">
                                        {errors.email}
                                    </span>
                                )}
                            </label>
                            <label>
                                <span className="required">Телефон</span>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    className={
                                        errors.phone ? "input-error" : ""
                                    }
                                    onChange={handleInputChange}
                                />
                                {errors.phone && (
                                    <span className="error">
                                        {errors.phone}
                                    </span>
                                )}
                            </label>
                        </div>
                        <div className="volunteer__job">
                            <p>Чем я могу помочь?</p>
                            <Select
                                options={options}
                                components={{ Option: CustomOption }}
                                styles={customStyles}
                                value={selectedOption}
                                onChange={handleSelectChange}
                                placeholder="Выберите"
                                className={
                                    errors.helpType ? "select-error" : ""
                                }
                            />
                            {errors.helpType && (
                                <span className="error">{errors.helpType}</span>
                            )}
                        </div>
                        <div className="volunteer__submit">
                            <div className="volunteer__submit_message">
                                <p>
                                    Нажимая на кнопку, вы даете согласие на
                                    обработку персональных данных
                                </p>
                                <p>
                                    и соглашаетесь
                                    <span onClick={openDataModal}>
                                        c политикой конфиденциальности
                                    </span>
                                </p>
                            </div>
                            <button type="submit">Отправить</button>
                        </div>
                    </form>
                    <div className="volunteer__note">
                        <span className="required">*</span> — Обязательные поля
                        для заполнения
                    </div>
                    <div className="volunteer__data">
                        Нажимая на кнопку «Отправить», вы даёте согласие на{" "}
                        <span className="openDataModal" onClick={openDataModal}>
                            обработку персональных данных
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
            <DataModal isOpen={isDataModalOpen} onClose={closeDataModal} />
            <ModalError
                isOpen={isErrorModalOpen}
                onClose={closeErrorModal}
                message={errorMessage}
            />{" "}
            {/* Модальное окно ошибки */}
            <ModalConfirm
                isOpen={isSuccessModalOpen}
                onClose={closeSuccessModal}
            />{" "}
            {/* Модальное окно успеха */}
        </>
    );
}

export default Volunteer;
