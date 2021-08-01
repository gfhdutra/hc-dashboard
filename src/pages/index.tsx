import Head from 'next/head'
import LoginForm from '../components/LoginForm';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HC-Dashboard-Home</title>
        <meta name="description" content="Dashboard Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          HC Dashboard
        </h1>
        <p className={styles.description}>
          Faça seu login
        </p>

        <LoginForm />
        
      </main>
    </div>
  )
}
