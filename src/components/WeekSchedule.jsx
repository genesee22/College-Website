import Subject from './Subject.jsx'

import styles from './styles/WeekSchedule.module.css';
import { useState, useEffect } from 'react';

const WeekSchedule = ({subjects, currDay, setCurrDay, currWeek, focusedSubject, setFocusedSubject}) => {
  const [dayMoveStart, setDayMoveStart] = useState(-355);
  const [dayMoveStep, setDayMoveStep] = useState(142);
  const [dayWidth, setDayWidth] = useState(100);
  const [translateDay, setTranslateDay] = useState('');

  function updateDimensions() {
    if (window.innerWidth < 950) {
        setDayMoveStart(-160);
        setDayMoveStep(63.7);
        setDayWidth(50);
      } else if (window.innerWidth < 1300) {
        setDayMoveStart(-227);
        setDayMoveStep(90.5);
        setDayWidth(80);
      } else {
        setDayMoveStart(-355);
        setDayMoveStep(142);
        setDayWidth(100);
    }
  }

  useEffect(() => {
    updateDimensions();
    setTranslateDay(`translateX(calc(${dayMoveStart}px + ${dayMoveStep}px * ${currDay}))`);

    const handleResize = () => {
      updateDimensions();
      setTranslateDay(`translateX(calc(${dayMoveStart}px + ${dayMoveStep}px * ${currDay}))`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currDay, dayMoveStart, dayMoveStep]);

  return (
    <div className={styles.schedule}>
      <div className={styles.navigation}>
        {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map((day, index) => (
          <p 
            key={index}
            className={`${styles.days} ${currDay === index ? styles.selectedDay : ''}`}
            onClick={() => {
              setCurrDay(index);
              setTranslateDay(`translateX(calc(${dayMoveStart}px + ${dayMoveStep}px * ${index}))`);
            }}
          >
            {day}
          </p>
        ))}
        <div className={styles.selectedWrapper} style={{ transform: translateDay, width: `${dayWidth}px` }}></div>
      </div>

      <div className={styles.navUnderLine}></div>

      <div className={styles.subjectsList}>
        <p className={styles.firstTime}>8:20</p>
        {<Subject 
          subjects={subjects}
          currDay={currDay}
          currWeek={currWeek}
          time={'8:20'}
          timeIndex={0}
          focusedSubject={focusedSubject}
          setFocusedSubject={setFocusedSubject}
        />}
        {['9:50', '11:30', '13:00', '14:40', '16:10', '17:50'].map((time, index) => (
          <>  
            <div className={styles.line}></div>
            <p className={styles.time}>{time}</p>
            {<Subject 
              subjects={subjects}
              currDay={currDay}
              currWeek={currWeek}
              time={time}
              timeIndex={index}
              focusedSubject={focusedSubject}
              setFocusedSubject={setFocusedSubject}
            />}
          </>
        ))}
        
        <div className={styles.line}></div>
      </div>
    </div>  
  );
};

export default WeekSchedule;