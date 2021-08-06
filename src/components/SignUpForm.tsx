import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import Swal from 'sweetalert2'
import styled from "styled-components"

type UserData = {
  email: string,
  user: string,
  password: string
}

type SignUpError = {
  signUpError: boolean,
}

let signUpError: boolean = false

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [usersData, setUsersData] = useState([])
  const [errorMsg, setErrorMsg] = useState('Ocorreu um erro')
  const [alertMsg, setAlertMsg] = useState(false);
  const router = useRouter()

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    willClose: () => {
      router.push('/')
    }
  })

  useEffect(() => {
    let usersDataString = localStorage.getItem('usersData')
    if (usersDataString !== null) {
      setUsersData(JSON.parse(usersDataString))
    }
  }, [])

  function createUser(
    email: string,
    usuario: string,
    senha: string
  ): UserData {
    return {
      email: email,
      user: usuario,
      password: senha
    }
  }

  function setError(bool: boolean) {
    return signUpError = bool
  }

  function verifySignUp() {
    usersData.map((users) => {
      if (email == users.email) {
        setErrorMsg('Email já cadastrado')
        setError(true)
      }
      if (user == users.user) {
        setErrorMsg('Usuário já cadastrado')
        setError(true)
      }
    })
  }

  function handleSignUp(e: any) {
    e.preventDefault()
    setError(false)
    setErrorMsg('Ocorreu um erro')
    verifySignUp()
    if (!signUpError) {
      usersData.push(createUser(email, user, password))
      localStorage.setItem('usersData', JSON.stringify(usersData))
      setAlertMsg(true)
      setEmail('')
      setUser('')
      setPassword('')
    }
  }

  if (alertMsg) {
    Toast.fire({
      icon: 'success',
      title: 'Cadastrado com sucesso!'
    })
  }

  return (
    <StyledSignUpForm onSubmit={handleSignUp}>

      <InputFieldDiv>
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </InputFieldDiv>
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

      <ErrorMsg signUpError={signUpError}>{errorMsg}</ErrorMsg>
      <Button>Cadastrar</Button>
    </StyledSignUpForm>
  )
}


const StyledSignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  margin: 1.5rem 0;
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
  visibility: ${(props: SignUpError) => props.signUpError ? 'visible' : 'hidden'};
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
