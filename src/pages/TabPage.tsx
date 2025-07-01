import Tab from '../components/Tab';
import { createContext, useState } from 'react';
export const TabContext = createContext('');

const TabPage = () => {
  const [tab, setTab] = useState('你好');
  const items = [
    {
      title: '個人資料',
      value: 'person'
    },
    {
      title: '帳號安全',
      value: 'secure'
    },
    {
      title: '通知',
      value: 'notice'
    }
  ]
  return(
    <>
      <TabContext.Provider value={tab}>
        <Tab items={items}>
          <div>123</div>      
        </Tab>
      </TabContext.Provider>
      <button onClick={() => setTab(value => value + '好')}>點我</button>
    </>
  )
}

export default TabPage;