import Head from 'next/head'
import styled from 'styled-components'
import LoginForm from '../components/LoginForm'


export default function Home() {
  return (
    <Container>
      <Head>
        <title>HC Dashboard - Home</title>
      </Head>
      <Main>
        <Title>HC Dashboard</Title>
        <Description>Faça seu login</Description>
        <LoginForm />
      </Main>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fc;
`
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`
const Title = styled.h1`
  margin: 0.5rem 0; 
  line-height: 1;
  font-size: 3rem;
  font-weight: 100;
`
const Description = styled.p`
  margin: 0.5rem 0; 
  line-height: 1;
  font-size: 1.5rem;
  font-weight: 100;
`
