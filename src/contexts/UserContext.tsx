import { useState, ReactNode, FormEvent, useEffect, useCallback, ChangeEvent } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { createContext, useContextSelector } from 'use-context-selector'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { UserData } from 'src/interfaces'
import Swal from 'sweetalert2'


interface UserContextData {
  router: NextRouter,
  userInitialState: UserData,
  loginError: boolean,
  loginErrorMsg: string,
  signUpError: boolean,
  alertMsg: boolean,
  signUpErrorMsg: string,
  usersData: UserData[],
  currentUser: UserData,
  userName: string,
  currentRoute: string,
  Toast: typeof Swal,
  decrypt: (word: string, key: string) => any,
  verifyLogin: () => void,
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleLogin: (e: FormEvent) => void,
  verifySignUp: () => boolean,
  handleSignUp: (e: FormEvent) => void,
  handleLogout: () => void,
  setCurrentUser: any,
  setUserName: any,
  setLoginError: any,
  setSignUpError: any,
}

type UserContextProviderProps = {
  children: ReactNode,
}

export const UserContext = createContext({} as UserContextData)
export function UserContextProvider({ children }: UserContextProviderProps) {
  const router = useRouter()
  const [usersData, setUsersData] = useState<UserData[]>([])
  const userInitialState = { id: '', user: '', email: '', password: '', active: false }
  const [currentUser, setCurrentUser] = useState<UserData>(userInitialState)
  const [userName, setUserName] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [loginErrorMsg, setLoginErrorMsg] = useState('Ocorreu um erro')
  const [alertMsg, setAlertMsg] = useState(false)
  const [signUpError, setSignUpError] = useState(false)
  const [signUpErrorMsg, setSignUpErrorMsg] = useState('Ocorreu um erro')
  let currentRoute = router.pathname

  const decrypt = useCallback((word: string, key: any) => {
    let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
  }, [])

  useEffect(() => {
    axios.get('/api/getUsers')
      .then(response => {
        let apiRes = response.data.encryptext
        let decryptedData = decrypt(apiRes, process.env.DECRYPT_KEY)
        setUsersData(decryptedData)
      })
      .catch(error => {
        console.log(error)
      })
  }, [decrypt])

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      setAlertMsg(false)
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    willClose: () => {
      router.push('/')
    }
  })

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentUser(prevState => ({ ...prevState, [e.target.id]: e.target.value }))
  }, [])

  const verifyLogin = useCallback(() => {
    usersData.map((users: UserData) => {
      if (currentUser.user == users.user && currentUser.password == users.password) {
        setLoginError(false)
        axios.patch('/api/updateUsers', { id: users.id, active: true })
          .then(() => {
            setCurrentUser({ id: '', user: '', email: '', password: '', active: true })
            localStorage.setItem('currentUser', currentUser.user)
            router.push('/dashboard')
          })
          .catch(error => {
            console.log('Error happened: ', error.message)
          })
      }
      else if (currentUser.user == users.user && currentUser.password != users.password) {
        setLoginErrorMsg('Senha incorreta')
      }
    })
  }, [currentUser.password, currentUser.user, router, usersData])

  const handleLogin = useCallback((e: FormEvent) => {
    e.preventDefault()
    setLoginError(true)
    setLoginErrorMsg('Usuário ou senha incorretos')
    verifyLogin()
  }, [verifyLogin])

  const verifySignUp = useCallback(() => {
    let existingUser: boolean = false
    usersData.map((users: UserData) => {
      if (currentUser.email == users.email) {
        existingUser = true
        setSignUpError(true)
        setSignUpErrorMsg('Email já cadastrado')
      }
      if (currentUser.user == users.user) {
        existingUser = true
        setSignUpError(true)
        setSignUpErrorMsg('Usuário já cadastrado')
      }
    })
    return existingUser
  }, [currentUser.email, currentUser.user, usersData])

  const handleSignUp = useCallback((e: FormEvent) => {
    e.preventDefault()
    setSignUpError(false)
    setSignUpErrorMsg('Ocorreu um erro')
    let existingUser = verifySignUp()
    if (existingUser != true) {
      axios.post('/api/setUsers', currentUser)
        .then(() => {
          setAlertMsg(true)
          setCurrentUser({ id: '', user: '', email: '', password: '', active: false })
        })
        .catch(error => {
          console.log('Error happened: ', error.message)
        })
    }
  }, [currentUser, verifySignUp])

  const handleLogout = useCallback(() => {
    usersData.map((users: UserData) => {
      if (userName == users.user) {
        axios.patch('/api/updateUsers', { id: users.id, active: false })
          .then(() => {
            localStorage.removeItem('currentUser')
            router.push('/')
          })
          .catch(error => {
            console.log('Error happened: ', error.message)
          })
      }
    })
  }, [router, userName, usersData])


  return (
    <UserContext.Provider
      value={{
        router,
        userInitialState,
        loginError,
        loginErrorMsg,
        signUpError,
        alertMsg,
        signUpErrorMsg,
        usersData,
        currentUser,
        userName,
        currentRoute,
        Toast,
        decrypt,
        verifyLogin,
        handleChange,
        handleLogin,
        verifySignUp,
        handleSignUp,
        handleLogout,
        setCurrentUser,
        setUserName,
        setLoginError,
        setSignUpError
      }}>
      {children}
    </UserContext.Provider>
  )
}

