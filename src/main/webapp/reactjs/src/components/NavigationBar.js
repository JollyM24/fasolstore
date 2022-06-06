import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../services/index";
import "../assets/css/Navbar.css";

const NavigationBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
    <>
      <div className="mr-auto"></div>
      <Nav className="navbar-right">
        <Link to={"register"} className="nav-link">
          <FontAwesomeIcon icon={faUserPlus} /> Регистрация
        </Link>
        <Link to={"login"} className="nav-link">
          <FontAwesomeIcon icon={faSignInAlt} /> Вход
        </Link>
      </Nav>
    </>
  );
  const userLinks = (
    <>
      <Nav className="mr-auto">
        <Link to={"catalog"} className="nav-link">
          Каталог
        </Link>
          <Link to={"add"} className="nav-link">
            Добавить товар
          </Link>
        {/*  <Link to={"cart"} className="nav-link">*/}
        {/*  Корзина*/}
        {/*  <span>*/}
        {/*    <i class="fas fa-cart-plus" />*/}
        {/*  </span>*/}
        {/*  <span id="count">0</span>*/}
        {/*</Link>*/}
      </Nav>
      <Nav className="navbar-right">
        <Link to={"logout"} className="nav-link" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Выход
        </Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="primary" variant="dark">
      <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1792/1792737.png"
          width="45"
          height="45"
          alt="brand"
        />{" "}
        ФаSоль
      </Link>
      {auth.isLoggedIn ? userLinks : guestLinks}
    </Navbar>
  );
};

export default NavigationBar;
