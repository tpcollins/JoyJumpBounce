const ShoppingCart = ({onClick}) => {
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
        </div>
    );
};

export default ShoppingCart; 