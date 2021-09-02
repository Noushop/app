export const setToken = (token) => localStorage.setItem('token', token);

export const setUser = (user) => localStorage.setItem('user', btoa(JSON.stringify(user)));

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
  const localUser = localStorage.getItem('user');

  if (!localUser) {
    return false;
  }

  return JSON.parse(atob(localUser));
};

export const removeToken = () => localStorage.removeItem('token');

export const removeUser = () => localStorage.removeItem('user');

export const clear = () => localStorage.clear();

export const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  let index = -1;

  if (!cart) {
    cart = [];
  }

  index = cart.findIndex((c) => c.barcode === item.barcode);

  if (index < 0) {
    cart.push({
      barcode: item.barcode,
      quantity: 1,
      prices: item.price,
      price: item.price,
    });
  } else {
    cart[index] = {
      barcode: item.barcode,
      quantity: cart[index].quantity + 1,
      prices: item.price * (cart[index].quantity + 1),
      price: item.price,
    };
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

export const minusToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  let index = -1;

  if (!cart) {
    cart = [];
  }

  index = cart.findIndex((c) => c.barcode === item.barcode);

  if (index > -1) {
    if (cart[index].quantity > 1) {
      cart[index] = {
        barcode: item.barcode,
        quantity: cart[index].quantity - 1,
        prices: item.price * (cart[index].quantity - 1),
        price: item.price,
      };

      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
};

export const getFromCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    return [];
  }

  return cart;
};

export const removeFromCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  let index = -1;

  if (!cart) {
    return null;
  }

  index = cart.findIndex((c) => c.barcode === item.barcode);

  if (index < 0) {
    return null;
  }

  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));

  return true;
};

export const clearCart = () => localStorage.removeItem('cart');
