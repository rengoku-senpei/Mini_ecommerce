import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';

const ProductForm = () => {
  // Input Refs
  const productName = useRef('');
  const productPrice = useRef('');
  const productImage = useRef('');
  const productDesc = useRef('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

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
        category: category,
        subcategory: subcategory,
      })
    );
  };

  // Fetching Data From Json
  useEffect(() => {
    dispatch(fetchData('categories'));
    dispatch(fetchData('subcategories'));
  }, [category]);

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
          {categories ? (
            <>
              <label>Choose Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategoryOptions(
                    subcategories.filter(
                      (subcategory) => subcategory.parentId === e.target.value
                    )
                  );
                }}
                name="category"
                id="category"
              >
                <option value="">Choose Catagory</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {category !== '' ? (
                <>
                  <label>Choose SubCategory</label>
                  <select
                    value={subcategory}
                    onChange={(e) => {
                      setSubcategory(e.target.value);
                    }}
                    name="category"
                    id="category"
                  >
                    <option value="">Choose SubCategory</option>
                    {subCategoryOptions.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <button type="submit" className="btn btn-dark">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
