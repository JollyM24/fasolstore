import React, { Component } from "react";
import Item from "./Item";
import "../Amazon.css"

export class Products extends Component {
    render() {
        return (
            <section>
                {this.props.products.map(el => (
                    <Item key={el.id} product={el} onAdd={this.props.onAdd}/>
                ))}
            </section>
        )
    }
}

export default Products;