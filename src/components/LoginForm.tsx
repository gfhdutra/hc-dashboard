import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import axios from "axios"
import CryptoJS from 'crypto-js'
import { UserData, CurrentUser, LoginError } from 'src/interfaces'
import styled from "styled-components"


export default function LoginForm() {
  const router = useRouter()
  const userInitialState = { id: '', user: '', email: '', password: '', active: false }
  const [loginError, setLoginError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('Ocorreu um erro')
  const [usersData, setUsersData] = useState<UserData[]>([])
  const [currentUser, setCurrentUser] = useState<UserData>(userInitialState)


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


  function verifyLogin() {
    usersData.map((users: UserData) => {
      if (currentUser.user == users.user && currentUser.password == users.password) {
        setLoginError(false)
        axios.patch('/api/updateUsers', { id: users.id, active: true })
          .then(() => {
            localStorage.setItem('currentUser', currentUser.user)
            router.push('/dashboard')
          })
          .catch(error => {
            console.log('Error happened: ', error.message)
          })
      }
      else if (currentUser.user == users.user && currentUser.password != users.password) {
        setErrorMsg('Senha incorreta')
      }
      else if (currentUser.user != users.user && currentUser.password == users.password) {
        setErrorMsg('Usuário incorreto')
      }
    })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCurrentUser(prevState => ({ ...prevState, [e.target.id]: e.target.value }))
  }

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoginError(true)
    setErrorMsg('Usuário ou senha incorretos')
    verifyLogin()
  }

  return (
    <StyledLoginForm onSubmit={handleLogin}>
      <InputFieldDiv>
        <Label htmlFor="user">Usuário</Label>
        <Input
          type="text"
          id="user"
          placeholder="Usuário"
          value={currentUser.user}
          onChange={handleChange}
          required
        />
      </InputFieldDiv>
      <InputFieldDiv>
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          placeholder="Senha"
          value={currentUser.password}
          onChange={handleChange}
          required
        />
      </InputFieldDiv>

      <ErrorMsg loginError={loginError}>{errorMsg}</ErrorMsg>
      <Button>Login</Button>
    </StyledLoginForm>
  )
}


const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  margin: 1rem 0;
`
const InputFieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`
const Label = styled.label`
  padding: 0.1rem 0;
`
const Input = styled.input`
  border-radius: 0.2rem;
  border: 2px solid #61636f;
  padding: 0.5rem;
  outline: none;
`
const ErrorMsg = styled.span`
  margin-top: 0.5rem;
  margin-bottom: -0.5rem;
  font-size: 0.9rem;
  color: #ff0000;
  visibility: ${(props: LoginError) => props.loginError ? 'visible' : 'hidden'};
`
const Button = styled.button`
  margin: 1.5rem 0;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 3px;
  font-size: 0.9rem;
  background-color: #862bdb;
  color: #fff;

  &:hover {
    cursor: pointer;
    background-color: #9334ec;
  }
`
