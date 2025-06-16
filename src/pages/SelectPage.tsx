import { useState } from 'react';
import Select from '../components/Select';
const SelectPage = () => {
  const items = [
    {
      title: '第一班',
      value: '1'
    },
    {
      title: '第二班',
      value: '2'
    },
    {
      title: '第三班',
      value: '3'
    },
    {
      title: '第四班',
      value: '4'
    },
    {
      title: '第五班',
      value: '5'
    },
    {
      title: '第六班',
      value: '6'
    },
    {
      title: '第七班',
      value: '7'
    },
    {
      title: '第八班',
      value: '8'
    },
    {
      title: '第九班',
      value: '9'
    }
  ]
  const items1 = [
    {
      title: '王同學',
      value: 'W'
    },
    {
      title: '林同學',
      value: 'L'
    },
    {
      title: '許同學',
      value: 'H'
    }
  ]
  const [selectValue, setSelectValue] = useState<string | number>('');
  const onChange = (newValue: number | string): void => {
    setSelectValue(newValue);
  }
  const [selectValue1, setSelectValue1] = useState<string | number>('');
  const onChange1 = (newValue: number | string): void => {
    setSelectValue1(newValue);
  }
  return (
    <>
      <p>這是父組件拿到的值{selectValue}</p>
      <div className={`w-full max-w-[150px] m-5`}>
        <Select 
          items={items} 
          label='班級' 
          value={selectValue} 
          onChange={onChange}
        />
      </div>
      <p>這是父組件拿到的值{selectValue1}</p>
      <div className={`w-full max-w-[150px] m-5`}>
        <Select 
          items={items1} 
          label='學生' 
          value={'selectValue1'} 
          onChange={onChange1}
          disabled
        />
      </div>
    </>
  )
}

export default SelectPage;