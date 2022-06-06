import React, {useState} from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";
import ProductList from "./Product/ProductList"

const Home = () => {
    if (localStorage.jwtToken) {
      authToken(localStorage.jwtToken);
    }

    const auth = useSelector((state) => state.auth);

    return (
      <React.Fragment>
          <Alert style={{ backgroundColor: '#d1edff', color: "#172e49", textAlign: "center",}}>
              Вы вошли как {auth.username}
          </Alert>
          <ProductList />
      </React.Fragment>
    );
};


export default Home;
