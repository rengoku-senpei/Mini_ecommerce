import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDatabase } from '../actions';
import { fetchData } from '../slice/apiFetchSlice';

const SubVariantForm = () => {
  const [variant, setVariant] = useState('');
  const dispatch = useDispatch();
  const subVariant = useRef('');
  const { variants, subvariants } = useSelector((state) => state.apiData);

  useEffect(() => {
    dispatch(fetchData('variants'));
    dispatch(fetchData('subvariants'));
  }, [variant]);

  const addSubVariant = (e) => {
    e.preventDefault();
    const inputValue = subVariant.current.value;

    if (
      subvariants
        .map((eachSubVariant) => eachSubVariant.name.toLowerCase())
        .includes(inputValue.toLowerCase()) ||
      inputValue === '' ||
      variant === ''
    ) {
      if (inputValue === '' || variant === '') {
        console.log('Required');
        return;
      }
      console.log('Already Exists');
    } else {
      dispatch(
        addToDatabase('/subvariants', {
          name:
            inputValue.charAt(0).toUpperCase() +
            inputValue.slice(1).toLowerCase(),
          parentId: variant,
        })
      );
      subVariant.current.value = '';
      setVariant('');
    }
  };

  return variants ? (
    variants.length > 0 ? (
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
          <div className="form-group">
            <label>Choose Variant</label>
            <select
              value={variant}
              onChange={(e) => {
                setVariant(e.target.value);
              }}
              name="sub-variant"
              id="sub-category"
            >
              <option value="">Choose Variant</option>
              {variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-dark">
            Add SubVariant
          </button>
        </form>
      </div>
    ) : null
  ) : null;
};

export default SubVariantForm;
