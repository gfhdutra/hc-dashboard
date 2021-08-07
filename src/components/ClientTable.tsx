import { useClient } from "src/contexts/ClientContext"
import styled from "styled-components"

export default function ClientTable() {
  const { clientsDataList, setClientId, deleteConfirmation } = useClient()

  return (
    <Table>
      <thead>
        <tr>
          <th id="id">ID</th>
          <th>Nome Completo</th>
          <th>CPF</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Endereço</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {clientsDataList.map(client => {
          return (
            <tr key={client.id}>
              <td>{clientsDataList.indexOf(client) + 1}</td>
              <td>{client.name}</td>
              <td>{client.cpf}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.adress}</td>
              <td>
                <Button onClick={() => { setClientId(client.id) }}>
                  Editar
                </Button>
                <RemoveButton onClick={() => { deleteConfirmation(client.id) }}>
                  Excluir
                </RemoveButton>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  border-collapse: collapse;
  width: 90%;
  margin: 2rem;

  thead {
    background-color: #363740;
    color: #fff;
  }
  td, th {
    /* min-width: 125px; */
    text-align: center;
    padding: 0.5rem;
    overflow: hidden;
  }
  th:first-child {
    min-width: 50px;
  }
  th:not(:first-child) {
    min-width: 160px;
  }
  tbody tr:nth-child(odd) {
    background-color: #e7e7e7;
  }
`
const Button = styled.button`
  padding: 0.6rem;
  margin: 0 0.3rem;
  border: 0;
  border-radius: 3px;
  font-size: 0.9rem;
  background-color: #6495ed;
  color: #fff;
  &:hover{
    cursor: pointer;
    background-color: #557fce;
  }
`
const RemoveButton = styled(Button)`
  background-color: #ff4500;
  &:hover {
    background-color: #db4008;
  }
`
