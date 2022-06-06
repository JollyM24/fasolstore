import React, { Component } from "react";
import "../Amazon.css"

export class Item extends Component {
    render() {
        return (
            <div className='cards'>
                <div className="image_box">
                    <img src={this.props.product.photoURL} alt="" />
                </div>
                <div className="details">
                    <p>{ this.props.product.p_name }</p>
                    <p>Тип: { this.props.product.p_type }</p>
                    <p>Артикул: { this.props.product.articul }</p>
                    <p>Цена: { this.props.product.price } руб.</p>
                    <button onClick={() => this.props.onAdd(this.props.product)}>+ В корзину</button>
                </div>
            </div>
        )
    }
}

export default Item;