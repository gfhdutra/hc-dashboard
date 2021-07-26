import { useEffect, useState } from 'react';
import Head from 'next/head'
import NavMenu from '../components/NavMenu';
import ClientForm from '../components/ClientForm';
import styles from '../styles/Client.module.css'


export default function Client() {
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
          Clientes
        </h1>

        <p className={styles.description}>
          Gerencie aqui seus clientes
        </p>

        <ClientForm />
      </main>

    </div>
  )
}
