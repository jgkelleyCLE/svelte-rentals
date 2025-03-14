import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create a safe storage access function
function getStoredCart() {
  if (browser) {
    try {
      const stored = localStorage.getItem('svelteCart');
      return stored ? JSON.parse(stored) : { cartList: [] };
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return { cartList: [] };
    }
  }
  return { cartList: [] }; // Default for server-side rendering
}

// Initialize the store with data from localStorage (if available)
export const cart = writable(getStoredCart());

// Only set up localStorage sync in the browser
if (browser) {
  cart.subscribe(cartData => {
    try {
      localStorage.setItem('svelteCart', JSON.stringify(cartData));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  });
}



// Cart actions
export const cartActions = {
  addToCart: (product) => {
    cart.update(state => {
      const itemIndex = state.cartList.findIndex(item => item.id === product.id);
      
      if (itemIndex >= 0) {
        state.cartList[itemIndex].cartQuantity += product.cartQuantity;
      } else {
        state.cartList.push({...product, cartQuantity: product.cartQuantity});
      }
      
      return state;
    });
  },
  
  removeFromCart: (product) => {
    cart.update(state => {
      state.cartList = state.cartList.filter(item => item.id !== product.id);
      return state;
    });
  },
  
  increaseQuantity: (product) => {
    cart.update(state => {
      const itemIndex = state.cartList.findIndex(item => item.id === product.id);
      if (itemIndex >= 0) {
        state.cartList[itemIndex].cartQuantity += 1;
      }
      return state;
    });
  },
  
  decreaseQuantity: (product) => {
    cart.update(state => {
      const itemIndex = state.cartList.findIndex(item => item.id === product.id);
      if (itemIndex >= 0) {
        if (state.cartList[itemIndex].cartQuantity > 1) {
          state.cartList[itemIndex].cartQuantity -= 1;
        } else {
          state.cartList = state.cartList.filter(item => item.id !== product.id);
        }
      }
      return state;
    });
  },
  
  clearCart: () => {
    cart.update(state => {
      state.cartList = [];
      return state;
    });
  },
  
  setCartItems: (items) => {
    cart.update(state => {
      state.cartList = items;
      return state;
    });
  }
};