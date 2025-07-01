import { createContext, useState, useContext, type ReactNode } from 'react';

// 1. 定義 Context 的型別
interface SwitchContextType {
  on: boolean;
  toggle: () => void;
}

// 2. 建立 Context
// 我們提供一個初始值，但在實務上，這個值永遠不該被使用。
const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

// 3. 建立 Provider 組件
export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(prevOn => !prevOn);

  // 將狀態和方法透過 value prop 傳遞下去
  return (
    <SwitchContext.Provider value={{ on, toggle }}>
      {children}
    </SwitchContext.Provider>
  );
};

// 4. 建立自訂 Hook 以方便取用 Context
export const useSwitchContext = () => {
  const context = useContext(SwitchContext);
  // 這個檢查至關重要，它確保了子組件必須在 Provider 內部使用
  if (context === undefined) {
    throw new Error('useSwitchContext must be used within a SwitchProvider');
  }
  return context;
};