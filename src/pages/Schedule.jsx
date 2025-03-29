import { Link } from 'react-router-dom';
import styles from '../pages/Schedule.module.css';
import useLocalStorage from 'use-local-storage';
import { useState } from 'react';

const Schedule = () => {
  const [isOpen] = useLocalStorage('isSideBarOpen');

  let days = [
    { name: 'ПН', current: false, weekNum: 1},
    { name: 'ВТ', current: false, weekNum: 1},
    { name: 'СР', current: false, weekNum: 1},
    { name: 'ЧТ', current: false, weekNum: 1},
    { name: 'ПТ', current: false, weekNum: 1},
    { name: 'СБ', current: false, weekNum: 1},
  ]
  const weekDay = new Date().getDay();
  const [currDay, setCurrDay] = weekDay == 7 ? useState(0) : useState(weekDay - 1);
  
  const [translateX, setTranslateX] = useState(`translateX(calc(-345% + 138% * ${currDay}))`);

  function changeCurrDay(index) {
    days.map((day, i) => {
      day.current = false;
      if (i === index) {
        setCurrDay(index);
        setTranslateX(`translateX(calc(-345% + 138% * ${index}))`);
      }
    });
  }
  
  return (
    <>
      <div className={`header-img ${isOpen ? '' : 'wider'}`}>
        <img src="/public/header.png"/>
        <img src="/public/header-logo.png"/>
      </div>
      <div className={`content ${isOpen ? '' : 'wider'}`}>
        <div className={styles.schedule}>
        <div className={styles.navigation}>
          {days.map((day, index) => (
            <p
              className={currDay === index ? styles.selected_p : ''} 
              onClick={() => changeCurrDay(index)}
            >
              {day.name}
            </p>
          ))}
          <div className={styles.selected} style={{transform: translateX}}></div>
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