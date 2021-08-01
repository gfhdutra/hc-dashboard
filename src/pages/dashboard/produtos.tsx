import Head from 'next/head'
import NavMenu from '../../components/NavMenu'
import styles from '../../styles/Produtos.module.css'

export default function Produtos() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard Produtos</title>
        <meta name="description" content="Dashboard Produtos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavMenu />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>
          Produtos
        </h1>
        <p className={styles.description}>
          Gerencie aqui seus produtos
        </p>
      </main>
    </div>
  )
}
