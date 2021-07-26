import { useEffect, useState } from 'react';
import Head from 'next/head'
import NavMenu from '../components/NavMenu';
import styles from '../styles/Dashboard.module.css'


export default function Dashboard() {
  const [ userName, setUserName ] = useState('')

  useEffect(() => {
    let currentUser = localStorage.getItem('currentUser')
    if (currentUser !== null) {
      setUserName(currentUser)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="User Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavMenu />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>
          Olá, {userName}
        </h1>

        <p className={styles.description}>
          Este é o seu dashboard 
        </p>
      </main>

    </div>
  )
}
