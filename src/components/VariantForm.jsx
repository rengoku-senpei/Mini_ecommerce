import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToDatabase } from '../actions';

const VariantForm = () => {
  const dispatch = useDispatch();
  const variant = useRef('');

  const addVariant = (e) => {
    e.preventDefault();
    dispatch(addToDatabase('/variants', variant.current.value));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          addVariant(e);
        }}
      >
        <div className="form-group">
          <label>Variant</label>
          <input
            className="form-control"
            ref={variant}
            placeholder="Enter Variant"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Add Variant
        </button>
      </form>
    </div>
  );
};

export default VariantForm;
