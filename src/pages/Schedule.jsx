import { Link } from 'react-router-dom';
import styles from '../pages/Schedule.module.css';
import useLocalStorage from 'use-local-storage';
import { useEffect, useState } from 'react';

const Schedule = () => {
  const [subjects, setSubjects] = useState([]);

  const weekDay = new Date().getDay();
  const [currDay, setCurrDay] = useState(weekDay === 7 ? 0 : weekDay - 1);
  const [translateX, setTranslateX] = useState(`translateX(calc(-355px + 142px * ${currDay}))`);

  function changeCurrDay(index) {
    setCurrDay(index);
    setTranslateX(`translateX(calc(-355px + 142px * ${index}))`);
  }

  useEffect(() => {
    fetch('/public/subjects.json')
    .then(response => response.json())
    .then(data => setSubjects(data))
    .catch(error => console.error('Failed to fetch subjects:', error));
  }, []);

  const [isOpen] = useLocalStorage('isSideBarOpen');

  return (
    <>
      <div className={`header-img ${isOpen ? '' : 'wider'}`}>
        <img src="/public/header.png" alt="Header" />
        <img src="/public/header-logo.png" alt="Logo" />
      </div>
      
      <div className={`content ${isOpen ? '' : 'wider'}`}>
        <div className={styles.schedule}>
          <div className={styles.navigation}>
            {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map((day, index) => (
              <p 
                className={`${styles.days} ${currDay === index ? styles.selectedDay : ''}`}
                onClick={() => changeCurrDay(index)}
              >
                {day}
              </p>
            ))}
            <div className={styles.selectedWrapper} style={{ transform: translateX }}></div>
          </div>

          <div className={styles.navUnderLine}></div>
          <p className={styles.timeFirst}>8:20</p>

          <div className={styles.subjectList}>
            {['9.50', '11:30', '13:00', '14:40', '16:10', '17:50'].map((time, index) => (
              <>
                <div className={styles.line}></div>
                <p className={styles.time}>{time}</p>
              </>
            ))}
            <div className={styles.line}></div>
          </div>
        </div>  

        <div>
          <div className={styles.weekToggle}></div>  
          <div className={styles.subjInfo}></div>  
        </div>
      </div>
    </> 
  ); 
};

export default Schedule;
