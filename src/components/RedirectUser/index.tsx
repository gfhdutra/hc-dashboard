import styles from "./styles.module.css"

export default function RedirectUser() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>
          Redirecionando...
        </h1>
        <div className={styles.preloader}>
          <div className={styles.loader}></div>
        </div>
      </main>
    </div>
  )
}