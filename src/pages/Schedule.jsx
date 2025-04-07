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

  const [currWeek, setCurrWeek] = useState(1);
  const [weekStep, setWeekStep] = useState(60);
  const [weekWidth, setWeekWidth] = useState('110px');
  const [weekTextGap, setWeekTextGap] = useState(19);
  const [translateWeek, setTranslateWeek] = useState('');

  function updateDimensions() {
    if (window.innerWidth < 950) {
        setDayMoveStart(-160);
        setDayMoveStep(63.7);
        setDayWidth(50);
        
        setWeekStep(45);
        setWeekWidth('90px');
        setWeekTextGap('10%');
      } else if (window.innerWidth < 1300) {
        setDayMoveStart(-227);
        setDayMoveStep(90.5);
        setDayWidth(80);

        setWeekStep(45);
        setWeekWidth('90px');
        setWeekTextGap('10%');
      } else {
        setDayMoveStart(-355);
        setDayMoveStep(142);
        setDayWidth(100);

        setWeekStep(60);
        setWeekWidth('110px');
        setWeekTextGap('19%');
    }
  }

  useEffect(() => {
    updateDimensions();
    setTranslateDay(`translateX(calc(${dayMoveStart}px + ${dayMoveStep}px * ${currDay}))`);
    setTranslateWeek(`translateX(${currWeek === 1 ? '-' : ''}${weekStep}px`);

    const handleResize = () => {
      updateDimensions();
      setTranslateDay(`translateX(calc(${dayMoveStart}px + ${dayMoveStep}px * ${currDay}))`);
      setTranslateWeek(`translateX(${currWeek === 1 ? '-' : ''}${weekStep}px`);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currDay, dayMoveStart, dayMoveStep, currWeek, weekStep]);

  const [focusedSubject, setFocusedSubject] = useLocalStorage('focusedSubject', {});

  useEffect(() => {
    const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const firstSubject = subjects.find(subj => 
      subj.week === currWeek &&
      subj.day === days[currDay]
    );
    
    if (firstSubject) {
      setFocusedSubject(firstSubject);
    }
  }, [subjects, currDay, currWeek]);
  
  const [subjToShow, setSubjToShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubjToShow(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [subjects, currDay, currWeek]);


  function showSubject(time, timeIndex) {
    const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const subject = subjects.find((subj) => 
      subj.week === currWeek && 
      subj.day === days[currDay] && 
      subj.time === time);
    
    if (!subject) return '';
  
    return (
      <div
        key={subject.name}
        data-room={ subject.room === 'Online' ? 'online' : 'classroom' }
        className={ 
          `${styles.subject} 
           ${subjToShow ? styles.subjectShown : ''} 
           ${focusedSubject === subject ? styles.subjectFocus : ''}` 
        }
        style={ time !== '8:20' ? { transform: `translateY(calc(110px * ${timeIndex + 1}))` } : {} }
        onClick={ () => { setFocusedSubject(subject); } }
      >
        <div className={ styles.verticalLine }></div>
        <p className={ styles.subjName }>{ subject.name }</p>
        <p className={ styles.subjRoom }>{ subject.room }</p>
      </div>
    );
  }
  
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
            {showSubject('8:20', 0)}

            {['9:50', '11:30', '13:00', '14:40', '16:10', '17:50'].map((time, index) => (
              <>  
                <div className={styles.line}></div>
                <p className={styles.time}>{time}</p>
                {showSubject(time, index)}
              </>
            ))}
            
            <div className={styles.line}></div>
          </div>
        </div>  

        <div>
          <div className={styles.weekToggle} style={{gap: weekTextGap}}>
            <p  
              className={currWeek === 1 ? styles.selectedWeek : ''} 
              onClick={() => {setCurrWeek(1); setTranslateWeek(`translateX(-${weekStep}px`)}}>
                1 Тиждень
            </p>
            <p  
              className={currWeek === 2 ? styles.selectedWeek : ''} 
              onClick={() => {setCurrWeek(2); setTranslateWeek(`translateX(${weekStep}px`)}}>
                2 Тиждень
            </p>
            <div className={styles.weekTogWrap} style={{transform: translateWeek, width: weekWidth}}></div>
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
