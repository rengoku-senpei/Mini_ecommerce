import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';

const CategoryForm = () => {
  const dispatch = useDispatch();
  const category = useRef('');
  const { categories } = useSelector((state) => state.apiData);
  console.log(categories);

  useEffect(() => {
    dispatch(fetchData('categories'));
  }, []);

  const addCategory = (e) => {
    e.preventDefault();
    const inputValue = category.current.value;

    if (
      categories
        .map((eachCategory) => eachCategory.category.toLowerCase())
        .includes(inputValue.toLowerCase())
    ) {
      console.log('Already Exists');
    } else {
      dispatch(
        addToDatabase('/categories', {
          category:
            inputValue.charAt(0).toUpperCase() +
            inputValue.slice(1).toLowerCase(),
        })
      );
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          addCategory(e);
        }}
      >
        <div className="form-group">
          <label>Category</label>
          <input
            className="form-control"
            ref={category}
            placeholder="Enter category"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
