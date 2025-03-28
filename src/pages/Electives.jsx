import { Link } from 'react-router-dom';
import styles from '../pages/Electives.module.css';
import useLocalStorage from 'use-local-storage';

const Electives = () => {
  const [isOpen] = useLocalStorage('isSideBarOpen');

  return (
    <>
      <div className={`header-img ${isOpen ? '' : 'wider'}`}>
        <img src="/public/header.png"/>
        <img src="/public/header-logo.png"/>
      </div>
      <div className={`content ${isOpen ? '' : 'wider'}`}>
      </div>
    </>
  );
};

export default Electives;