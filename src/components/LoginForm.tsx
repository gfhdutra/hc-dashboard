import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import styled from "styled-components"

type LoginError = {
  loginError: boolean,
}

export default function LoginForm() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [usersData, setUsersData] = useState([])
  const [errorMsg, setErrorMsg] = useState('Ocorreu um erro')
  const router = useRouter()

  useEffect(() => {
    let usersDataString = localStorage.getItem('usersData')
    if (usersDataString !== null) {
      setUsersData(JSON.parse(usersDataString))
    }
  }, [])

  function verifyLogin() {
    if (localStorage.getItem('usersData') !== null) {
      usersData.map((users: any) => {
        if (user == users.user && password == users.password) {
          localStorage.setItem('currentUser', user)
          setLoginError(false)
          router.push('/dashboard')
        }
        else if (user == users.user && password != users.password) {
          setErrorMsg('Senha incorreta')
        }
        else if (user != users.user && password == users.password) {
          setErrorMsg('Usuário incorreto')
        }
      })
    } else {
      setErrorMsg('Nenhum usuário cadastrado')
    }
  }

  function handleLogin(e: any) {
    e.preventDefault()
    setLoginError(true)
    setErrorMsg('Usuário ou senha incorretos')
    verifyLogin()
  }

  return (
    <>
      <StyledLoginForm onSubmit={handleLogin}>
        <InputFieldDiv>
          <Label htmlFor="user">Usuário</Label>
          <Input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </InputFieldDiv>
        <InputFieldDiv>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputFieldDiv>

        <ErrorMsg loginError={loginError}>{errorMsg}</ErrorMsg>
        <Button>Login</Button>
      </StyledLoginForm>

      <Cadastro>
        <Description>não tem cadastro?
          <Link href="/cadastro" passHref>
            <LinkAnchor>cadastre-se</LinkAnchor>
          </Link>
        </Description>
      </Cadastro>
    </>
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
  margin: 0.3rem 0;
`
const Label = styled.label`
  padding: 0.1rem 0;
`
const Input = styled.input`
  border-radius: 2px;
  border: 1px solid #333;
  padding: 0.3rem;
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
const Cadastro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
`
const Description = styled.p`
  font-size: 1rem;
`
const LinkAnchor = styled.a`
  padding: 0 0.2rem;
  text-decoration: underline;
`
