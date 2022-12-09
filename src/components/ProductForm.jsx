import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';
import * as yup from 'yup';

const ProductForm = () => {
  // Input Refs
  const productName = useRef('');
  const productPrice = useRef('');
  const productImage = useRef('');
  const productDesc = useRef('');
  const [category, setCategory] = useState('');
  const [variant, setVariant] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [subVariant, setSubVariant] = useState('');
  const [subVariants, setSubVariants] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [subVariantOptions, setSubVariantOptions] = useState([]);

  // Yup Validation
  let schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required().positive(),
    image: yup.string().required(),
    description: yup.string().required(),
    category: yup.number().required(),
    subcategory: yup.number().required(),
    variant: yup.object().required(),
  });

  // State,Action Hooks
  const dispatch = useDispatch();
  const { categories, subcategories, variants, subvariants } = useSelector(
    (state) => state.apiData
  );

  // On Submit Function
  const addProduct = (e) => {
    e.preventDefault();
    const values = {
      name: productName.current.value,
      price: productPrice.current.value,
      image: productImage.current.value,
      description: productDesc.current.value,
      category: category,
      subcategory: subcategory,
      variant: { [variant]: subVariants },
    };

    schema.isValid(values).then((valid) => {
      if (valid) {
        console.log('hi');
        dispatch(addToDatabase('/products', values));

        // Resetting The Form
        productName.current.value = '';
        productPrice.current.value = '';
        productImage.current.value = '';
        productDesc.current.value = '';
        setCategory('');
        setVariant('');
        setSubcategory('');
        setSubVariant('');
        setSubVariants([]);
        setSubCategoryOptions([]);
        setSubVariantOptions([]);
      }
    });
  };

  // Fetching Data From Json
  useEffect(() => {
    dispatch(fetchData('categories'));
    dispatch(fetchData('subcategories'));
    dispatch(fetchData('variants'));
    dispatch(fetchData('subvariants'));
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
            <div>
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
            </div>
          ) : null}
          {variants ? (
            <div>
              <label>Choose Variants</label>
              <select
                value={variant}
                onChange={(e) => {
                  setVariant(e.target.value);
                  setSubVariantOptions(
                    subvariants.filter(
                      (subvariant) => subvariant.parentId === e.target.value
                    )
                  );
                  setSubVariants([]);
                }}
                name="variant"
                id="variant"
              >
                <option value="">Choose Variant</option>

                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name}
                  </option>
                ))}
              </select>
              {variant !== '' ? (
                <>
                  <label>Choose SubVariant</label>
                  <select
                    value={subVariant}
                    onChange={(e) => {
                      setSubVariant(e.target.value);
                      setSubVariants(
                        subVariants.includes(e.target.value)
                          ? [...subVariants]
                          : [...subVariants, e.target.value]
                      );
                    }}
                    name="sub-variant"
                    id="sub-variant"
                  >
                    <option value="">Choose SubVariant</option>
                    {subVariantOptions.map((subvariant) => (
                      <option key={subvariant.id} value={subvariant.name}>
                        {subvariant.name}
                      </option>
                    ))}
                  </select>
                  {subVariants.map((sv, index) => (
                    <span
                      className="p-1 border border-dark"
                      role="button"
                      onClick={() => {
                        setSubVariants(
                          subVariants.filter((subVariant) => subVariant !== sv)
                        );
                        setSubVariant('');
                      }}
                      key={index}
                    >
                      {sv}
                    </span>
                  ))}
                </>
              ) : null}
            </div>
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
