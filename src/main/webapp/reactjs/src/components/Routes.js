import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import Welcome from "./Welcome";
import Home from "./Home";
import Product from "./Product/Product"
import ProductList from "./Product/ProductList";
import Register from "./User/Register";
import Login from "./User/Login";

const Routes = () => {


    return (
        <Container>
            <Row>
                <Col lg={12} className={"margin-top"}>
                    <Switch>
                        <Route path="/" exact component={Welcome} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/add" exact component={Product} />
                        <Route path="/catalog" exact component={Home} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Route
                            path="/logout"
                            exact
                            component={() => (
                                <Login message="User Logged Out Successfully." />
                            )}
                        />
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
};

export default Routes;