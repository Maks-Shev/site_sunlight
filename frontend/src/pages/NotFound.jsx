import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import "../style/notFound.modul.css";

function NotFound() {
    return (
        <>
            <Header />
            <div className="container__not__found">
                <div className="block__not__found">
                    <div className="not__found__img">
                        <img src="/404.webp" alt="" />
                    </div>
                    <div className="btn__not__found">
                        <h2 className="not__found__title">
                            страница не найдена
                        </h2>
                        <Link className="btn__home" to="/">
                            Вернуться на главную
                        </Link>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default NotFound;
