import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToDatabase } from '../actions';

const SubVariantForm = () => {
  const dispatch = useDispatch();
  const subVariant = useRef('');

  const addSubVariant = (e) => {
    e.preventDefault();
    dispatch(addToDatabase('/subvariants', subVariant.current.value));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          addSubVariant(e);
        }}
      >
        <div className="form-group">
          <label>SubVariant</label>
          <input
            className="form-control"
            ref={subVariant}
            placeholder="Enter SubVariant"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Add SubVariant
        </button>
      </form>
    </div>
  );
};

export default SubVariantForm;
