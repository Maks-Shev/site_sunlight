import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SuccessModal from "../components/SuccessModal";

function ConfirmEmail() {
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
    const navigate = useNavigate();

    const handleConfirmEmail = () => {
       const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
       const email = localStorage.getItem("userEmail");
       const userIndex = registeredUsers.findIndex((u) => u.email === email)

       if (userIndex > -1) {
           registeredUsers[userIndex].isEmailConfirmed = true;
           localStorage.setItem("users", JSON.stringify(registeredUsers));
           setIsEmailConfirmed(true);
       }
    }

    const handleProceedToProfile = () => {
        navigate("/profile");
    }
    return (
        <div>
            <Header />
            {!isEmailConfirmed ? (
                <div className="confirmEmail__container">
                <h2>ВЫ УСПЕШНО ЗАРЕГИСТРИРОВАНЫ!</h2>
                <p>
                    На почту (почта пользователя) отправлено письмо со ссылкой
                    для подтверждения регистрации. Если вы не можете найти
                    письмо, проверьте, пожалуйста, папку спам.
                </p>
                <button onClick={handleConfirmEmail}>Подтвердить почту</button>
                <label htmlFor="email">E-mail</label>
                <input type="email" />
                <button>Отправить письмо повторно</button>
            </div>
            ) : (
                <SuccessModal
                    message="Почта успешно подтверждена!"
                    onConfirm={handleProceedToProfile}
                />
            )}
            <Footer />
        </div>
    );
}

export default ConfirmEmail;
