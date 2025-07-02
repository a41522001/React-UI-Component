import { useTabsContext } from './Tabs';

interface Props {
  title: string | number;
  value: string | number;
  className: string;
}
const Tab = ({ title, value: tabValue, className }: Props) => {
  const { onChange } = useTabsContext();
  return (
    <li className={className} key={tabValue} onClick={() => onChange(tabValue)}>
      {title}
    </li>
  );
};

export default Tab;
