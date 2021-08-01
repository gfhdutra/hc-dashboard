import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import NavMenu from '../../components/NavMenu'
import RedirectUser from 'src/components/RedirectUser';
import styles from '../../styles/Dashboard.module.css'

export default function Dashboard() {
  const router = useRouter()
  const [ userName, setUserName ] = useState('')
  const [ validUser, setValidUser ] = useState(false)

  useEffect(() => {
    let currentUser = localStorage.getItem('currentUser')
    if (currentUser === 'null') {
      setValidUser(false)
      setTimeout(()=> {
        router.push('/')
      }, 2000)
    }
    else if (currentUser !== null || currentUser !== 'null') {
      setValidUser(true)
      setUserName(currentUser)
    }
  }, [router])

  // if (!validUser) {
  //   return <RedirectUser/>
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>User Dashboard-Home</title>
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
