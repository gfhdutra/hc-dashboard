import { useState, useRef, ReactNode, FormEvent, useCallback, ChangeEvent, useMemo, useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { createContext, useContextSelector } from 'use-context-selector'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { ClientData, UserData } from 'src/interfaces'
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
  userName: any,
  currentRoute: string,
  registred: boolean,
  Toast: typeof Swal,
  setUsersData: any,
  setCurrentUser: any,
  setLoginError: any,
  setSignUpError: any,
  setRegistred: any,
  encrypt: (word: any, key: any) => string,
  decrypt: (word: string, key: string) => any,
  verifyLogin: () => void,
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleLogin: (e: FormEvent) => void,
  verifySignUp: () => boolean,
  handleSignUp: (e: FormEvent) => void,
  handleLogout: () => void,
  getUsersData: () => void,
  getUserName: () => any,
  clientsDataList: ClientData[],
  clientsDataList2: any,
  id: number,
  currentId: number,
  name: string,
  cpf: string,
  email: string,
  phone: string,
  adress: string,
  newClientError: boolean,
  updateClient: boolean,
  updateTable: boolean,
  msgErro: string,
  setClientsDataList: any;
  setId: any;
  setCurrentId: any,
  setName: any;
  setCpf: any;
  setEmail: any;
  setPhone: any;
  setAdress: any;
  setNewClientError: any;
  setUpdateClient: any;
  setUpdateTable: any;
  setMsgErro: any;
  currentClient: ClientData,
  clientDatabaseID: any,
  sortClientsList: (a: ClientData, b: ClientData) => number,
  createClient: (currentClient: ClientData) => ClientData
  clearForm: () => void,
  setClientId: (newId: number) => void,
  editClientForm: (id: number) => void,
  deleteConfirmation: (id: number) => void,
  removeClient: (id: number) => void,
  handleModifyClientsList: (e: FormEvent) => void,
  getClientDatabaseID: () => void,
  getClientsList: () => void,
}

type UserContextProviderProps = {
  children: ReactNode,
}

