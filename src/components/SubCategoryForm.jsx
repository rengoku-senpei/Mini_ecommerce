import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';

const SubCategoryForm = () => {
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const subCategory = useRef('');
  const { categories, subcategories } = useSelector((state) => state.apiData);

  useEffect(() => {
    dispatch(fetchData('categories'));
    dispatch(fetchData('subcategories'));
  }, []);

  const addSubCategory = (e) => {
    e.preventDefault();
    const inputValue = subCategory.current.value;
    if (
      subcategories
        .map((eachSubCategory) => eachSubCategory.name.toLowerCase())
        .includes(inputValue.toLowerCase()) ||
      inputValue === '' ||
      category === ''
    ) {
      if (inputValue === '' || category === '') {
        console.log('Required');
        return;
      }
      console.log('Already Exists');
    } else {
      dispatch(
        addToDatabase('/subcategories', {
          name:
            inputValue.charAt(0).toUpperCase() +
            inputValue.slice(1).toLowerCase(),
          parentId: category,
        })
      );
      subCategory.current.value = '';
      setCategory('');
    }
  };

  return (
    <div>
      {categories ? (
        categories.length > 0 ? (
          <form
            onSubmit={(e) => {
              addSubCategory(e);
            }}
          >
            <div className="form-group">
              <label>SubCategory</label>
              <input
                className="form-control"
                ref={subCategory}
                placeholder="Enter SubCategory"
              />
            </div>
            <div className="form-group">
              <label>Choose Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                name="category"
                id="category"
              >
                <option value="">Choose Catagory</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-dark">
              Add SubCategory
            </button>
          </form>
        ) : (
          <h1>No Categories To Add SubCategories</h1>
        )
      ) : null}
    </div>
  );
};

export default SubCategoryForm;
