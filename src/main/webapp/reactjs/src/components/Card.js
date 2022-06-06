import React from 'react';
import "../App.css";

const Cards = ({ item }) => {
    const {id, p_name, articul, photoURL, price, p_type} = item;

    return (
        <div className="cards">
            <div className="image_box">
                <img src={photoURL} alt="" />
            </div>
            <div className="details">
                <p>{ p_name }</p>
                <p>Тип: { p_type }</p>
                <p>Артикул: { articul }</p>
                <p>Цена: { price } руб.</p>
                {/*<button*/}
                {/*    onClick={() => handleAddProduct(item)}>*/}
                {/*        + В корзину*/}
                {/*   </button>*/}
                <button>+ В корзину</button>
            </div>
        </div>
    );
};

export default Cards;