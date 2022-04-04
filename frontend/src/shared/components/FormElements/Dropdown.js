import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import { validate } from '../../util/validators';
import './Dropdown.css';

const dropdownReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

function Dropdown({
  errorText,
  id,
  initialValue,
  initialValid,
  label,
  onChange,
  options,
  validators,
}) {
  const [inputState, dispatch] = useReducer(dropdownReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValid || false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onChange(id, value, isValid);
  }, [id, value, isValid, onChange]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  return (
    <div
      className={`dropdown ${
        !inputState.isValid && inputState.isTouched && 'dropdown--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <select name={id} id={id} onBlur={touchHandler} onChange={changeHandler}>
        {options.map((option) => (
          <option
            key={`dropdown-${id}-option-${option.value}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
}

Dropdown.propTypes = {
  errorText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  initialValid: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  validators: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string }))
    .isRequired,
};

export default Dropdown;
