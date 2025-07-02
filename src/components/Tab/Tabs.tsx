import { createContext, useContext } from 'react';

interface TabContextType {
  currentTab: string | number;
  onChange: (value: string | number) => void;
}
interface Props {
  value: string | number;
  children: React.ReactNode;
  onChange: (value: string | number) => void;
  wrapClassName?: string;
  tabsClassName?: string;
}
export const TabContext = createContext<TabContextType | null>(null);
export const useTabsContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('組件包裝錯誤');
  }
  return context;
};
const Tabs = ({ value, onChange, children, wrapClassName = '', tabsClassName = '' }: Props) => {
  const property = {
    onChange: onChange,
    currentTab: value,
  };

  return (
    <TabContext.Provider value={property}>
      <div className={`border-zinc-200 rounded-lg ${wrapClassName}`}>
        <ul className={`flex border-b border-zinc-300 ${tabsClassName}`}>{children}</ul>
      </div>
    </TabContext.Provider>
  );
};

export default Tabs;
