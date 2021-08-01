import { useEffect, useState } from 'react'
import Head from 'next/head'
import NavMenu from '../../components/NavMenu'
import ClientForm from '../../components/ClientForm'
import ClientTable from 'src/components/ClientTable'
import styles from '../../styles/Clientes.module.css'


export default function Clientes() {
  const [ clientsData, setClientsData ] = useState([])
  const [ formVisibility, setFormVisibility ] = useState('hidden')
   
  useEffect(() => {
    let clientsDataString = localStorage.getItem('clientsData')
    if (clientsDataString !== null) {
      setClientsData(JSON.parse(clientsDataString))
    }
  }, [])

  function handleDisplayForm() {
    if (formVisibility == 'hidden') {
      setFormVisibility('visible')
    } 
    else if (formVisibility == 'visible') {
      setFormVisibility('hidden')
    }
  }

  return (
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
        <button onClick={handleDisplayForm}>Adicionar Cliente</button>
        
        <ClientTable clientsData={clientsData} />

        <ClientForm clientsData={clientsData} 
        formVisibility={formVisibility}
        changeDisplay={displayStatus => setFormVisibility(displayStatus)}/>
      </main>
    </div>
  )
}
