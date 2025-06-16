import Tab from '../components/Tab';
const TabPage = () => {
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
      <Tab items={items}>
        <div>123</div>      
      </Tab>
    </>
  )
}

export default TabPage;