import React, {useState} from 'react';
import list from "./data";
import Cards from "./Card";
import "./Amazon.css";

const Amazon = ({productItems}) => {
    const [cart, setCart] = useState([]);

    const handleClick = (item) => {
        setCart([...cart,item]);
        console.log(item);
    };

    return (
        <section>
            {list.map((item) => (
                <Cards key={item.id} item={item} />
            ))}
        </section>
    );
};

export default Amazon;