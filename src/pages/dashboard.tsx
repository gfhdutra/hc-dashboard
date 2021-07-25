import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
      <main className={styles.main}>

        <h1 className={styles.title}>
          Bem-vindo {userName}
        </h1>
        <br />
        <Link href="/">
          <a>home</a>
        </Link>

      </main>
    </div>
  )
}