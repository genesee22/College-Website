import { Link } from 'react-router-dom';
import styles from '../pages/Schedule.module.css';
import useLocalStorage from 'use-local-storage';

const Schedule = () => {
  const [isOpen] = useLocalStorage('isSideBarOpen');

  return (
    <>
      <div className={`header-img ${isOpen ? '' : 'wider'}`}>
        <img src="/public/header.png"/>
        <img src="/public/header-logo.png"/>
      </div>
      <div className={`content ${isOpen ? '' : 'wider'}`}>
        <div className={styles.schedule}>
          <div className={styles.navigation}>
            <p >ПН</p>
            <p >ВТ</p>
            <p >СР</p>
            <p >ЧТ</p>
            <p >ПТ</p>
            <p >СБ</p>
            <div className={styles.selected}></div>
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