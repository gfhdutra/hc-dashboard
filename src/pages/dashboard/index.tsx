import Head from 'next/head'
import NavMenu from '../../components/NavMenu'
import { useDashboard } from 'src/contexts/UserContext'
import styled from 'styled-components'


export default function Dashboard() {
  const { userName } = useDashboard()

  return (
    <Container>
      <Head>
        <title>User Dashboard - Home</title>
      </Head>
      <NavMenu />
      <Main>
        <Title>Olá, {userName.current}</Title>
        <Desciption>Este é o seu dashboard</Desciption>
      </Main>
    </Container>
  )
}


const Container = styled.div`
  min-height: 100vh;
  overflow-anchor: none;
  display: grid;
  grid-template-columns: 16rem auto;
  @media (max-width: 600px) {
    grid-template-columns: 4.5rem auto;
  }
`
const Main = styled.main`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: break-word;
  background-color: #f7f7f7;
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
