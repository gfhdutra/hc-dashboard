import { useClientTable } from "src/contexts/ClientContext"
import styled from "styled-components"

export default function ClientTable() {
  const { clientsDataList, setClientId, deleteConfirmation } = useClientTable()

  return (
    <Div>
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
                <Actions>
                  <EditIcon onClick={() => { setClientId(client.id) }}
                    style={{ backgroundImage: "url(/edit.svg)" }}>
                  </EditIcon>
                  <TrashIcon onClick={() => { deleteConfirmation(client.id) }}
                    style={{ backgroundImage: "url(/delete-x.svg)" }}>
                  </TrashIcon>
                </Actions>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    </Div>
  )
}

const Div = styled.div`
  width: 90%;
  margin: 2rem 0;
  overflow-x: auto;
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #363740;
    color: #fff;
  }
  td, th {
    text-align: center;
    padding: 0.5rem;
  }
  tbody tr {
    height: 50px;
  }
  tbody tr:nth-child(odd) {
    background-color: #e7e7e7;
  }
  tbody td:first-child {
    min-width: 50px;
  }
  tbody td:not(:first-child) {
    min-width: 160px;
    max-width: 200px;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
  }
`
const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const EditIcon = styled.div`
  margin: 0 .6rem;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  /* #79a3ec */
  filter: invert(51%) sepia(83%) saturate(2028%) hue-rotate(199deg) brightness(105%) contrast(86%);
  &:hover{
    cursor: pointer;
    filter: invert(30%) sepia(58%) saturate(6845%) hue-rotate(231deg) brightness(103%) contrast(101%);
  }
`
const TrashIcon = styled(EditIcon)`
  /* #fc4d0e */
  /* #ff0000 */
  filter: invert(34%) sepia(56%) saturate(2625%) hue-rotate(355deg) brightness(100%) contrast(98%);
  &:hover{
    filter: invert(21%) sepia(67%) saturate(7448%) hue-rotate(355deg) brightness(94%) contrast(119%);
  }
`
