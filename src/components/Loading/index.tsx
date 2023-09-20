import styles from "./styles.module.css";

const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-3" >
         <span>Carregando...</span>
        <span className={styles.loader}></span>
      </div>
    </>
  );
};

export default Loading;
