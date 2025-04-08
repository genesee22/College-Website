import styles from './styles/Subject.module.css';
import { useState, useEffect } from 'react';

const Subject = ({subjects, currDay, currWeek, time, timeIndex, focusedSubject, setFocusedSubject}) => {
    const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    useEffect(() => {
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
};

export default Subject;