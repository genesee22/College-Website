import Header from '../components/Header'
import WeekSchedule from '../components/WeekSchedule';
import WeekToggle from '../components/WeekToggle';
import SubjectInfo from '../components/SubjectInfo';

import { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';

const Schedule = () => {
  const [subjects, setSubjects] = useState([]);
  const [focusedSubject, setFocusedSubject] = useLocalStorage('focusedSubject', {});
  
  useEffect(() => {
    fetch('/public/subjects.json')
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Failed to fetch subjects:', error));
  }, []);

  const weekDay = new Date().getDay();
  const [currDay, setCurrDay] = useState(weekDay === 7 ? 0 : weekDay);
  const [currWeek, setCurrWeek] = useState(1);

  const [isOpen] = useLocalStorage('isSideBarOpen');
  return (
    <>
      <Header/>
      <main className={`${isOpen ? '' : 'wider'}`}>
        <section>
          <WeekSchedule 
            subjects={subjects}
            currDay={currDay}
            setCurrDay={setCurrDay}
            currWeek={currWeek}
            focusedSubject={focusedSubject}
            setFocusedSubject={setFocusedSubject}
          />
        </section>

        <section>
          <WeekToggle
            currWeek={currWeek}
            setCurrWeek={setCurrWeek}
          />
          <SubjectInfo
            focusedSubject={focusedSubject}
          />
        </section>
      </main>
    </>
  ); 
};

export default Schedule;
