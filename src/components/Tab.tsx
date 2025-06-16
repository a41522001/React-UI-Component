import { useState } from 'react';
import clsx from 'clsx';
interface Item {
  title: string | number;
  value: string | number;
}
interface Props {
  items: Item[];
  value?: string | number;
  children: React.ReactNode;
}

const Tab = ({ items, value = '' }: Props) => {
  const containerClassName = 'border border-zinc-200 rounded-lg shadow-lg';
  const tabUlClassName = 'flex px-3 border-b border-zinc-300';
  const tabLiClassName = 'border-b-2 p-3 hover:cursor-pointer hover:border-zinc-400';
  const tabLiBaseName = 'border-transparent text-zinc-400';
  const tabLiActiveClassName = 'border-sky-500 text-sky-500 font-semibold';
  const [currentTab, setCurrentTab] = useState<string | number>(() => {
    const isValueExist = items.find(item => item.value === value);
    return isValueExist?.value ?? items[0].value;
  });
  const handleClickTab = (value: number | string): void => {
    if(value === currentTab) return;
    setCurrentTab(value);
  } 
  return (
    <>
    <p>{currentTab}</p>
      <div className={containerClassName}>
        <ul className={tabUlClassName}>
          {items.map(({title, value}, index) => {
            return(
              <li
                className={clsx(
                  tabLiClassName,
                  value === currentTab ? tabLiActiveClassName : tabLiBaseName
                )}
                key={value}
                onClick={() => handleClickTab(value)} 
              >
                {title}
              </li>
            )
          })}
        </ul>
        <div className='p-5'></div>
      </div>
    </>
  )
}

export default Tab;
