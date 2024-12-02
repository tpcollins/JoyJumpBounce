// Redux Variables
import { useSelector } from 'react-redux';

const ShoppingCart = ({
    onClick
}) => {
    // Cart Items from Redux
    const cartItems = useSelector((state) => state.cart.items);

    // Cart Items Length
    let cartItemsLength = cartItems.length;

    return(
        <div 
        className="cart-icon"
        id="cart-icon"
        onClick={onClick}
        style={{cursor: 'pointer'}}
        >
            <img 
            alt="Cart Icon"
            className="cart-icon-img"
            src="/assets/icon/shopping-cart.svg"/>

            {cartItemsLength > 0 && (
                <div className="cart-badge">
                    {cartItemsLength}
                </div>
            )}
        </div>
    );
};

export default ShoppingCart; 