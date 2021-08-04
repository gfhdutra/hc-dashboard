import { useEffect, useState, CSSProperties } from "react"
import { useClient } from "src/contexts/ClientContext"
import styles from "./styles.module.css"


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
    <div className={styles.modal}>
      <form className={styles.clientForm} onSubmit={handleModifyClientsList}>

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