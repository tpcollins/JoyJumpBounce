import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.title === action.payload.title);
      if (itemIndex > -1) {
        // If item already exists, update its quantity and total price
        state.items[itemIndex].quantity = action.payload.quantity;
        state.items[itemIndex].totalPrice = action.payload.totalPrice;
      } else {
        // Add new item
        state.items.push(action.payload);
      }
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.title !== action.payload.title);
    },
    clearCart: (state) => {
        state.items = [];
    }
  }
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
