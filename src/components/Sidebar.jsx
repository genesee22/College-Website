import { Link } from 'react-router-dom';
import { useState } from 'react';

import '/src/index.css';
import styles from './Sidebar.module.css';

const Sidebar = ({isDark, handleTheme, isOpen, handleSize}) => {
    return (
      <nav className={`${styles.sidebar} ${isOpen ? '' : styles.close}`}>
        <header>

          <div className={styles.section}>
            <div className={styles.profileCircle}></div>
            <p className={styles.nameSurname}>Прізвище Ім'я</p>
            <div className={styles.sidebarToggle} onClick={handleSize}>
              <i className="material-symbols-outlined">first_page</i>
            </div>
          </div>

          <div className={styles.section}>
            <Link to="/settings" className={styles.settingsLink}>
              <button className={styles.settings}>
                <span>Налаштування</span>
                <i className="material-symbols-outlined">{isOpen ? '' : 'settings'}</i>  
              </button>
            </Link>
            <div className={styles.toggleWrapper}>
              <input
                type="checkbox"
                id="check"
                className={styles.themeToggle} 
                checked={isDark}
                onChange={handleTheme}
              />
              <label htmlFor="check">
                <i className="material-symbols-outlined">{isDark ? 'dark_mode' : 'light_mode'}</i>
              </label>
            </div>
          </div>

        </header>

        <div className={styles.line}></div>

        <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/schedule" className={styles.link}>
                <i className="material-symbols-outlined">calendar_today</i>
              </Link>
              <Link to="/schedule" className={styles.link}>
                <p>Розклад</p>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/electives" className={styles.link}>
                <i className="material-symbols-outlined">check_box</i>
              </Link>
              <Link to="/electives" className={styles.link}>
                <p>Вибіркові дисципліни</p>
              </Link>
            </li>
          <li className={styles.navItem}>
            <Link to="/electives" className={styles.link}>
              <i className="material-symbols-outlined">logout</i>
            </Link>
            <Link to="/electives" className={styles.link}>
              <p>Вийти</p>
            </Link>
          </li>
        </ul>
      </nav>
    );
}; 
  
export default Sidebar;
