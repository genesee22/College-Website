import { useEffect, useState } from 'react';
import styles from '../pages/Schedule.module.css';
import useLocalStorage from 'use-local-storage';

const Schedule = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch('/public/subjects.json')
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Failed to fetch subjects:', error));
  }, []);

  const weekDay = new Date().getDay();
  const [currDay, setCurrDay] = useState(weekDay === 7 ? 0 : weekDay - 1);

  const [wrapStart, setWrapStart] = useState(-355);
  const [wrapStep, setWrapStep] = useState(142);
  const [wrapWidth, setWrapWidth] = useState(100);
  const [translateX, setTranslateX] = useState('');

  function updateDimensions() {
    if (window.innerWidth < 950) {
        setWrapStart(-160);
        setWrapStep(63.7);
        setWrapWidth(50);
    } else if (window.innerWidth < 1300) {
        setWrapStart(-227);
        setWrapStep(90.5);
        setWrapWidth(80);
    } else {
        setWrapStart(-355);
        setWrapStep(142);
        setWrapWidth(100);
    }
  }

  useEffect(() => {
    updateDimensions();

    setTranslateX(`translateX(calc(${wrapStart}px + ${wrapStep}px * ${currDay}))`);

    const handleResize = () => {
      updateDimensions();
      setTranslateX(`translateX(calc(${wrapStart}px + ${wrapStep}px * ${currDay}))`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currDay, wrapStart, wrapStep]);

  const [isOpen] = useLocalStorage('isSideBarOpen');
  return (
    <>
      <div className='header-img'>
        <img src="/public/header.png" alt="Header" />
        <img src="/public/header-logo.png" alt="Logo" />
      </div>

      <div className={`content ${isOpen ? '' : 'wider'}`}>
        <div className={styles.schedule}>
          <div className={styles.navigation}>
            {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map((day, index) => (
              <p 
                key={index}
                className={`${styles.days} ${currDay === index ? styles.selectedDay : ''}`}
                onClick={() => {
                  setCurrDay(index);
                  setTranslateX(`translateX(calc(${wrapStart}px + ${wrapStep}px * ${index}))`);
                }}
              >
                {day}
              </p>
            ))}
            <div className={styles.selectedWrapper} style={{ transform: translateX, width: `${wrapWidth}px` }}></div>
          </div>

          <div className={styles.navUnderLine}></div>

          <div className={styles.subjectsList}>
            <p className={styles.firstTime}>8:20</p>
            {subjects.find((subj) => subj.time === '8:20') === undefined ? null :
              <div className={styles.subject}></div>
            }
            {['9:50', '11:30', '13:00', '14:40', '16:10', '17:50'].map((time, index) => (
              <>  
                <div className={styles.line}></div>
                <p className={styles.time}>{time}</p>
                {subjects.find((subj) => subj.time === time) === undefined ? null :
                  <div 
                    className={styles.subject}
                    style={{transform: `translateY(calc(110px * ${index + 1}))`}}
                  >

                  </div>
                }
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
