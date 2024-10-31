// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItemToCart: (state, action) => {
            const itemInCart = state.items.find(item => item.id === action.payload.id);
            // if (itemInCart) {
            //     itemInCart.quantity += 1; // If item exists, increase quantity
            // } else {
            //     state.items.push({ ...action.payload, quantity: 1 });
            // }
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
