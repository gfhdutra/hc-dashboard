import Head from 'next/head'
import Link from 'next/link';
import styled from 'styled-components'
import SignUpForm from '../components/SignUpForm';


export default function Cadastro() {
  return (
    <Container>
      <Head>
        <title>HC Dashboard - Cadastro</title>
      </Head>
      <Main>
        <Title>Cadastre-se</Title>
        <Description>Crie sua conta rápido e fácil</Description>

        <SignUpForm />

        <Link href="/" passHref>
          <LinkAnchor>home</LinkAnchor>
        </Link>
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
const LinkAnchor = styled.a`
  color: inherit;
  text-decoration: none;
`
