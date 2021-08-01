import { useEffect, useState } from "react"
import styles from "./styles.module.css"

type UserData = {
  id: number,
  name: string,
  cpf: string,
  email: string,
  phone: string,
  adress: string,
}

let newClientError: boolean = false

export default function ClientForm({ clientsData, formVisibility, changeDisplay }) {
  const [ name, setName ] = useState('')
  const [ cpf, setCpf ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ adress, setAdress ] = useState('')
  const [ msgErro, setMsgErro ] = useState('Ocorreu um erro')
  const id = clientsData.length + 1


  function createClient(
    id: number,
    name: string,
    cpf: string,
    email: string,
    phone: string,
    adress: string,
    ): UserData {
    return { 
      id: id,
      name: name,
      cpf: cpf,
      email: email,
      phone: phone,
      adress: adress,
    }
  }

  function setError(bool: boolean) {
    return newClientError = bool
  }

  function verifyNewClient() {
    clientsData.map((client) => {
      if (phone == client.phone) {
        setMsgErro('Telefone já cadastrado')
        setError(true)
      }
      if (email == client.email) {
        setMsgErro('E-mail já cadastrado')
        setError(true)
      }
      if (cpf == client.cpf) {
        setMsgErro('CPF já cadastrado')
        setError(true)
      }
      if (name == client.name) {
        setMsgErro('Nome já cadastrado')
        setError(true)
      }
    })
  }

  function clearForm() {
    setName('')
    setCpf('')
    setEmail('')
    setPhone('')
    setAdress('')
  }

  function closeForm() {
    changeDisplay('hidden')
  }

  function handleSignUp(e: any) {
    e.preventDefault()
    setError(false)
    setMsgErro('Ocorreu um erro')
    verifyNewClient()
    if (!newClientError) {
      clientsData.push(createClient(
        id,
        name,
        cpf,
        email,
        phone,
        adress))
      localStorage.setItem('clientsData', JSON.stringify(clientsData))
      clearForm()
      closeForm()
    }
  }

  return (
    <div className={styles.modal} style={{visibility: formVisibility}}>
      <form className={styles.clientForm} onSubmit={handleSignUp}>

        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="name">Nome Completo</label>
          <input 
          className={styles.input} 
          type="text" 
          id="name"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="cpf">CPF</label>
          <input 
          className={styles.input} 
          type="number" 
          id="cpf"
          value={cpf} 
          onChange={(e) => setCpf(e.target.value)}
          required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="email">E-mail</label>
          <input 
          className={styles.input} 
          type="email" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="phone">Telefone</label>
          <input 
          className={styles.input} 
          type="number" 
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          />
        </div>
        <div className={styles.inputField} id={styles.adress}>
          <label className={styles.label} htmlFor="adress">Endereço</label>
          <input 
          className={styles.input} 
          type="text" 
          id="adress"
          value={adress} 
          onChange={(e) => setAdress(e.target.value)}
          required
          />
        </div>

        <span 
        className={styles.errorMsg + " " + (newClientError ? styles.visible : styles.hidden)}>
        {msgErro}
        </span>
        <button className={styles.button}>Cadastrar</button>
      </form>
    </div>
  )
}