export function useLoginForm() {
  const user = useContextSelector(UserContext, user => user.currentUser.user)
  const password = useContextSelector(UserContext, user => user.currentUser.password)
  const loginError = useContextSelector(UserContext, user => user.loginError)
  const loginErrorMsg = useContextSelector(UserContext, user => user.loginErrorMsg)
  const setLoginError = useContextSelector(UserContext, user => user.setLoginError)
  const handleChange = useContextSelector(UserContext, user => user.handleChange)
  const handleLogin = useContextSelector(UserContext, user => user.handleLogin)
  const setCurrentUser = useContextSelector(UserContext, user => user.setCurrentUser)

  return {
    user,
    password,
    loginError,
    loginErrorMsg,
    setLoginError,
    handleChange,
    handleLogin,
    setCurrentUser
  }
}

export function useSignUpForm() {
  const email = useContextSelector(UserContext, user => user.currentUser.email)
  const user = useContextSelector(UserContext, user => user.currentUser.user)
  const password = useContextSelector(UserContext, user => user.currentUser.password)
  const signUpError = useContextSelector(UserContext, user => user.signUpError)
  const signUpErrorMsg = useContextSelector(UserContext, user => user.signUpErrorMsg)
  const setSignUpError = useContextSelector(UserContext, user => user.setSignUpError)
  const handleChange = useContextSelector(UserContext, user => user.handleChange)
  const handleSignUp = useContextSelector(UserContext, user => user.handleSignUp)
  const alertMsg = useContextSelector(UserContext, user => user.alertMsg)
  const Toast = useContextSelector(UserContext, user => user.Toast)
  const setCurrentUser = useContextSelector(UserContext, user => user.setCurrentUser)

  return {
    email,
    user,
    password,
    signUpError,
    signUpErrorMsg,
    setSignUpError,
    handleChange,
    handleSignUp,
    alertMsg,
    Toast,
    setCurrentUser
  }
}

export function useNavMenu() {
  const setUserName = useContextSelector(UserContext, user => user.setUserName)
  const currentRoute = useContextSelector(UserContext, user => user.currentRoute)
  const handleLogout = useContextSelector(UserContext, user => user.handleLogout)

  return {
    setUserName,
    currentRoute,
    handleLogout,
  }
}

export function useDashboard() {
  const userName = useContextSelector(UserContext, user => user.userName)

  return {
    userName
  }
}
