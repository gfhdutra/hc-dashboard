import Head from 'next/head'
import NavMenu from '../../components/NavMenu'
import ClientForm from '../../components/ClientForm'
import ClientTable from 'src/components/ClientTable'
import { ClientContextProvider } from '../../contexts/ClientContext';
import styles from '../../styles/Clientes.module.css'


export default function Clientes() {

  return (
    <ClientContextProvider>
      <div className={styles.container}>
        <Head>
          <title>Dashboard Clientes</title>
          <meta name="description" content="Dashboard Clientes" />
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
          <ClientTable />
        </main>
      </div>
    </ClientContextProvider>
  )
}
