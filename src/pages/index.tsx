import Head from 'next/head'
import LoginForm from '../components/LoginForm';
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard - Home</title>
        <meta name="description" content="Dashboard Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <h1 className={styles.title}>
          Dashboard
        </h1>

        <p className={styles.description}>
          Gestão de cadastros
        </p>

        <LoginForm />

      </main>
    </div>
  )
}
