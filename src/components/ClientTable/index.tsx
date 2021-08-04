import { useClient } from "src/contexts/ClientContext"
import styles from "./styles.module.css"

export default function ClientTable() {
  const { clientsDataList, setClientId, setCurrentId } = useClient()

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
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
        { clientsDataList.map(client => {
          return (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.cpf}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>{client.adress}</td>
            <td>
              <button onClick={() => {setClientId(client.id); setCurrentId(client.id)}}>
              Editar
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