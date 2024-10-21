import React, { useState } from "react";
import "../style/profile.modul.css";
// import Header from "../components/Header/Header";
function Profile() {
    const [activeTab, setActiveTab] = useState("info");

    const renderContent = () => {
        switch (activeTab) {
            case "info":
                return <PersonalInfo />;
            case "favorites":
                return <Favorites />;
            case "history":
                return <PurchaseHistory />;
            default:
                return null;
        }
    };
    return (
       <>
        {/* <Header/> */}
        <div className="profile__container">
            <div className="profile__tabs">
                <button onClick={() => setActiveTab("info")}>
                    Личная информация
                </button>
                <button onClick={() => setActiveTab("favorites")}>
                    Избранное
                </button>
                <button onClick={() => setActiveTab("history")}>
                    История покупок
                </button>
            </div>
            <div className="profile__content">{renderContent()}</div>
        </div>
       </>
    );
}

function PersonalInfo() {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };
    const handleSave = (e) => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        alert("Информация сохранена!");
    };

    return (
        <div className="personal-info">
            <input
                type="text"
                placeholder="Имя"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Фамилия"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
            />
            <input
                type="tel"
                placeholder="Телефон"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
            />
            <button onClick={handleSave}>Сохранить</button>
        </div>
    );
}

function Favorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        return <p>У вас нет избранных товаров.</p>;
    }
    return (
        <div className="favorites">
            <h3>ИЗБРОННОЕ</h3>
            <ul>
                {favorites.map((favorite) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

function PurchaseHistory() {
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

    if (purchaseHistory.length === 0) {
        return <p>Покупки ещё не совершались.</p>;
    }

    return (
        <div>
            <h3>История покупок</h3>
            <ul>
                {purchaseHistory.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;
