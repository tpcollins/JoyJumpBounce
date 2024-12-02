// AppWrapper.js
import React from "react";
import { useSelector } from "react-redux";
import ShoppingCart from "../src/R Components/shoppingcart";
import { useState } from "react";
import CheckoutModal from "../src/R Components/checkoutmodal";

// Wrapper for cart logic
const CartWrapper = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsLength = cartItems.length;

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () =>{
    console.log("handleModalOpen clicked");
    setIsOpen(true);
    console.log("show on booking: ", isOpen)
  };

  return (
    <>
      
      {cartItemsLength > 0 && (
        <ShoppingCart 
        onClick={handleModalOpen}
        />
      )}
          

      <CheckoutModal 
      openVar={isOpen}
      setOpenVar={setIsOpen}
      />
    </>
  );
};

export default CartWrapper;
