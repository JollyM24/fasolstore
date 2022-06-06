import React, {  useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../services";
import "../assets/css/Home-img.css";
import hm from './img/hm.png';

const Welcome = (props) => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
    };

    const guestWelcome = (
        <>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="/login" role="button">Войти</a>
                {" "}
                <a className="btn btn-primary btn-lg" href="/register" role="button">Регистрация</a>
            </p>
        </>
    );
    const userWelcome = (
        <>
        </>
    );

    return (
        <React.Fragment>
            <div className="jumbotron">
                <img className='home-img' src={hm} alt="Photo" />
                <div className='home-text'>
                    <h1 className="display-4">Добро пожаловать на сайт музыкальных инструментов "ФаSoль"!</h1>
                    <p className="lead">    На нашем сайте Вы сможете рассмотреть имеющиеся в нашем магазине товары, а также оформить заказ.</p>
                    <p className="lead">Для начала зарегистрируйтесть или войдите.</p>
                    <p className='k'>{auth.isLoggedIn ? userWelcome : guestWelcome}</p>
                </div>
            </div>
        </React.Fragment>
  );
};

export default Welcome;
