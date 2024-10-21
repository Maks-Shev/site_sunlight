import React from "react";
import { useNavigate } from "react-router-dom";

import "./Header/authModal.modul.css";
function SuccessModal() {
    const navigate = useNavigate();

    const handleProceedToProfile = () => {
        navigate("/profile");
    }
    return (
        <div>
            <div className="success__container">
                <div className="success__img">
                    <img src="/success_img.png" alt="Успех" />
                </div>
                <div className="success__text">
                    <h2>Почта успешно подтверждена!</h2>
                    <button>В личный кабинет</button>
                </div>
            </div>
        </div>
    );
}

export default SuccessModal;
