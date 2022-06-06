import React, { Component } from "react";
import { FaTrash } from 'react-icons/fa';
import "../Amazon.css"

export class Order extends Component {
    render() {
        return (
            <div>
                <div className="image_box">
                    <img src={this.props.product.photoURL} alt="" />
                </div>
                <div className="details">
                    <p>{ this.props.product.p_name }</p>
                    <p>Тип: { this.props.product.p_type }</p>
                    <p>Артикул: { this.props.product.articul }</p>
                    <p>Цена: { this.props.product.price } руб.</p>
                </div>
                <FaTrash className='delete-icon'
                onClick={() => this.props.onDelete(this.props.product.id)}/>
            </div>
        )
    }
};

export default Order;