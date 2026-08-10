'use client';

import { useEffect, useRef, useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from '@/components/ui/input-group';

type CurrencyInputProps = {
  value?: number;
  onChange: (value: number | undefined) => void;
  onBlur?: () => void;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
  'aria-invalid'?: boolean;
};

export function CurrencyInput({
  value,
  onChange,
  onBlur,
  name,
  ref,
  'aria-invalid': ariaInvalid,
}: CurrencyInputProps) {
  const [inputValue, setInputValue] = useState(value === undefined ? '' : value.toString());

  const isFocused = useRef(false);

  // Only synchronize from RHF when the input isn't being edited.
  useEffect(() => {
    if (!isFocused.current) {
      setInputValue(
        value === undefined
          ? ''
          : value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
      );
    }
  }, [value]);

  function handleChange(nextValue: string) {
    // Allow the user to completely clear the input.
    if (nextValue === '') {
      setInputValue('');
      onChange();
      return;
    }

    // Only allow digits and a decimal point.
    let cleaned = '';

    let hasDecimal = false;
    let decimalPlaces = 0;

    for (const character of nextValue) {
      if (character >= '0' && character <= '9') {
        if (hasDecimal) {
          if (decimalPlaces >= 2) {
            continue;
          }

          decimalPlaces += 1;
        }

        cleaned += character;
        continue;
      }

      if (character === '.' && !hasDecimal) {
        hasDecimal = true;
        cleaned += character;
      }
    }

    setInputValue(cleaned);

    const numericValue = Number(cleaned);

    if (!Number.isNaN(numericValue)) {
      onChange(numericValue);
    }
  }

  function handleFocus() {
    isFocused.current = true;

    // Remove formatting when editing.
    if (value !== undefined) {
      setInputValue(value.toString());
    }
  }

  function handleBlur() {
    isFocused.current = false;

    if (inputValue === '') {
      onChange();
      onBlur?.();
      return;
    }

    const numericValue = Number(inputValue);

    if (Number.isNaN(numericValue)) {
      onChange();
      setInputValue('');
      onBlur?.();
      return;
    }

    const roundedValue = Number(numericValue.toFixed(2));

    onChange(roundedValue);

    setInputValue(
      roundedValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );

    onBlur?.();
  }

  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>

      <InputGroupInput
        ref={ref}
        name={name}
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={ariaInvalid}
      />
    </InputGroup>
  );
}
