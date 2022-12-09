import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';

const CategoryForm = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const { categories } = useSelector((state) => state.apiData);
  useEffect(() => {
    dispatch(fetchData('categories'));
  }, [category]);

  const addCategory = (e) => {
    e.preventDefault();

    if (
      categories
        .map((eachCategory) => eachCategory.name.toLowerCase())
        .includes(category.toLowerCase())
    ) {
      console.log('Already Exists');
    } else {
      dispatch(
        addToDatabase('/categories', {
          name:
            category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
        })
      );
      setCategory('');
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
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
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
