import Tabs from '../components/Tab/Tabs';
import Tab from '../components/Tab/Tab';
import TabContent from '../components/Tab/TabContent';
import { useState } from 'react';
import clsx from 'clsx';
const TabPage = () => {
  const [tab, setTab] = useState<string | number>('person');
  const items = [
    {
      title: '個人資料',
      value: 'person',
    },
    {
      title: '帳號安全',
      value: 'secure',
    },
    {
      title: '通知',
      value: 'notice',
    },
  ];
  const onChangeValue = (value: string | number) => {
    setTab(value);
  };
  return (
    <div className="w-160 border rounded border-zinc-200 mx-auto">
      <Tabs value={tab} onChange={onChangeValue}>
        {items.map(({ title, value }) => (
          <Tab
            title={title}
            value={value}
            key={value}
            className={clsx(
              'border-b-2 p-3 hover:cursor-pointer hover:border-zinc-400',
              value === tab ? 'tabs-active' : 'tabs-base'
            )}
          ></Tab>
        ))}
      </Tabs>
      <div className="p-3">
        <TabContent value="person" currentValue={tab}>
          1123124124512
        </TabContent>
        <TabContent value="secure" currentValue={tab}>
          2
        </TabContent>
        <TabContent value="notice" currentValue={tab}>
          3
        </TabContent>
      </div>
    </div>
  );
};

export default TabPage;
