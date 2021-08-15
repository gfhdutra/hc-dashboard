import { useEffect } from 'react'
import { useLoginForm } from "src/contexts/UserContext"
import { LoginError } from 'src/interfaces'
import styled from "styled-components"


export default function LoginForm() {
  const {
    user,
    userName,
    password,
    loginError,
    loginErrorMsg,
    setLoginError,
    handleChange,
    handleLogin,
    setCurrentUser,
    getUsersData,
    getUserName,
    router
  } = useLoginForm()

  useEffect(() => {
    getUsersData()
    getUserName()
    if (userName.current !== null) {
      router.replace('/dashboard')
    }
    setCurrentUser({ id: '', user: '', email: '', password: '', active: false })
    setLoginError(false)
  }, [])


  return (
    <StyledLoginForm onSubmit={handleLogin}>
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

      <ErrorMsg loginError={loginError}>{loginErrorMsg}</ErrorMsg>
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
