import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Dropdown from './Dropdown';

test('Dropdown component', () => {
  const labelText = 'Test dropdown label';
  function onChangeMock() {
    return null;
  }

  const { getAllByTestId, getByLabelText } = render(
    <Dropdown
      errorText='Test error'
      id='test-dropdown'
      initialValue=''
      initialValid={false}
      label={labelText}
      onChange={onChangeMock}
      options={[
        {
          value: '',
          label: '-- Please select a value --',
        },
        {
          value: 'option-1',
          label: 'Option 1',
        },
        {
          value: 'option-2',
          label: 'Option 2',
        },
      ]}
      required={true}
      validators={[{ type: 'no-validation' }]}
    />
  );

  // The select element should be labeled by the value of the `label` prop
  const selectElement = getByLabelText(labelText);
  expect(selectElement).toBeInTheDocument();

  // The select element should be required since we pass true to `required` prop
  expect(selectElement).toBeRequired();

  // After firing a change event on the second option, its `selected` property
  // should be truthy while the others options should be falsy
  fireEvent.change(selectElement, {
    target: { value: 'option-1' },
  });
  const options = getAllByTestId('select-option');
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
});
