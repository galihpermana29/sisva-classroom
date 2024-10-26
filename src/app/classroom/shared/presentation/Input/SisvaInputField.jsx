import { SearchLg } from '@untitled-ui/icons-react';
import { Input, InputNumber, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const SisvaInput = forwardRef(function SisvaInput(
  {
    customSize,
    shadow,
    customClassName,
    value,
    onChange,
    placeholder,
    disabled,
    readOnly,
  },
  ref
) {
  let customClass = '';
  if (customSize === 'sm') {
    customClass = 'h-[40px]';
  } else if (customSize === 'md') {
    customClass = 'h-[44px]';
  } else if (customSize === 'xl') {
    customClass = 'h-[60px]';
  }

  return (
    <Input
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      className={clsx(
        'border border-[#D0D5DD] rounded-[8px]',
        customClass,
        shadow ? 'shadow-[0_1px_2px_0px_rgb(16,24,40,0.05)]' : '',
        customClassName
      )}
    />
  );
});

export const SisvaInputPassword = forwardRef(function SisvaInputPassword(
  {
    customSize,
    shadow,
    customClassName,
    value,
    onChange,
    placeholder,
    disabled,
    readOnly,
  },
  ref
) {
  let customClass = '';
  if (customSize === 'sm') {
    customClass = 'h-[40px]';
  } else if (customSize === 'md') {
    customClass = 'h-[44px]';
  } else if (customSize === 'xl') {
    customClass = 'h-[60px]';
  }

  return (
    <Input.Password
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      className={clsx(
        'border border-[#D0D5DD] rounded-[8px]',
        customClass,
        shadow ? 'shadow-[0_1px_2px_0px_rgb(16,24,40,0.05)]' : '',
        customClassName
      )}
    />
  );
});

export function SisvaInputSearch({
  customSize,
  shadow,
  customClassName,
  loading,
  value,
  onChange,
  placeholder,
  onSearch,
  disabled,
  fullRounded = true,
}) {
  let customClass = '';
  if (customSize === 'sm') {
    customClass = 'h-[40px]';
  } else if (customSize === 'md') {
    customClass = 'h-[44px]';
  } else if (customSize === 'xl') {
    customClass = 'h-[60px]';
  }

  const iconSize = {
    sm: 20,
    md: 22,
    xl: 24,
  };

  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onPressEnter={onSearch}
      disabled={disabled}
      suffix={
        loading ? (
          <Spin size="small" />
        ) : (
          <SearchLg
            width={iconSize[customSize] || 20}
            height={iconSize[customSize] || 20}
            color="#98A2B3"
          />
        )
      }
      className={clsx(
        'w-full sm:w-[320px] border-[#D0D5DD] border',
        customClass,
        shadow ? 'shadow-[0_1px_2px_0px_rgb(16,24,40,0.05)]' : 'shadow-none',
        fullRounded ? 'rounded-full' : 'rounded-[8px]',
        customClassName
      )}
    />
  );
}

export function SisvaTextArea({
  customSize,
  shadow,
  customClassName,
  value,
  onChange,
  placeholder,
  rows,
  maxLength,
  disabled,
  readOnly,
}) {
  let customClass = '';
  if (customSize === 'sm') {
    customClass = 'h-[40px]';
  } else if (customSize === 'md') {
    customClass = 'h-[44px]';
  } else if (customSize === 'xl') {
    customClass = 'h-[60px]';
  }

  return (
    <TextArea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      disabled={disabled}
      readOnly={readOnly}
      className={clsx(
        'rounded-[8px] border border-[#D0D5DD]',
        customClass,
        shadow ? 'shadow-[0_1px_2px_0px_rgb(16,24,40,0.05)]' : '',
        customClassName
      )}
    />
  );
}

export function SisvaInputNumber({
  customSize = 'sm',
  shadow = false,
  customClassName,
  value,
  onChange,
  min,
  max,
  step,
  disabled,
  readOnly,
}) {
  let customClass = '';
  if (customSize === 'sm') {
    customClass = 'h-[40px] height-sm';
  } else if (customSize === 'md') {
    customClass = 'h-[44px] height-md';
  } else if (customSize === 'xl') {
    customClass = 'h-[60px] height-xl';
  }

  return (
    <InputNumber
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      readOnly={readOnly}
      className={clsx(
        '!rounded-[8px] border-border-primary',
        customClass,
        shadow ? 'shadow-[0_1px_2px_0px_rgb(16,24,40,0.05)]' : '',
        customClassName,
        'custom-input-number-osx'
      )}
    />
  );
}
