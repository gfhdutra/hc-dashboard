import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import NavMenu from '../../components/NavMenu'
import styled from 'styled-components'
// import RedirectUser from 'src/components/RedirectUser'


export default function Dashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [validUser, setValidUser] = useState(false)

  useEffect(() => {
    let currentUser = localStorage.getItem('currentUser')
    if (currentUser === 'null') {
      setValidUser(false)
      // setTimeout(()=> {
      //   router.push('/')
      // }, 2000)
    }
    else if (currentUser !== null || currentUser !== 'null') {
      setValidUser(true)
      setUserName(currentUser)
    }
  }, [router])

  // if (!validUser) {
  //   return <RedirectUser/>
  // }

  return (
    <Container>
      <Head>
        <title>User Dashboard - Home</title>
      </Head>
      <NavMenu />
      <Main>
        <Title>Olá, {userName}</Title>
        <Desciption>Este é o seu dashboard</Desciption>
      </Main>
    </Container>
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
