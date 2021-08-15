import Head from 'next/head'
import LoginForm from '../components/LoginForm'
import styled from 'styled-components'
import SignUpForm from 'src/components/SignUpForm'
import { useState } from 'react'


export default function Home() {
  const [registred, setRegistred] = useState(true)

  return (
    <Container>
      <Head>
        <title>HC Dashboard - Home</title>
      </Head>
      <Main>
        <Title>HC Dashboard</Title>
        <Description>Faça seu login ou cadastre-se</Description>
        {registred ?
          <>
            <LoginForm />
            <CadastroText>não tem cadastro?</CadastroText>
            <CadastroButton onClick={() => { setRegistred(false) }}>cadastre-se</CadastroButton>
          </>
          :
          <>
            <SignUpForm />
            <CadastroText>já tem cadastro?</CadastroText>
            <CadastroButton onClick={() => { setRegistred(true) }}>faça o login</CadastroButton>
          </>
        }
      </Main>
    </Container>
  )
}


const Container = styled.div`
  min-height: 100vh;
  overflow-anchor: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
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
const CadastroText = styled.p`
  font-size: 1rem;
`
const CadastroButton = styled.a`
  color: inherit;
  padding: 0 0.2rem;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`
