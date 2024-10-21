import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { registerUsers } from "../features/API/register/registerSlice";
import "../style/register.css";
import DataModal from "../components/Footer/DataModal";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.register);

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreement, setAgreement] = useState(false);
    const [checkRobot, setCheckRobot] = useState(false);
    const [errors, setErrors] = useState({});
    const [isDataModalOpen, setDataModalOpen] = useState(false);

    const openDataModal = () => setDataModalOpen(true);
    const closeDataModal = () => setDataModalOpen(false);

    const validate = () => {
        const newErrors = {};
        const namePattern = /^[a-zA-Zа-яА-ЯёЁ\-]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.\[a-zA-Za]\[^\s@]+$/;
        const phonePattern = /^[\d+\s]{10,15}$/;
        const passwordPattern = /^[^\s@]+@[^\s@]+\.\[a-zA-Za]\[^\s@]{8,}$/;

        if (!namePattern.test(first_name)) newErrors.first_name = "Имя может содержать только буквы.";
        if (!namePattern.test(last_name)) newErrors.last_name = "Фамилия может содержать только буквы.";
        if (patronymic && !namePattern.test(patronymic)) newErrors.patronymic = "Отчество может содержать только буквы.";
        if (!emailPattern.test(email)) newErrors.email = "Введите корректный email.";
        if (!phonePattern.test(phone)) newErrors.phone = "Телефон может содержать только цифры и символ +";
        if (phonePattern.test(phone) && phone.split("+")[1].length < 11) newErrors.phone = "Телефон должен содержать 10 цифр.";
        if (!first_name) newErrors.first_name = "Обязательное поле.";
        if (!last_name) newErrors.last_name = "Обязательное поле.";
        if (!email) newErrors.email = "Обязательное поле.";
        if (!phone) newErrors.phone = "Обязательное поле.";
        if (!password || password.length < 8) newErrors.password = "Минимум 8 символов (буквы, цифры, знаки).";
        if (passwordPattern.test(password)) newErrors.password = "Пароль может содержать только латинские буквы, цифры и символы"
        if (!confirmPassword) newErrors.confirmPassword = "Обязательное поле.";
        if (password !== confirmPassword) newErrors.confirmPassword = "Пароли не совпадают.";
        if (!agreement) newErrors.agreement = "Обязательное поле.";
        if (!checkRobot) newErrors.checkRobot = "Обязательное поле.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validate()) return;

        try {
            await dispatch(
                registerUsers({
                    first_name,
                    last_name,
                    patronymic,
                    email,
                    password,
                    phone,
                }),
            ).unwrap();
            navigate("/confirm-email");
        } catch (err) {
            console.error("Ошибка при регистрации:", err);
        }
    };

    if (status === "loading") {
        return <p>Загрузка...</p>;
    }

    return (
        <>
            <Header />
            <div className="register__container">
                <div className="register__title">
                    <h2>РЕГИСТРАЦИЯ АККАУНТА</h2>
                </div>
                <div className="register__input__name">
                    <ul>
                        <li>
                            <label>
                                <span className="required">Фамилия</span>
                                <input
                                    type="text"
                                    className={errors.last_name ? "input-error" : ""}
                                    value={last_name}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        setErrors({ ...errors, last_name: "" });
                                    }}
                                    required
                                />
                                {errors.last_name && (
                                    <span className="error">{errors.last_name}</span>
                                )}
                            </label>
                        </li>
                        <li>
                            <label>
                                <span className="required">Имя</span>
                                <input
                                    type="text"
                                    className={errors.first_name ? "input-error" : ""}
                                    value={first_name}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                        setErrors({ ...errors, first_name: "" });
                                    }}
                                    required
                                />
                                {errors.first_name && (
                                    <span className="error">{errors.first_name}</span>
                                )}
                            </label>
                        </li>
                        <li>
                            <label>
                                <span>Отчество</span>
                                <input
                                    type="text"
                                    value={patronymic}
                                    onChange={(e) => setPatronymic(e.target.value)}
                                />
                                {errors.patronymic && (
                                    <span className="error">{errors.patronymic}</span>
                                )}
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="register__input__email__pass">
                    <ul>
                        <li>
                            <label>
                                <span className="required">E-mail</span>
                                <input
                                    type="email"
                                    className={errors.email ? "input-error" : ""}
                                    placeholder="На указанный E-mail будут приходить чеки об оплате"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors({ ...errors, email: "" });
                                    }}
                                    required
                                />
                                {errors.email && (
                                    <span className="error">{errors.email}</span>
                                )}
                            </label>
                        </li>
                        <li>
                            <label>
                                <span className="required">Телефон</span>
                                <input
                                    type="tel"
                                    className={errors.phone ? "input-error" : ""}
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        setErrors({ ...errors, phone: "" });
                                    }}
                                    required
                                />
                                {errors.phone && (
                                    <span className="error">{errors.phone}</span>
                                )}
                            </label>
                        </li>
                        <li>
                            <label>
                                <span className="required">Пароль</span>
                                <input
                                    type="password"
                                    className={errors.password ? "input-error" : ""}
                                    placeholder="Минимум 8 символов (буквы, цифры, знаки)"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors({ ...errors, password: "" });
                                    }}
                                    required
                                />
                                {errors.password && (
                                    <span className="error">{errors.password}</span>
                                )}
                            </label>
                        </li>
                        <li>
                            <label>
                                <span className="required">Повторите пароль</span>
                                <input
                                    type="password"
                                    className={errors.confirmPassword ? "input-error" : ""}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setErrors({ ...errors, confirmPassword: "" });
                                    }}
                                    required
                                />
                                {errors.confirmPassword && (
                                    <span className="error">{errors.confirmPassword}</span>
                                )}
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="register__agreement">
                    <input
                        type="checkbox"
                        id="agreement"
                        onChange={(e) => {
                            setAgreement(e.target.checked);
                            setErrors({ ...errors, agreement: "" });
                        }}
                        required
                    />
                    <div className="register__checkbox__block">
                        <div className="register__checkbox">
                            <label htmlFor="agreement" className="register__agreement__text"></label>
                        </div>
                        <div className="agreement__block">
                            <p>Принимаю условия</p>
                            <span onClick={openDataModal}>пользовательского соглашения</span>
                        </div>
                    </div>
                    {errors.agreement && (
                        <sub className="error">{errors.agreement}</sub>
                    )}
                </div>
                <div className="register__button">
                    <div className={`register__check ${errors.checkRobot ? "input-error" : ""}`}>
                        <input
                            type="checkbox"
                            id="checkRobot"
                            name="checkRobot"
                            onChange={(e) => {
                                setCheckRobot(e.target.checked);
                                setErrors({ ...errors, checkRobot: "" });
                            }}
                        />
                        <label htmlFor="checkRobot" className="register__robot__text">
                            Я не робот
                        </label>
                    </div>
                    {errors.checkRobot && (
                        <sub className="error">{errors.checkRobot}</sub>
                    )}
                    <button className="btn__register" type="submit" onClick={handleRegister}>
                        Зарегистрироваться
                    </button>
                    <div className="register__have__account">
                        <h3>У вас уже есть личный кабинет?</h3>
                        <button className="register__btn__auth" onClick={() => navigate("/authorization")}>
                            Войти
                        </button>
                    </div>
                </div>
            </div>
            <div className="register__modal">
                <DataModal isOpen={isDataModalOpen} onClose={closeDataModal} />
            </div>
            <Footer />
        </>
    );
}

export default Register;