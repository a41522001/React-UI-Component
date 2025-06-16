import { useState, useRef, useEffect } from "react";
import clsx from 'clsx';
type Size = 'xl' | 'l' | 's';
interface Item {
  title: string | number;
  value: string | number;
}
interface Props {
  items: Item[];          // 資料的標題和值
  label?: string;         // input的label
  density?: Size;         // 選擇框高度/密度
  value: string | number; // 當前選擇的值
  placeholder?: string;   // 佔位符
  disabled?: boolean;     // 啟動禁用
  name?: string;          // 配合父組件的form標籤
  onChange: (newValue: number | string) => void; // 更改當前選擇值的方法
}
const Select = (
  { 
    items, 
    value: selectValue, 
    onChange,
    label = '', 
    density = 'l',
    placeholder = '請選擇',
    disabled = false,
    name = ''
  }: Props) => {
  // style

  const btnBaseClassName = 'w-full py-2 ps-2 text-start rounded-sm'
  const btnActiveClassName = 'border-zinc-400 border cursor-pointer active:border-2';
  const btnDisabledClassName = 'border border-slate-200 cursor-not-allowed';
  const selectClassName = 'border border-zinc-400 mt-1 z-40 rounded shadow-xl absolute w-full bg-white max-h-[250px] overflow-y-auto';
  const optionClassName = 'py-2 ps-2 transition-all';
  const optionActiveClassName = 'bg-zinc-100';
  const optionHoverClassName = 'hover:bg-zinc-100 hover:cursor-pointer';
  const heightMapping = {
    xl: 'h-[50px]',
    l: 'h-[40px]',
    s: "h-[30px]"
  }
  // state
  const currentTitle = items.find(item => item.value === selectValue)?.title ?? placeholder;
  const [clickListFlag, setClickListFlag] = useState<boolean>(false);
  const selectContainerRef = useRef<HTMLDivElement | null>(null);
  // method
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!clickListFlag) return;
      if(!selectContainerRef.current!.contains(e.target as Node)) {
        setClickListFlag(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [clickListFlag])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        setClickListFlag(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  const handleSelect = (item: Item): void => {
    const { value } = item;
    onChange(value);
    setClickListFlag(false);
  }

  const handleSetClickListFlag = (): void => {
    if(disabled) return;
    setClickListFlag((prevValue) => (!prevValue));
  }

  return (
    <>
      <div
        className={`relative`}
        ref={selectContainerRef}
      >
        {label && (
          <div
            className="hover:cursor-pointer mb-1"
            onClick={handleSetClickListFlag}
          >
            {label}
          </div>
        )}
        <select 
          className="hidden" 
          name={name} 
          value={selectValue}
          onChange={() => {}}
        >
          {items.map(({title, value}, index) => {
            return (
              <option value={value} key={index}>{title}</option>
            )
          })}
        </select>
        <button 
          className={clsx(
            'b-select-btn',
            disabled ? btnDisabledClassName : btnActiveClassName, 
            heightMapping[density],
            {
              'border-2': currentTitle,
              'text-zinc-500': currentTitle === placeholder,
            }
          )}
          onClick={() => handleSetClickListFlag()}
        >
          {currentTitle}
        </button>
        <ul
          className={clsx(
            selectClassName,
            {
              'hidden': !clickListFlag
            }
          )}
        >
          {items.map(({title, value}, index) => {
            return (
              <li 
                key={index}
                onClick={() => handleSelect({ title, value })}
                className={clsx(
                  optionClassName,
                  optionHoverClassName,
                  value === selectValue ? optionActiveClassName : '',
                  {
                    'rounded-t': index === 0,
                    'rounded-b': index + 1 === items.length
                  }
                )}
              >
                {title}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
export default Select;