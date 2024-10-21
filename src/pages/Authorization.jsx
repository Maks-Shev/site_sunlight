import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import openPassword from "../assets/openPassword.svg"; // Импортируем изображение
import { loginUsers } from "../features/API/auth/loginSlice";
import "../style/Authorization.css"; // Подключаем CSS стили

function Authorization() {
    const { status, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Состояние для отображения пароля
    const [errors, setErrors] = useState({}); // Состояние для ошибок
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        
        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            newErrors.email = "Введите корректный email.";
        }

        // Password validation
        if (password.length < 8) {
            newErrors.password = "Пароль должен содержать минимум 8 символов.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        // Диспатчим loginUsers для отправки данных
        const resultAction = await dispatch(loginUsers({ email, password }));

        if (loginUsers.fulfilled.match(resultAction)) {
            navigate("/profile"); // Перенаправление на страницу профиля после успешной авторизации
        } else if (loginUsers.rejected.match(resultAction)) {
            setErrors({ serverError: resultAction.payload || 'Ошибка авторизации' });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div>
            <Header />
            <div className="login-container">
                <h2>ВОЙТИ В ЛИЧНЫЙ КАБИНЕТ</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="email">Логин</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Введите email"
                        className={errors.email ? "input-error" : ""}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: "" }); // Убираем ошибку при вводе
                        }}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <label htmlFor="password">Пароль</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"} // Меняем тип на text при showPassword
                            id="password"
                            placeholder="Введите пароль"
                            className={errors.password ? "input-error" : ""}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: "" }); // Убираем ошибку при вводе
                            }}
                            
                        />
                        <img
                            src={openPassword}
                            alt="Показать пароль"
                            className="password-toggle"
                            onMouseDown={() => setShowPassword(true)} // Показать пароль при удержании
                            onMouseUp={() => setShowPassword(false)}  // Скрыть пароль при отпускании
                            onMouseLeave={() => setShowPassword(false)} // Скрыть пароль, если мышь ушла с кнопки
                        />
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                    {error && <span className="error">{error}</span>} {/* Отображение ошибки от сервера */}
                    {errors.serverError && <span className="error">{errors.serverError}</span>}

                    <a href="#" className="forgot-password">Забыли пароль?</a>
                    <button type="submit" className="login-button" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Загрузка...' : 'Войти'}
                    </button>
                </form>
                <div className="register-link">
                    <p>У вас нет личного кабинета?</p>
                    <button className="register-button" onClick={() => navigate("/register")}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Authorization;
