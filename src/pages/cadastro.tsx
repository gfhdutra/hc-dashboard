import Head from 'next/head'
import Link from 'next/link';
import SignUpForm from '../components/SignUpForm';
import styles from '../styles/Home.module.css'


export default function Cadastro() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard - Cadastro</title>
        <meta name="description" content="Dashboard - SignUp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <h1 className={styles.title}>
          Cadastre-se
        </h1>

        <p className={styles.description}>
          Crie sua conta rápido e fácil
        </p>

        <SignUpForm />

        <Link href="/">
          <a>home</a>
        </Link>

      </main>
    </div>
  )
}