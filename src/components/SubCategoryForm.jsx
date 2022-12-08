import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';

const SubCategoryForm = () => {
  const dispatch = useDispatch();
  const subCategory = useRef('');
  const { categories } = useSelector((state) => state.apiData);

  useEffect(() => {
    dispatch(fetchData('categories'));
  }, []);

  const addSubCategory = (e) => {
    e.preventDefault();
    dispatch(addToDatabase('/subcategories', subCategory.current.value));
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
              <select name="category" id="category">
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
