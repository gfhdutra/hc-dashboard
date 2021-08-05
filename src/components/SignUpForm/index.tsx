import { useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import Swal from 'sweetalert2'
import styles from "./styles.module.css"

type UserData = {
  email: string,
  user: string,
  password: string
}

let signUpError: boolean = false

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [usersData, setUsersData] = useState([])
  const [msgErro, setMsgErro] = useState('Ocorreu um erro')
  const [alertMsg, setAlertMsg] = useState(false);
  const router = useRouter()

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    willClose: () => {
      router.push('/')
    }
  })

  useEffect(() => {
    let usersDataString = localStorage.getItem('usersData')
    if (usersDataString !== null) {
      setUsersData(JSON.parse(usersDataString))
    }
  }, [])

  function createUser(
    email: string,
    usuario: string,
    senha: string
  ): UserData {
    return {
      email: email,
      user: usuario,
      password: senha
    }
  }

  function setError(bool: boolean) {
    return signUpError = bool
  }

  function verifySignUp() {
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
  }

  function handleSignUp(e: any) {
    e.preventDefault()
    setError(false)
    setMsgErro('Ocorreu um erro')
    verifySignUp()
    if (!signUpError) {
      usersData.push(createUser(email, user, password))
      localStorage.setItem('usersData', JSON.stringify(usersData))
      setAlertMsg(true)
      setEmail('')
      setUser('')
      setPassword('')
    }
  }

  if (alertMsg) {
    Toast.fire({
      icon: 'success',
      title: 'Cadastrado com sucesso!'
    })
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

        <span
          className={styles.errorMsg + " " + (signUpError ? styles.visible : styles.hidden)}>
          {msgErro}
        </span>

        <button className={styles.button}>Cadastrar</button>
      </form>

    </>
  )
}