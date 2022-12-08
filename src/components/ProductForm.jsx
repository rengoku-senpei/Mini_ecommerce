import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';

const ProductForm = () => {
  // Input Refs
  const productName = useRef('');
  const productPrice = useRef('');
  const productImage = useRef('');
  const productDesc = useRef('');

  // State,Action Hooks
  const dispatch = useDispatch();
  const { categories, subcategories } = useSelector((state) => state.apiData);

  // On Submit Function
  const addProduct = (e) => {
    e.preventDefault();
    dispatch(
      addToDatabase('/products', {
        name: productName.current.value,
        price: productPrice.current.value,
        image: productImage.current.value,
        description: productDesc.current.value,
      })
    );
  };

  // Fetching Data From Json
  useEffect(() => {
    dispatch(fetchData('categories'));
    dispatch(fetchData('subcategories'));
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          addProduct(e);
        }}
      >
        <div className="form-group">
          <label>Product Name</label>
          <input
            className="form-control"
            ref={productName}
            placeholder="Enter Name"
          />
          <label>Product Price</label>
          <input
            className="form-control"
            ref={productPrice}
            placeholder="Enter Price"
          />
          <label>Product Image</label>
          <input
            className="form-control"
            ref={productImage}
            placeholder="Enter Image Url"
          />
          <label>Product Description</label>
          <input
            className="form-control"
            ref={productDesc}
            placeholder="Enter Description"
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
