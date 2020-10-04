import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';

import Input from '../../components/Input';

jest.mock('@unform/core', () => ({
  useField: () => ({
    fieldName: 'test',
    defaultValue: '',
    error: undefined,
    registerField: jest.fn(),
  }),
}));

describe('Input component', () => {
  it('should be able to render an input', () => {
    const component = render(<Input name="test" placeholder="Test" />);

    const inputElement = component.getByPlaceholderText('Test');

    expect(inputElement).toBeTruthy();
  });

  it('should highlight the input on focus', async () => {
    const component = render(<Input name="test" placeholder="Test" />);

    const inputElement = component.getByPlaceholderText('Test');
    const containerElement = component.getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyleRule('color', '#ff9000');
      expect(containerElement).toHaveStyleRule('border', '2px solid #ff9000');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyleRule('color', '#ff9000');
      expect(containerElement).not.toHaveStyleRule(
        'border',
        '2px solid #ff9000',
      );
    });
  });

  it('should keep the border highlighted if the input is filled', async () => {
    const component = render(<Input name="test" placeholder="Test" />);

    const inputElement = component.getByPlaceholderText('Test');
    const containerElement = component.getByTestId('input-container');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyleRule('color', '#ff9000');
      expect(containerElement).not.toHaveStyleRule(
        'border',
        '2px solid #ff9000',
      );
    });
  });
});
