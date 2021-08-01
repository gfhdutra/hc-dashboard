import styles from "./styles.module.css"

export default function ClientTable({ clientsData }) {

  function setClientContent(id) {
    console.log(id)
  }

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
            <th>EDITAR</th>
          </tr>
        </thead>
        <tbody>
        { clientsData.map(client => {
          return (
          <>
          <tr>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.cpf}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>{client.adress}</td>
            <td><button onClick={() => {setClientContent(client.id)}} >Editar</button></td>
          </tr>
          </>
          )
        }) }
        </tbody>
      </table>
    </>
  )
}