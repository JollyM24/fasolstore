import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../services/index";

import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    id: "",
    email: "",
    mobile: "",
    name: ""
  };


}