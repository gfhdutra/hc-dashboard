import { useClient } from "src/contexts/ClientContext"
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
    <Modal>
      <StyledClientForm onSubmit={handleModifyClientsList}>

        <InputFieldDiv>
          <label htmlFor="name">Nome Completo</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputFieldDiv>
        <InputFieldDiv>
          <label htmlFor="cpf">CPF</label>
          <Input
            type="number"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </InputFieldDiv>
        <InputFieldDiv>
          <label htmlFor="email">E-mail</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputFieldDiv>
        <InputFieldDiv>
          <label htmlFor="phone">Telefone</label>
          <Input
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </InputFieldDiv>
        <InputFieldDiv>
          <label htmlFor="adress">Endereço</label>
          <Input
            type="text"
            id="adress"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
        </InputFieldDiv>

        <ErrorMsg newClientError={newClientError}>{msgErro}</ErrorMsg>
        <Button>Cadastrar</Button>
      </StyledClientForm>
    </Modal>
  )
}


const Modal = styled.div`
  margin: 2rem;
  visibility: visible;
  padding: 3rem;
  padding-bottom: 2rem;
  background-color: #61636f;
  color: #fff;
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
const Input = styled.input`
  border-radius: 2px;
  padding: 0.5rem;
  height: 32px;
  width: 180px;
  border: 1px solid #333;
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
  margin: 1rem auto;
  width: 10rem;
  height: 3rem;
  border: 0;
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: #862bdb;
  color: #fff;

  &:hover {
  cursor: pointer;
  background-color: #9334ec;
}
`