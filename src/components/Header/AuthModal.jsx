import React from "react";
import { useNavigate } from "react-router-dom";
import "./authModal.modul.css";

function AuthModal({ onClose, onLogin }) {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/register");
        onClose();
    };

   const handleAuthorization = () => {
        if (onLogin) {
            onLogin();  // Проверяем, передан ли onLogin
        }
        navigate("/authorization");
        onClose();
    };
    return (
        <div>
            <div className="auth__modal">
                <div className="auth__modal__content">
                    <button onClick={handleAuthorization}>Войти</button>
                    <button onClick={handleRegister}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
