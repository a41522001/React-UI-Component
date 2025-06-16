import { useState } from 'react';
import Accordion from '../components/Accordion';
const AccordionPage = () => {
  const items = [
    {
      title: '第一項',
      content: '第一項內容'
    },
    {
      title: '第二項',
      content: '第二項內容'
    },
    {
      title: '第三項',
      content: '第三項內容'
    }
  ];
  return(
    <>
      <div className={'w-full max-w-xs'}>
        <Accordion items={items}/>
      </div>
      <div className={'w-full max-w-xs mt-5'}>
        <Accordion items={items} multiple showCloseBtn showOpenBtn/>
      </div>
    </>
  )
}

export default AccordionPage;