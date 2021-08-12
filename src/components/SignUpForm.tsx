import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import axios from 'axios'
import Swal from 'sweetalert2'
import styled from "styled-components"
import CryptoJS from 'crypto-js'

interface UserData {
  user: string,
  email: string,
  password: string
}
interface SignUpError {
  signUpError: boolean,
}
let signUpError: boolean = false

export default function SignUpForm() {
  const router = useRouter()
  const userInitialState = {user: '', email: '', password: ''}
  const [alertMsg, setAlertMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('Ocorreu um erro')
  const [usersData, setUsersData] = useState<UserData[]>([])
  const [currentUser, setCurrentUser] = useState<UserData>(userInitialState)

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

  function decrypt(word: string, key: any) {
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

  function setError(bool: boolean) {
    return signUpError = bool
  }

  function verifySignUp() {
    usersData.map((users: UserData) => {
      if (currentUser.email == users.email) {
        setErrorMsg('Email já cadastrado')
        setError(true)
      }
      if (currentUser.user == users.user) {
        setErrorMsg('Usuário já cadastrado')
        setError(true)
      }
    })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCurrentUser(prevState => ({ ...prevState, [e.target.id]: e.target.value }))
  }

  function handleSignUp(e: FormEvent) {
    e.preventDefault()
    setError(false)
    setErrorMsg('Ocorreu um erro')
    verifySignUp()
    if (!signUpError) {
      axios.post('/api/setUsers', currentUser)
        .then(() => {
          setAlertMsg(true)
          setCurrentUser(userInitialState)
        })
        .catch(e => {
          console.log('Some error happened: ', e.message)
        })
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
          placeholder="E-mail"
          value={currentUser.email}
          onChange={handleChange}
          required
        />
      </InputFieldDiv>
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
