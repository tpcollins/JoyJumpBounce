// AppWrapper.js
import React from "react";
import { useSelector } from "react-redux";
import ShoppingCart from "../src/R Components/shoppingcart";
import { useState, useEffect } from "react";
import CheckoutModal from "../src/R Components/checkoutmodal";
import { useRouter } from "next/router";

// Wrapper for cart logic
const CartWrapper = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsLength = cartItems.length;

  const router = useRouter();
  const [hideCart, setHideCart] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () =>{
    console.log("handleModalOpen clicked");
    setIsOpen(true);
    console.log("show on booking: ", isOpen)
  };

  useEffect(() => {
    const hideOnPages = ['/checkout']; // Pages to hide the button and close the modal
    const shouldHide = hideOnPages.includes(router.pathname);

    setHideCart(shouldHide); // Hide the ShoppingCart component
    if (shouldHide) {
        setIsOpen(false); // Close the modal if on the checkout page
    }
  }, [router.pathname]);


  return (
    <>
      
      {cartItemsLength > 0 && !hideCart && (
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
