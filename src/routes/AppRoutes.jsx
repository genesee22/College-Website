import { Routes, Route, Navigate } from 'react-router-dom';

import { useState } from 'react';
import useLocalStorage from 'use-local-storage';

import Sidebar from '../components/Sidebar';
import Schedule from '../pages/Schedule';
import Electives from '../pages/Electives'; 
import Settings from '../pages/Settings'; 

const AppRoutes = () => {
  const [isDark, setDark] = useLocalStorage('isDark', false);
  const [isOpen, setSideBar] = useLocalStorage('isSideBarOpen', true);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Sidebar 
        isDark={isDark}
        handleTheme={() => setDark(!isDark)}
        isOpen={isOpen}
        handleSize={() => {!setSideBar(!isOpen)}}
      />
      <div className={`container ${isOpen ? '' : 'wider'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" />} />
          
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/electives" element={<Electives />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<h1>Сторінку не знайдено</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
