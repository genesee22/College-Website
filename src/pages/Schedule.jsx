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
  const [currDay, setCurrDay] = useState(weekDay === 7 ? 0 : weekDay);

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

  const [focusedSubject, setFocusedSubject] = useLocalStorage('focusedSubject', {});

  useEffect(() => {
    if (subjects.length > 0 && !Object.keys(focusedSubject).length)
      setFocusedSubject(subjects[0]);
  }, [subjects]);
  
  function showSubject(time, timeIndex, week, dayIndex) {
    const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const subject = subjects.find((subj) => 
      subj.week === week && 
      subj.day === days[dayIndex] && 
      subj.time === time);
    
    if (!subject) return '';
  
    const isFocused = focusedSubject === subject;
      
    return (
      <div
        key={subject.name}
        data-room={ subject.room === 'Online' ? 'online' : 'classroom' }
        className={ `${styles.subject} ${isFocused ? styles.subjectFocus : ''}` }
        style={ time !== '8:20' ? { transform: `translateY(calc(110px * ${timeIndex + 1}))` } : {} }
        onClick={ () => { setFocusedSubject(subject); } }
      >
        <div className={ styles.verticalLine }></div>
        <p className={ styles.subjName }>{ subject.name }</p>
        <p className={ styles.subjRoom }>{ subject.room }</p>
      </div>
    );
  }

  const [currWeek, setCurrWeek] = useState(1);
  const [tanslateWeek, setTanslateWeek] = useState('translateX(-60px)');
  
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
            {showSubject('8:20', 0, currWeek, currDay)}

            {['9:50', '11:30', '13:00', '14:40', '16:10', '17:50'].map((time, index) => (
              <>  
                <div className={styles.line}></div>
                <p className={styles.time}>{time}</p>
                {showSubject(time, index, currWeek, currDay)}
              </>
            ))}
            
            <div className={styles.line}></div>
          </div>
        </div>  

        <div>
          <div className={styles.weekToggle}>
            <p  
              className={currWeek === 1 ? styles.selectedWeek : ''} 
              onClick={() => {setCurrWeek(1); setTanslateWeek('translateX(-60px)')}}>
                1 Тиждень
            </p>
            <p  
              className={currWeek === 2 ? styles.selectedWeek : ''} 
              onClick={() => {setCurrWeek(2); setTanslateWeek('translateX(60px)')}}>
                2 Тиждень
            </p>
            <div className={styles.weekTogWrap} style={{transform: tanslateWeek}}></div>
          </div>  
          <div className={styles.subjInfo} >
            <h1>Опис</h1>
            <p><span>Предмет:</span> <br/> { focusedSubject.name }</p>
            <p><span>Формат:</span> <br/> { focusedSubject.format }</p>
            <p><span>Викладач:</span> <br/> { focusedSubject.teacher }</p>
            <p><span>Аудиторія:</span> <br/> { focusedSubject.room }</p>
          </div>  
        </div>
      </div>
    </> 
  ); 
};

export default Schedule;
