import React from "react";
import "./modalError.css";

function ModalError({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal__container__error" onClick={onClose}>
            <div
                className="modal__content__error"
                onClick={(e) => e.stopPropagation()}>
                <div className="modal__block__error">
                    <div className="modal__image__error">
                        <img src="/message_error.png" alt="Ошибка" />
                    </div>
                    <div className="modal__text__error">
                        <h2>Что-то пошло не так...</h2>
                        <p>Анкету не удалось отправить</p>
                        <button className="modal__btn__error" onClick={onClose}>
                            Попробовать снова
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalError;
