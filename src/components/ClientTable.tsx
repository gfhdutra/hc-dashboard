import { useClient } from "src/contexts/ClientContext"
import styled from "styled-components"

export default function ClientTable() {
  const { clientsDataList, setClientId, deleteConfirmation } = useClient()

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
                    style={{ backgroundImage: "url(/edit-2.svg)" }}>
                  </EditIcon>
                  <TrashIcon onClick={() => { deleteConfirmation(client.id) }}
                    style={{ backgroundImage: "url(/trash.svg)" }}>
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
    /* max-width: 200px; */
    white-space: nowrap;
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
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  filter: invert(51%) sepia(83%) saturate(2028%) hue-rotate(199deg) brightness(105%) contrast(86%);
  &:hover{
    cursor: pointer;
    filter: invert(38%) sepia(80%) saturate(2592%) hue-rotate(207deg) brightness(96%) contrast(94%);
  }
`
const TrashIcon = styled(EditIcon)`
  filter: invert(51%) sepia(73%) saturate(6674%) hue-rotate(1deg) brightness(100%) contrast(106%);
  &:hover{
    filter: invert(27%) sepia(58%) saturate(5903%) hue-rotate(3deg) brightness(104%) contrast(102%);
  }
`
