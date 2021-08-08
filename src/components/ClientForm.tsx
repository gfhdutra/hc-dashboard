import { ChangeEvent } from 'react'
import { useClient } from "src/contexts/ClientContext"
import { default as NumberFormat } from 'react-number-format';
import styled from "styled-components"

type NewClientError = {
  newClientError: boolean,
}

export default function ClientForm() {
  const {
    name,
    cpf,
    email,
    phone,
    adress,
    newClientError,
    msgErro,
    setName,
    setCpf,
    setEmail,
    setPhone,
    setAdress,
    handleModifyClientsList,
  } = useClient()

  return (
    <FormDiv>
      <StyledClientForm onSubmit={handleModifyClientsList}>

        <InputFieldDiv>
          <label htmlFor="name">Nome Completo</label>
          <Input
            type="text"
            id="name"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputFieldDiv>
        <InputFieldDiv>
          <label htmlFor="cpf">CPF</label>
          <FormatedInput
            displayType="input"
            type="text"
            id="cpf"
            placeholder="123.456.789-10"
            format="###.###.###-##"
            mask="_"
            value={cpf}
            onChange={(e: ChangeEvent<HTMLFormElement>) => setCpf(e.target.value)}
          />
        </InputFieldDiv>
        <InputFieldDiv>
          <label htmlFor="email">E-mail</label>
          <Input
            type="email"
            id="email"
            placeholder="nome@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputFieldDiv>
        <InputFieldDiv>
          <label htmlFor="phone">Telefone</label>
          <FormatedInput
            displayType="input"
            type="text"
            id="phone"
            placeholder="+55 (11) 9988-7766"
            format="+## (##) ####-####"
            mask="_"
            value={phone}
            onChange={(e: ChangeEvent<HTMLFormElement>) => setPhone(e.target.value)}
          />
        </InputFieldDiv>
        <InputFieldDivAdress>
          <label htmlFor="adress">Endereço</label>
          <Input
            type="text"
            id="adress"
            placeholder="Endereço"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
        </InputFieldDivAdress>

        {/* <ErrorMsg newClientError={newClientError}>{msgErro}</ErrorMsg> */}
        <Button>Cadastrar</Button>
      </StyledClientForm>
    </FormDiv>
  )
}

const FormDiv = styled.div`
  width: 90%;
  margin-top: 2rem;
  color: #363740;
`
const StyledClientForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`
const InputFieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  label {
    padding: 0.1rem 0;
  }
`
const InputFieldDivAdress = styled(InputFieldDiv)`
  grid-column: 1 / 3;
`
const Input = styled.input`
  border-radius: 2px;
  padding: 0.7rem;
  height: 2.3rem;
  width: 100%;
  border: 2px solid #61636f;
  border-radius: 0.2rem;
  outline: none;
`
const FormatedInput = styled(NumberFormat)`
  border-radius: 2px;
  padding: 0.7rem;
  height: 2.3rem;
  width: 100%;
  border: 2px solid #61636f;
  border-radius: 0.2rem;
  outline: none;
`
const ErrorMsg = styled.span`
  grid-column: 1 / 3;
  margin-top: 0.5rem;
  margin-bottom: -0.5rem;
  font-size: 1.1rem;
  visibility: ${(props: NewClientError) => props.newClientError ? 'visible' : 'hidden'};
`
const Button = styled.button`
  grid-column: 1 / 3;
  margin: auto;
  width: 8rem;
  height: 2.5rem;
  border: 0;
  border-radius: 3px;
  font-size: 1.1rem;
  background-color: #862bdb;
  color: #fff;

  &:hover {
  cursor: pointer;
  background-color: #741cc7;
}
`