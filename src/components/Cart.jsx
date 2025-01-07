
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Cart = () => {
  const navigate = useNavigate();
  const { cart_products } = useSelector((state) => state.cartReducer);

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="home-button"
      >
        Return to Home
      </button>
      {cart_products.length ? (
        cart_products.map((product) => (
          <div className="cart-item" key={product.id}>
            
            <img
              src={product.image}
              alt={product.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
