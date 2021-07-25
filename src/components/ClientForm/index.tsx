import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import { Snackbar } from "@material-ui/core"
import { Alert } from '@material-ui/lab'
import styles from "./styles.module.css"

type UserData = {
  email: string,
  user: string,
  password: string
}

const usersData: UserData[] = []
let signUpError: boolean = false

export default function SignUpForm() {
  const [ email, setEmail  ] = useState('')
  const [ user, setUser ] = useState('')
  const [ password, setPassword  ] = useState('')
  const [ msgErro, setMsgErro ] = useState('')
  const [ alertMsg, setAlertMsg ] = useState(false);
  const router = useRouter()
  const vertical = 'top'
  const horizontal = 'center'

  function createUser(email: string, usuario: string, senha: string): UserData {
    return { email: email, user: usuario, password: senha }
  }

  function setError(bool: boolean) {
    return signUpError = bool
  }

  function handleClose(event: any, reason: any) {
    if (reason === 'clickaway') {
      return
    }
    setAlertMsg(false)
  }

  function handleSignUp(e: any) {
    e.preventDefault()
    setError(false)
    setMsgErro('')
    usersData.map((users) => {
      if (email == users.email) {
        setMsgErro('Email já cadastrado')
        setError(true)
      }
      if (user == users.user) {
        setMsgErro('Usuário já cadastrado')
        setError(true)
      }
    })
    if (!signUpError) {
      usersData.push(createUser(email, user, password))
      localStorage.setItem('usersData', JSON.stringify(usersData))
      setAlertMsg(true)
      setTimeout(() => { 
        router.push('/')
      }, 2500)
    }
  }
  
  return (
    <>
      <form className={styles.signUpForm} onSubmit={handleSignUp}>
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
          <label className={styles.label} htmlFor="user">Usuário</label>
          <input 
          className={styles.input} 
          type="text" 
          id="user"
          value={user} 
          onChange={(e) => setUser(e.target.value)}
          required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label} htmlFor="password">Senha</label>
          <input 
          className={styles.input} 
          type="password"  
          id="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>

        <span className={styles.errorMsg + " " + (signUpError ? styles.visible : styles.hidden)}>{msgErro}</span>

        <button className={styles.button}>Cadastrar</button>
      </form>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={alertMsg}
        onClose={handleClose}
        autoHideDuration={2000}>
        <Alert severity="success">
          Cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </>
  )
}