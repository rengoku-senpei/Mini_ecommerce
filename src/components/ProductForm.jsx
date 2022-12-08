import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToDatabase } from '../actions';

const ProductForm = () => {
  const dispatch = useDispatch();
  const product = useRef('');

  const addProduct = (e) => {
    e.preventDefault();
    dispatch(addToDatabase('/products', product.current.value));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          addProduct(e);
        }}
      >
        <div className="form-group">
          <label>Category</label>
          <input
            className="form-control"
            ref={product}
            placeholder="Enter Product"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
