import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import styles from "./styles.module.css"

export default function LoginForm() {
  const [ user, setUser ] = useState('')
  const [ password, setPassword  ] = useState('')
  const [ loginError, setLoginError ] = useState(false)
  const [ usersData, setUsersData ] = useState([])
  const [ errorMsg, setErrorMsg ] = useState('Ocorreu um erro')
  const router = useRouter()

  useEffect(() => {
    let usersDataString = localStorage.getItem('usersData')
    if (usersDataString !== null) {
      setUsersData(JSON.parse(usersDataString))
    }
  }, [])

  function verifyLogin() {
    if (localStorage.getItem('usersData') !== null) {
      usersData.map((users: any) => {
        if (user == users.user && password == users.password) {
          localStorage.setItem('currentUser', user )
          setLoginError(false)
          router.push('/dashboard')
        }
        else if (user == users.user && password != users.password) {
          setErrorMsg('Senha incorreta')
        }
        else if (user != users.user && password == users.password) {
          setErrorMsg('Usuário incorreto')
        }
      })
    } else {
      setErrorMsg('Nenhum usuário cadastrado')
    }
  }

  function handleLogin(e: any) {
    e.preventDefault()
    setLoginError(true)
    setErrorMsg('Usuário ou senha incorretos')
    verifyLogin()
  }

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleLogin}>

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

        <span 
        className={styles.errorMsg + " " + (loginError ? styles.visible : styles.hidden)}>
        {errorMsg}
        </span>
        <button className={styles.button}>Login</button>
      </form>

      <div className={styles.cadastro}>
        <p>não tem cadastro?
        <Link href="/cadastro">
          <a>cadastre-se</a>
        </Link>
        </p> 
      </div>
    </>
  )
}