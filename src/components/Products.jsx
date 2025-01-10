
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartProducts } from '../reducers/cartReducer';
import { product_category, sort_by_value } from "../commons/constants";
import { toast } from 'react-toastify';

const Products = () => {
  const dispatch = useDispatch();
  let high_price = 100;

  const [allProducts, setAllProducts] = useState([]);
  const [filterValues, setFilterValues] = useState({
    product_category: 0,
    low_price: 0,
    high_price: high_price,
    sort_by: 0,
  });

  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    setAllProducts(products.filter(d => d.price <= high_price));
  }, [products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  const handleFilter = () => {
    console.log("Filtered values", filterValues);

    const { product_category, low_price, high_price, sort_by } = filterValues;

    if (parseFloat(low_price) < 0 || parseFloat(high_price) < 0) {
      toast.error("Invalid Price Range");
    } else if (parseFloat(low_price) > parseFloat(high_price)) {
      toast.error("Low Price Must Not Be Higher than High Price");
    } else {
      console.log("Before Filter = ", products);

      let filtered_products = products;
      filtered_products = filtered_products.filter(d => d.price >= parseFloat(low_price) && d.price <= parseFloat(high_price));

      console.log("filtered_products Price Range = ", filtered_products);

      filtered_products = parseInt(product_category) !== 0 ? filtered_products.filter(d => d.category === product_category) : filtered_products;

      console.log("filtered_products Category = ", filtered_products);

      filtered_products = parseInt(sort_by) === 1 ? filtered_products.sort((a, b) => a.price - b.price) : parseInt(sort_by) === 2 ? filtered_products.sort((a, b) => b.price - a.price) : filtered_products;

      console.log("filtered_products Sort By = ", filtered_products);

      setAllProducts(filtered_products);
    }
  };

  const handleClearFilter = () => {
    setFilterValues({
      product_category: 0,
      low_price: 0,
      high_price: high_price,
      sort_by: 0,
    });
    setAllProducts(products.filter(d => d.price <= high_price));
  };

  const handleAddToCart = (product) => {
    dispatch(setCartProducts(product));
    toast.success(`${product.title} added to cart!`, { position: "bottom-right" });
  };

  return (
    <div className="products-container">
      <h1 id="pro">More Top Picks For You</h1>
      <div className="filter-bar">
        <h2>Low</h2>
        <input
          name="low_price"
          type="number"
          placeholder="Low Price"
          value={filterValues.low_price}
          onChange={(e) => handleFilterChange(e)}
        />
        <h2>High</h2>
        <input
          name="high_price"
          type="number"
          placeholder="High Price"
          value={filterValues.high_price}
          onChange={(e) => handleFilterChange(e)}
        />
        <h2>Category</h2>
        <select
          name="product_category"
          value={filterValues.product_category}
          onChange={(e) => handleFilterChange(e)}
        >
          <option value="0">None</option>
          {product_category.map((d) => (
            <option key={d.id} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <h2>Sort By</h2>
        <select
          name="sort_by"
          value={filterValues.sort_by}
          onChange={(e) => handleFilterChange(e)}
        >
          <option value="0">None</option>
          {sort_by_value.map((d) => (
            <option key={d.id} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleFilter} className="filter-button">
          Filter
        </button>
        <button
          type="button"
          onClick={handleClearFilter}
          className="clear-filter-button"
        >
          Clear Filter
        </button>
      </div>

      <div className="product-list">
        {allProducts.length ? (
          allProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">Price: ${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-button"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>Oops! No products found...</p>
        )}
      </div>

      <button
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        🔝
      </button>
    </div>
  );
};

export default Products;
