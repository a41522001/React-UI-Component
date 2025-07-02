interface Props {
  value: string | number;
  currentValue: string | number;
  children: React.ReactNode;
}
const TabContent = ({ value, children, currentValue }: Props) => {
  return <>{value === currentValue && children}</>;
};
export default TabContent;
