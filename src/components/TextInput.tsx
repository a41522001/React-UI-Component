import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
type Rule = (value: string) => string | boolean;
type Type = 'text' | 'password' | 'email';
interface Props {
  value: string;
  type: Type;
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  wrapClassName?: string;
  errorTextClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  rules?: Rule[];
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    label,
    value,
    id,
    name,
    className = '',
    onChange,
    rules,
    type,
    wrapClassName = '',
    placeholder = '',
    disabled = false,
    maxLength,
    errorTextClassName,
    labelClassName = '',
    autoComplete = '',
  } = props;
  const textInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => textInputRef.current!);
  const [errorText, setErrorText] = useState<string[]>([]);
  const isError = errorText.length > 0;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validate(e.target.value);
  };

  const validate = (value: string) => {
    if (rules) {
      const errorTextArr = [];
      for (const item of rules) {
        errorTextArr.push(item(value));
      }
      setErrorText(errorTextArr.filter((item) => typeof item === 'string'));
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${wrapClassName}`}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border rounded px-1 ${className}`}
        name={name}
        type={type}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        ref={textInputRef}
        autoComplete={autoComplete}
      />
      {isError &&
        errorText.map((item, index) => {
          return (
            <span className={errorTextClassName ?? 'b-validate-error'} key={index}>
              {item}
            </span>
          );
        })}
    </div>
  );
});

export default Input;
