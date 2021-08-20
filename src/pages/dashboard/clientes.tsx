import Head from 'next/head'
import styled from 'styled-components'
import NavMenu from '../../components/NavMenu'
import ClientForm from '../../components/ClientForm'
import ClientTable from 'src/components/ClientTable'


export default function Clientes() {
  return (
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
  )
}

const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  overflow-anchor: none;
  display: grid;
  grid-template-columns: 16rem auto;
  @media (max-width: 600px) {
    grid-template-columns: 4.5rem auto;
  }
`
const Main = styled.main`
  /* width: calc(100vw - 16rem); */
  max-width: 100%;
  min-width: 0;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  background-color: #f7f7f7;
  @media (max-width: 600px) {
    width: calc(100vw - 4.5rem);
  }
`
const Title = styled.h1`
  margin: 2rem 0;
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
