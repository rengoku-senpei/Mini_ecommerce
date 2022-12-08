import React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToDatabase } from '../actions';

const CategoryForm = () => {
  const dispatch = useDispatch();
  const category = useRef('');

  const addCategory = (e) => {
    e.preventDefault();
    dispatch(
      addToDatabase('/categories', { category: category.current.value })
    );
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
