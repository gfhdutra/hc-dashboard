import { useClient } from "src/contexts/ClientContext"
import styles from "./styles.module.css"

export default function ClientTable() {
  const { clientsDataList, setClientId, deleteConfirmation } = useClient()

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th colSpan={2}>Ação</th>
          </tr>
        </thead>
        <tbody>
        { clientsDataList.map(client => {
          return (
          <tr key={client.id}>
            <td>{clientsDataList.indexOf(client) + 1}</td>
            <td>{client.name}</td>
            <td>{client.cpf}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>{client.adress}</td>
            <td>
              <button className={styles.editBtn} onClick={() => {setClientId(client.id)}}>
              Editar
              </button>
            </td>
            <td>
              <button className={styles.removeBtn} onClick={() => {deleteConfirmation(client.id)}}>
              Excluir
              </button>
            </td>
          </tr>
          )
        }) }
        </tbody>
      </table>
    </>
  )
}