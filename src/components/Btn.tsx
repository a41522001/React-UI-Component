import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type React from 'react';
interface Props {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}
const Btn = ({ children, onClick = () => {}, className = '', disabled = false }: Props) => {
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const btnClasses = twMerge(clsx('btn', disabledClasses, className));
  return (
    <button className={btnClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Btn;
