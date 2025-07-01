import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
type Rule = (value: string) => string | boolean;
type Type = 'text' | 'password' | 'email';
interface Props {
  label?: string;
  id?: string;
  value: string;
  name?: string;
  className?: string;
  type: Type;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: Rule[];
  wrapClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  errorTextClass?: string;
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
    errorTextClass,
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
      {label && <label htmlFor={id}>{label}</label>}
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
      />
      {isError &&
        errorText.map((item, index) => {
          return (
            <span className={errorTextClass ?? 'validate_error'} key={index}>
              {item}
            </span>
          );
        })}
    </div>
  );
});

export default Input;
