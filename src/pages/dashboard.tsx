import { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
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
          Olá, {userName}
        </h1>

        <p className={styles.description}>
          Gestão de cadastros
        </p>

        <div className={styles.redirect}>
          <Link href="/" passHref>
            <button className={styles.btnRedirect}>Cadastrar Cliente</button>
          </Link>
          <Link href="/" passHref>
            <button className={styles.btnRedirect}>Cadastrar Produto</button>
          </Link>
        </div>

        <Link href="/">
          <a>Logout</a>
        </Link>
      </main>
    </div>
  )
}