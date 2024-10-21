import React from "react";
import { useNavigate } from "react-router-dom";
import "./authModal.modul.css";

function ProfileModal({ onLogout }) {
    const navigate = useNavigate();

    const handlePersonalInfo = () => navigate("/personal-info");
    const handleFavorites = () => navigate("/favorites");
    const handleOrderHistory = () => navigate("/order-history");

    return (
        <div className="profile__modal">
            <div className="profile__modal__content">
                <button onClick={handlePersonalInfo}>Личная информация</button>
                <button onClick={handleFavorites}>Избранное</button>
                <button onClick={handleOrderHistory}>История покупок</button>
                <button onClick={onLogout}>Выйти</button>
            </div>
        </div>
    );
}

export default ProfileModal;
