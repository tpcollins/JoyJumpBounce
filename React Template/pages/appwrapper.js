// AppWrapper.js
import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/redux/store/store";
import Preloader from "../src/layouts/PreLoader";
import ShoppingCart from "../src/R Components/shoppingcart";

const AppWrapper = ({ children }) => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {loader ? (
          <Preloader />
        ) : (
          <CartWrapper>{children}</CartWrapper>
        )}
      </PersistGate>
    </Provider>
  );
};

// Wrapper for cart logic
const CartWrapper = ({ children }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsLength = cartItems.length;

  return (
    <>
      {/* Render the shopping cart icon only if there are items */}
      {cartItemsLength > 0 && (
        <ShoppingCart onClick={() => console.log("Cart clicked")} />
      )}
      {children}
    </>
  );
};

export default AppWrapper;
