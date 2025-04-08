import styles from './styles/SubjectInfo.module.css';

const SubjectInfo = ({focusedSubject}) => {
  return (
    <div className={styles.subjInfo} >
        <h1>Опис</h1>
        <p><span>Предмет:</span> <br/> { focusedSubject.name }</p>
        <p><span>Формат:</span> <br/> { focusedSubject.format }</p>
        <p><span>Викладач:</span> <br/> { focusedSubject.teacher }</p>
        <p><span>Аудиторія:</span> <br/> { focusedSubject.room }</p>
    </div>  
  );
};

export default SubjectInfo;