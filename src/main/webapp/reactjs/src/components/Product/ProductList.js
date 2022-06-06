import React, {Component, useState} from "react";
import { connect } from "react-redux";
import { deleteProduct } from "../../services/index";
import "../Amazon.css";

import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";
import Products from "./Products";
import Header from "./Header";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: [],
      search: "",
      currentPage: 1,
      productsPerPage: 3,
      sortDir: "asc",
    }
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
          ? this.setState({ sortDir: "desc" })
          : this.setState({ sortDir: "asc" });
      this.findAllProducts(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllProducts(this.state.currentPage);
  }

  findAllProducts(currentPage) {
    currentPage -= 1;
    axios
        .get(
            "http://localhost:8081/rest/products?pageNumber=" +
            currentPage +
            "&pageSize=" +
            this.state.productsPerPage +
            "&sortBy=price&sortDir=" +
            this.state.sortDir
        )
        .then((response) => response.data)
        .then((data) => {
          this.setState({
            products: data.content,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: data.number + 1,
          });
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("jwtToken");
          this.props.history.push("/");
        });
  }

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllProducts(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllProducts(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllProducts(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
        this.state.totalElements / this.state.productsPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllProducts(condition);
      }
    }
  };

  nextPage = () => {
    if (
        this.state.currentPage <
        Math.ceil(this.state.totalElements / this.state.productsPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllProducts(this.state.currentPage + 1);
      }
    }
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancelSearch = () => {
    this.setState({ search: "" });
    this.findAllProducts(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
        .get(
            "http://localhost:8081/rest/products/search/" +
            this.state.search +
            "?page=" +
            currentPage +
            "&size=" +
            this.state.productsPerPage
        )
        .then((response) => response.data)
        .then((data) => {
          this.setState({
            products: data.content,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: data.number + 1,
          });
        });
  };

  addToOrder(product){
    let isInArray = false
    this.state.orders.forEach(el => {
      if(el.id === product.id)
        isInArray = true
    })
    if (!isInArray)
      this.setState({orders: [...this.state.orders, product ]})
  };

  deleteOrder(id){
    this.setState({orders: this.state.orders.filter(el => el.id !== id)})
  };

  render() {
    const { orders, products, currentPage, totalPages, search } = this.state;

    return (
        <div class="list">
          <div style={{ display: this.state.show ? "block" : "none" }}>
            <MyToast
                show={this.state.show}
                message={"Товар успешно удалён"}
                type={"danger"}
            />
          </div>

          <Header orders={this.state.orders} onDelete={this.deleteOrder}/>

          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <div style={{ float: "left" }}>
                <FontAwesomeIcon icon={faList} /> Список товаров
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <FormControl
                      placeholder="Search"
                      name="search"
                      value={search}
                      className={"info-border bg-dark text-white"}
                      onChange={this.searchChange}
                  />
                  <InputGroup.Append>
                    <Button
                        size="sm"
                        variant="outline-info"
                        type="button"
                        onClick={this.searchData}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline-danger"
                        type="button"
                        onClick={this.cancelSearch}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Header>

            <Card.Body>
              <Products products={this.state.products} onAdd={this.addToOrder} />
            </Card.Body>

            {products.length > 0 ? (
                <Card.Footer>
                  <div style={{ float: "left" }}>
                    Страница {currentPage} из {totalPages}
                  </div>
                  <div style={{ float: "right" }}>
                    <InputGroup size="sm">
                      <InputGroup.Prepend>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1 ? true : false}
                            onClick={this.firstPage}
                        >
                          <FontAwesomeIcon icon={faFastBackward} /> В начало
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1 ? true : false}
                            onClick={this.prevPage}
                        >
                          <FontAwesomeIcon icon={faStepBackward} /> Пред.
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl
                          className={"page-num bg-dark"}
                          name="currentPage"
                          value={currentPage}
                          onChange={this.changePage}
                      />
                      <InputGroup.Append>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === totalPages ? true : false}
                            onClick={this.nextPage}
                        >
                          <FontAwesomeIcon icon={faStepForward} /> След.
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === totalPages ? true : false}
                            onClick={this.lastPage}
                        >
                          <FontAwesomeIcon icon={faFastForward} /> В конец
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                </Card.Footer>
            ) : null}
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
    deleteProduct: (productId) => dispatch(deleteProduct(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
