import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';

const VariantForm = () => {
  const dispatch = useDispatch();
  const [variant, setVariant] = useState('');

  const { variants } = useSelector((state) => state.apiData);

  useEffect(() => {
    dispatch(fetchData('variants'));
  }, [variant]);

  const addVariant = (e) => {
    e.preventDefault();

    if (
      variants
        .map((eachVariant) => eachVariant.name.toLowerCase())
        .includes(variant.toLowerCase())
    ) {
      console.log('Already Exists');
    } else {
      dispatch(
        addToDatabase('/variants', {
          name:
            variant.charAt(0).toUpperCase() + variant.slice(1).toLowerCase(),
        })
      );
      setVariant('');
    }
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
            value={variant}
            onChange={(e) => {
              setVariant(e.target.value);
            }}
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
