import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const navigate = useNavigate();
  const { cart_length } = useSelector((state) => state.cartReducer);

  return (
    <div className="navbar">
      <h5 id="logo">Luxy Loom</h5>
      <button
        type="button"
        className="cart-button"
        onClick={() => navigate('/cart')}
      >
        <FontAwesomeIcon icon={faShoppingCart} color="white" /> 
        {cart_length > 0 && <span className="cart-badge">{cart_length}</span>}
      </button>
    </div>
  );
};

export default NavBar;