export const UserContext = createContext({} as UserContextData)
export function UserContextProvider({ children }: UserContextProviderProps) {
  const router = useRouter()
  const [usersData, setUsersData] = useState<UserData[]>([])
  const userInitialState = { id: '', user: '', email: '', password: '', active: false, clientDB: '' }
  const [currentUser, setCurrentUser] = useState<UserData>(userInitialState)
  const userName = useRef<any>(null)
  const [loginError, setLoginError] = useState(false)
  const [loginErrorMsg, setLoginErrorMsg] = useState('Ocorreu um erro')
  const [alertMsg, setAlertMsg] = useState(false)
  const [signUpError, setSignUpError] = useState(false)
  const [signUpErrorMsg, setSignUpErrorMsg] = useState('Ocorreu um erro')
  let currentRoute = router.pathname

  // CLIENT CONTEXT
  const [clientsDataList, setClientsDataList] = useState<ClientData[]>([])
  const clientsDataList2 = useRef<ClientData[]>(clientsDataList)
  const [id, setId] = useState(Date.now())
  const [currentId, setCurrentId] = useState(Number)
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [adress, setAdress] = useState('')
  const clientDatabaseID = useRef<string>(null)
  const [newClientError, setNewClientError] = useState(false)
  const [updateClient, setUpdateClient] = useState(false)
  const [updateTable, setUpdateTable] = useState(false)
  const [msgErro, setMsgErro] = useState('Ocorreu um erro')
  const [registred, setRegistred] = useState(true)
  const currentClient: ClientData = useMemo(() => {
    return { id, name, cpf, email, phone, adress }
  }, [adress, cpf, email, id, name, phone])


  const encrypt = useCallback((word: any, key: any) => {
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(word), key).toString()
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
    return encData
  }, [])

  const decrypt = useCallback((word: string, key: any) => {
    let decData = CryptoJS.enc.Base64.parse(word).toString(CryptoJS.enc.Utf8)
    let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
  }, [])

  const getUsersData = useCallback(() => {
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

  const getUserName = useCallback(() => {
    let userNow = localStorage.getItem('currentUser')
    if (userNow) {
      let currentUser = decrypt(JSON.parse(userNow), process.env.DECRYPT_KEY)
      userName.current = currentUser.user
    }
    return userName.current
  }, [decrypt])

  const getClientDatabaseID = useCallback(() => {
    let clientDB
    let userNow = localStorage.getItem('currentUser')
    if (userNow) {
      let currentUser = decrypt(JSON.parse(userNow), process.env.DECRYPT_KEY)
      clientDatabaseID.current = currentUser.clientDB
      clientDB = currentUser.clientDB
    }
    return clientDB
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
      setRegistred(true)
    }
  })

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentUser(prevState => ({ ...prevState, [e.target.id]: e.target.value }))
  }, [])

  const getClientsList = useCallback(() => {
    let clientDB = getClientDatabaseID()
    if (clientDB != null) {
      let body = { databaseID: clientDB }
      axios.post('/api/getClients', body)
        .then(response => {
          setClientsDataList(response.data.clientsList)
          localStorage.setItem('clientsDataList', JSON.stringify(response.data.clientsList))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [getClientDatabaseID])

  const verifyLogin = useCallback(() => {
    usersData.map((users: UserData) => {
      if (currentUser.user == users.user && currentUser.password == users.password) {
        if (users.active == true) {
          setLoginErrorMsg('Usuário já está logado')
        } else {
          clientDatabaseID.current = users.clientDB
          setLoginError(false)
          axios.patch('/api/updateUsers', { id: users.id, active: true })
            .then(() => {
              let body = { databaseID: users.clientDB }
              axios.post('/api/getClients', body)
                .then(response => {
                  setClientsDataList(response.data.clientsList)
                  localStorage.setItem('clientsDataList', JSON.stringify(response.data.clientsList))
                })
                .catch(error => {
                  console.log(error)
                })
              let current = encrypt(users, process.env.DECRYPT_KEY)
              localStorage.setItem('currentUser', JSON.stringify(current))
              setCurrentUser({ id: '', user: '', email: '', password: '', active: true, clientDB: '' })
              userName.current = users.user
              router.push('/dashboard')
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
      else if (currentUser.user == users.user && currentUser.password != users.password) {
        setLoginErrorMsg('Senha incorreta')
      }
    })
  }, [currentUser.password, currentUser.user, encrypt, router, usersData])

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
          setCurrentUser({ id: '', user: '', email: '', password: '', active: false, clientDB: '' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [currentUser, verifySignUp])

  const handleLogout = useCallback(() => {
    usersData.map((users: UserData) => {
      if (userName.current == users.user) {
        axios.patch('/api/updateUsers', { id: users.id, active: false })
          .then(() => {
            userName.current = null
            router.push('/')
          })
          .catch(error => {
            console.log('Error happened: ', error.message)
          })
      }
    })
    localStorage.removeItem('currentUser')
    localStorage.removeItem('clientsDataList')
  }, [router, usersData])




  // CLIENT CONTEXT

  useEffect(() => {
    getClientsList()
    const clientsDataListString = localStorage.getItem('clientsDataList')
    if (clientsDataListString) {
      setClientsDataList(JSON.parse(clientsDataListString))
      if (!updateClient) {
        setId(Date.now())
      }
      else if (updateClient) {
        setId(currentId)
      }
    }
  }, [clientsDataList.length, currentId, getClientsList, updateClient])


  const sortClientsList = useCallback((a: ClientData, b: ClientData) => {
    return a.id - b.id;
  }, [])

  const createClient = useCallback((currentClient: any): any => {
    return {
      id: (currentClient.id).toString(),
      name: currentClient.name,
      cpf: currentClient.cpf,
      email: currentClient.email,
      phone: currentClient.phone,
      adress: currentClient.adress,
      clientDB: clientDatabaseID.current,
    }
  }, [])

  const clearForm = useCallback(() => {
    setName('')
    setCpf('')
    setEmail('')
    setPhone('')
    setAdress('')
  }, [])

  const editClientForm = useCallback((id: number) => {
    clientsDataList.map((client: ClientData) => {
      if (id === client.id) {
        setName(client.name)
        setCpf(client.cpf)
        setEmail(client.email)
        setPhone(client.phone)
        setAdress(client.adress)
      }
    })
  }, [clientsDataList])

  const setClientId = useCallback((newId: number) => {
    setCurrentId(newId)
    editClientForm(newId)
    setUpdateClient(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [editClientForm])

  const removeClient = useCallback((id: number) => {
    clientsDataList.map((client: ClientData) => {
      if (client.id === id) {
        let index = clientsDataList.indexOf(client)
        clientsDataList.splice(index, 1)
        localStorage.setItem('clientsDataList', JSON.stringify(clientsDataList))
      }
    })
    setUpdateTable(!updateTable)
    localStorage.setItem('clientsDataList', JSON.stringify(clientsDataList.sort(sortClientsList)))
  }, [clientsDataList, sortClientsList, updateTable])

  const deleteConfirmation = useCallback((id: number) => {
    Swal.fire({
      title: 'Excluir cadastro?',
      text: "Esta ação é irreversível!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#862bdb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeClient(id)
        Swal.fire(
          'Excluído!',
          'O cadastro foi excluído com sucesso.',
          'success'
        )
      }
    })
  }, [removeClient])

  const handleModifyClientsList = useCallback((e: FormEvent) => {
    e.preventDefault()
    setNewClientError(false)
    setMsgErro('Ocorreu um erro')
    if (updateClient) {
      removeClient(id)
    }
    setId(Date.now())
    let newClient = createClient(currentClient)
    axios.post('/api/setNewClient', newClient)
      .then(() => {
        getClientsList()
        const clientsDataListString = localStorage.getItem('clientsDataList')
        setClientsDataList(JSON.parse(clientsDataListString))
      })
      .catch((error) => {
        console.log(error)
      })
    clearForm()
    setUpdateClient(false)
    localStorage.setItem('clientsDataList', JSON.stringify(clientsDataList.sort(sortClientsList)))
  }, [clearForm, clientsDataList, createClient, currentClient, getClientsList, id, removeClient, sortClientsList, updateClient])



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
        encrypt,
        decrypt,
        verifyLogin,
        handleChange,
        handleLogin,
        verifySignUp,
        handleSignUp,
        handleLogout,
        getUsersData,
        getUserName,
        setUsersData,
        setCurrentUser,
        setLoginError,
        setSignUpError,
        clientsDataList,
        id,
        currentId,
        name,
        cpf,
        email,
        phone,
        adress,
        newClientError,
        updateClient,
        updateTable,
        msgErro,
        setClientsDataList,
        setId,
        setCurrentId,
        setName,
        setCpf,
        setEmail,
        setPhone,
        setAdress,
        setNewClientError,
        setUpdateClient,
        setUpdateTable,
        setMsgErro,
        currentClient,
        clientDatabaseID,
        sortClientsList,
        createClient,
        clearForm,
        setClientId,
        editClientForm,
        deleteConfirmation,
        removeClient,
        handleModifyClientsList,
        getClientDatabaseID,
        getClientsList,
        clientsDataList2,
        registred,
        setRegistred
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
  const getUsersData = useContextSelector(UserContext, user => user.getUsersData)

  return {
    user,
    password,
    loginError,
    loginErrorMsg,
    setLoginError,
    handleChange,
    handleLogin,
    setCurrentUser,
    getUsersData,
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
  const getUsersData = useContextSelector(UserContext, user => user.getUsersData)

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
    setCurrentUser,
    getUsersData
  }
}

export function useNavMenu() {
  const router = useContextSelector(UserContext, user => user.router)
  const userName = useContextSelector(UserContext, user => user.userName)
  const currentRoute = useContextSelector(UserContext, user => user.currentRoute)
  const handleLogout = useContextSelector(UserContext, user => user.handleLogout)
  const getUsersData = useContextSelector(UserContext, user => user.getUsersData)
  const getUserName = useContextSelector(UserContext, user => user.getUserName)

  return {
    router,
    userName,
    currentRoute,
    handleLogout,
    getUsersData,
    getUserName
  }
}

export function useDashboard() {
  const userName = useContextSelector(UserContext, user => user.userName)
  const getUserName = useContextSelector(UserContext, user => user.getUserName)

  return {
    userName,
    getUserName
  }
}

export function useHomeIndex() {
  const router = useContextSelector(UserContext, user => user.router)
  const userName = useContextSelector(UserContext, user => user.userName)
  const getUserName = useContextSelector(UserContext, user => user.getUserName)
  const registred = useContextSelector(UserContext, user => user.registred)
  const setRegistred = useContextSelector(UserContext, user => user.setRegistred)

  return {
    router,
    userName,
    getUserName,
    registred,
    setRegistred
  }
}

export const useClientForm = () => {
  const name = useContextSelector(UserContext, client => client.name)
  const cpf = useContextSelector(UserContext, client => client.cpf)
  const email = useContextSelector(UserContext, client => client.email)
  const phone = useContextSelector(UserContext, client => client.phone)
  const adress = useContextSelector(UserContext, client => client.adress)
  const newClientError = useContextSelector(UserContext, client => client.newClientError)
  const msgErro = useContextSelector(UserContext, client => client.msgErro)
  const setName = useContextSelector(UserContext, client => client.setName)
  const setCpf = useContextSelector(UserContext, client => client.setCpf)
  const setEmail = useContextSelector(UserContext, client => client.setEmail)
  const setPhone = useContextSelector(UserContext, client => client.setPhone)
  const setAdress = useContextSelector(UserContext, client => client.setAdress)
  const handleModifyClientsList = useContextSelector(UserContext, client => client.handleModifyClientsList)
  const clearForm = useContextSelector(UserContext, client => client.clearForm)

  return {
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
    clearForm
  }
}

export function useClientTable() {
  const clientsDataList = useContextSelector(UserContext, client => client.clientsDataList)
  const setClientId = useContextSelector(UserContext, client => client.setClientId)
  const deleteConfirmation = useContextSelector(UserContext, client => client.deleteConfirmation)

  return {
    clientsDataList,
    setClientId,
    deleteConfirmation,
  }
}