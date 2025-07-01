import { useLocation, Routes, Route, Link } from 'react-router-dom';
import clsx from 'clsx';
import SelectPage from './pages/SelectPage';
import HomePage from './pages/HomePage';
import AccordionPage from './pages/AccordionPage';
import TabPage from './pages/TabPage';
import SwitchPage from './pages/SwitchPage';
import DialogPage from './pages/DialogPage';
import TextInputPage from './pages/TextInputPage';
import { useState, useEffect } from 'react';
function App() {
  const location = useLocation();
  const afterClassName = `after:content-[''] after:bg-white after:h-[2px] 
    after:w-full after:absolute after:bottom-0 after:left-0 after:transition-transform 
    after:duration-300 after:ease-out`;
  const navList = [
    {
      id: 1,
      title: '首頁',
      link: '/',
    },
    {
      id: 2,
      title: 'Accordion',
      link: '/accordion',
    },
    {
      id: 3,
      title: 'Select',
      link: '/select',
    },
    {
      id: 4,
      title: 'Tab',
      link: '/tab',
    },
    {
      id: 5,
      title: 'Switch',
      link: '/switch',
    },
    {
      id: 6,
      title: 'Dialog',
      link: '/dialog',
    },
    {
      id: 7,
      title: 'TextInputPage',
      link: '/textInputPage',
    },
  ];
  const [currentPageId, setCurrentPageId] = useState<number>(0);
  useEffect(() => {
    const { pathname } = location;
    const currentPage = navList.find((item) => item.link === pathname);
    if (currentPage) {
      setCurrentPageId(currentPage.id);
    } else {
      setCurrentPageId(0);
    }
  }, [location.pathname]);
  return (
    <>
      <header className="flex p-5 bg-sky-500 text-white">
        <h1 className="me-20">React UI Component</h1>
        <nav>
          <ul className="flex gap-5">
            {navList.map(({ id, title, link }) => {
              return (
                <li key={id}>
                  <Link
                    className={clsx('relative', 'pb-[6px]', id === currentPageId && afterClassName)}
                    to={link}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <div className="main_container py-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/accordion" element={<AccordionPage />} />
            <Route path="/select" element={<SelectPage />} />
            <Route path="/tab" element={<TabPage />} />
            <Route path="/switch" element={<SwitchPage />} />
            <Route path="/dialog" element={<DialogPage />} />
            <Route path="/textInputPage" element={<TextInputPage />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
