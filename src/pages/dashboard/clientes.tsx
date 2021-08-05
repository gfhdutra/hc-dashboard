import Head from 'next/head'
import NavMenu from '../../components/NavMenu'
import ClientForm from '../../components/ClientForm'
import ClientTable from 'src/components/ClientTable'
import { ClientContextProvider } from '../../contexts/ClientContext'
import styled from 'styled-components'


export default function Clientes() {

  return (
    <ClientContextProvider>
      <Container>
        <Head>
          <title>User Dashboard - Clientes</title>
        </Head>
        <NavMenu />
        <Main>
          <Title>Clientes</Title>
          <Desciption>Gerencie aqui seus clientes</Desciption>
          <ClientForm />
          <ClientTable />
        </Main>
      </Container>
    </ClientContextProvider>
  )
}


const Container = styled.div`
  min-height: 100vh;
  display: flex;
`
const Main = styled.main`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f7f8fc;
`
const Title = styled.h1`
  margin: 1rem 0; 
  line-height: 1;
  font-size: 3rem;
  font-weight: 100;
`
const Desciption = styled.p`
  margin: 1rem 0; 
  line-height: 1;
  font-size: 1.5rem;
  font-weight: 100;
`
