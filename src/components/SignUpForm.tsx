import { useEffect } from "react"
import { useSignUpForm } from "src/contexts/UserContext"
import { SignUpError } from 'src/interfaces'
import styled from "styled-components"


export default function SignUpForm() {
  const {
    email,
    user,
    password,
    signUpError,
    signUpErrorMsg,
    setSignUpError,
    handleChange,
    handleSignUp,
    alertMsg,
    Toast,
    setCurrentUser,
    getUsersData
  } = useSignUpForm()

  useEffect(() => {
    getUsersData()
    setCurrentUser({id: '', user: '', email: '', password: '', active: false })
    setSignUpError(false)
  }, [getUsersData, setCurrentUser, setSignUpError])

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
          value={email}
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
          value={user}
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
          value={password}
          onChange={handleChange}
          required
        />
      </InputFieldDiv>

      <ErrorMsg signUpError={signUpError}>{signUpErrorMsg}</ErrorMsg>
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
