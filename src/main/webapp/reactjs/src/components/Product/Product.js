import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveProduct,
  fetchProduct,
  updateProduct,
  fetchP_types,
} from "../../services/index";

import { Card, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      p_types: [],
      show: false,
    };
  }

  initialState = {
    id: "",
    p_name: "",
    articul: "",
    photoURL: "",
    price: "",
    p_type: "",
  };

  componentDidMount() {
    const productId = +this.props.match.params.id;
    if (productId) {
      this.findProductById(productId);
    }
    this.findAllP_types();
  }

  findAllP_types = () => {
    this.props.fetchP_types();
    setTimeout(() => {
      let productP_types = this.props.productObject.p_types;
      if (productP_types) {
        this.setState({
          p_types: [{ value: "", display: "Select Type" }].concat(
            productP_types.map((p_type) => {
              return { value: p_type, display: p_type };
            })
          ),
        });
      }
    }, 100);
  };

  findProductById = (productId) => {
    this.props.fetchProduct(productId);
    setTimeout(() => {
      let product = this.props.productObject.product;
      if (product != null) {
        this.setState({
          id: product.id,
          p_name: product.p_name,
          articul: product.articul,
          photoURL: product.photoURL,
          price: product.price,
          p_type: product.p_type,
        });
      }
    }, 1000);
  };

  resetProduct = () => {
    this.setState(() => this.initialState);
  };

  submitProduct = (event) => {
    event.preventDefault();

    const product = {
      p_name: this.state.p_name,
      articul: this.state.articul,
      photoURL: this.state.photoURL,
      price: this.state.price,
      p_type: this.state.p_type,
    };

    this.props.saveProduct(product);
    setTimeout(() => {
      if (this.props.productObject.product != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateProduct = (event) => {
    event.preventDefault();

    const product = {
      id: this.state.id,
      p_name: this.state.p_name,
      articul: this.state.articul,
      photoURL: this.state.photoURL,
      price: this.state.price,
      p_type: this.state.p_type,
    };
    this.props.updateProduct(product);
    setTimeout(() => {
      if (this.props.productObject.product != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  productChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  productList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { p_name, articul, photoURL, price, p_type } =
      this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Продукт успешно добавлен"
                : "Продукт успешно сохранён"
            }
            type={"success"}
          />
        </div>

        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "product" : "Добавить свой товар на продажу"}
          </Card.Header>
          <Form
            onReset={this.resetProduct}
            onSubmit={this.state.id ? this.updateProduct : this.submitProduct}
            id="productFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <p>Наименование</p>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="p_name"
                    value={p_name}
                    onChange={this.productChange}
                    className={"bg-dark text-white"}
                    placeholder="Наименование"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAuthor">
                  <p>Артикул</p>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="articul"
                    value={articul}
                    onChange={this.productChange}
                    className={"bg-dark text-white"}
                    placeholder="Артикул"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                  <p>Изображение(URL)</p>
                  <InputGroup>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="photoURL"
                      value={photoURL}
                      onChange={this.productChange}
                      className={"bg-dark text-white"}
                      placeholder="URL изображения"
                    />
                    <InputGroup.Append>
                      {this.state.photoURL !== "" && (
                        <Image
                          src={this.state.coverPhotoURL}
                          roundedRight
                          width="40"
                          height="38"
                        />
                      )}
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <p>Стоимость</p>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="price"
                    value={price}
                    onChange={this.productChange}
                    className={"bg-dark text-white"}
                    placeholder="Стоимость (в рублях)"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLanguage">
                  <p>Вид</p>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.productChange}
                    name="p_type"
                    value={p_type}
                    className={"bg-dark text-white"}
                  >
                    {this.state.p_types.map((p_type) => (
                      <option key={p_type.value} value={p_type.value}>
                        {p_type.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Изменить" : "Сохранить"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Заново
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productObject: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProduct: (product) => dispatch(saveProduct(product)),
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    updateProduct: (product) => dispatch(updateProduct(product)),
    fetchP_types: () => dispatch(fetchP_types()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
