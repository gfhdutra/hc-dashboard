import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import NavMenu from '../../components/NavMenu'
import styled from 'styled-components'
import RedirectUser from 'src/components/RedirectUser'
import { UserData } from 'src/interfaces'
import axios from 'axios'
import CryptoJS from 'crypto-js'


export default function Dashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [usersData, setUsersData] = useState<UserData[]>([])
  const [validUser, setValidUser] = useState(false)

  function decrypt(word: string, key: string) {
    let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
  }

  useEffect(() => {
    axios.get('/api/getUsers')
      .then(response => {
        let apiRes = response.data.encryptext
        let decryptedData = decrypt(apiRes, process.env.DECRYPT_KEY)
        setUsersData(decryptedData)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    let currentUser: any = localStorage.getItem('currentUser')
    if (currentUser === 'null') {
      router.push('/')
    }
    else if (currentUser !== null || currentUser !== 'null') {
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
