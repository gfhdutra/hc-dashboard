import {
  createContext,
  useState,
  ReactNode,
  useContext,
  FormEvent,
  useEffect,
} from 'react'


type ClientData = {
  id: number,
  name: string,
  cpf: string,
  email: string,
  phone: string,
  adress: string,
}

type ClientContextData = {
  clientsDataList: ClientData[],
  clientsDataListOrdered: ClientData[],
  id: number,
  name: string,
  cpf: string,
  email: string,
  phone: string,
  adress: string,
  newClientError: boolean,
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
  setMsgErro: any;
  sortClientsList: (a, b) => number,
  createClient: (
    id: number,
    name: string,
    cpf: string,
    email: string,
    phone: string,
    adress: string
  ) => ClientData
  clearForm: () => void,
  setClientId: (newId: number) => void,
  editClientForm: (id) => void,
  verifyNewClient: () => void,
  handleModifyClientsList: (e: FormEvent) => void,
}

type ClientContextProviderProps = {
  children: ReactNode,
}

export const ClientContext = createContext({} as ClientContextData);

export function ClientContextProvider({ children }: ClientContextProviderProps) {
  const [clientsDataList, setClientsDataList] = useState([])
  const [id, setId] = useState(0)
  const [currentId, setCurrentId] = useState(undefined)
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [adress, setAdress] = useState('')
  const [newClientError, setNewClientError] = useState(false)
  const [updateClient, setUpdateClient] = useState(false)
  const [msgErro, setMsgErro] = useState('Ocorreu um erro')

  useEffect(() => {
    const clientsDataListString = localStorage.getItem('clientsDataList')
    if (clientsDataListString) {
      setClientsDataList(JSON.parse(clientsDataListString))
      if (!updateClient) {
        setId(clientsDataList.length)
      } 
      else if (updateClient) {
        setId(currentId)
      }
    }
  }, [clientsDataList.length, currentId, updateClient])


  function sortClientsList(a, b) {
    return a.id - b.id;
  }
  let clientsDataListOrdered = clientsDataList.sort(sortClientsList)

  function createClient(
    id: number,
    name: string,
    cpf: string,
    email: string,
    phone: string,
    adress: string,
  ): ClientData {
    return {
      id: id,
      name: name,
      cpf: cpf,
      email: email,
      phone: phone,
      adress: adress,
    }
  }

  function clearForm() {
    setName('')
    setCpf('')
    setEmail('')
    setPhone('')
    setAdress('')
  }

  function editClientForm(id) {
    clientsDataList.map((client) => {
      if (id === client.id) {
        setName(client.name)
        setCpf(client.cpf)
        setEmail(client.email)
        setPhone(client.phone)
        setAdress(client.adress)
      }
    })
  }

  function setClientId(newId: number) {
    editClientForm(newId)
    clientsDataList.map(client => {
      if (client.id == newId) {
          let index = clientsDataList.indexOf(client)
          clientsDataList.splice(index, 1)
          localStorage.setItem('clientsDataList', JSON.stringify(clientsDataList))
      }})
    setUpdateClient(true)
  }

  function verifyNewClient() {
    clientsDataList.map((client) => {
      if (phone == client.phone) {
        setMsgErro('Telefone já cadastrado')
        setNewClientError(true)
      }
      if (email == client.email) {
        setMsgErro('E-mail já cadastrado')
        setNewClientError(true)
      }
      if (cpf == client.cpf) {
        setMsgErro('CPF já cadastrado')
        setNewClientError(true)
      }
    })
  }

  function handleModifyClientsList(e: FormEvent) {
    e.preventDefault()
    setNewClientError(false)
    setMsgErro('Ocorreu um erro')
    // verifyNewClient()
    if (!newClientError) {
      clientsDataList.push(createClient(
        id,
        name,
        cpf,
        email,
        phone,
        adress))
      localStorage.setItem('clientsDataList', JSON.stringify(clientsDataList))
      clearForm()
    }
    setUpdateClient(false)
    localStorage.setItem('clientsDataList', JSON.stringify(clientsDataList.sort(sortClientsList)))
  }


  return (
    <ClientContext.Provider
      value={{
        clientsDataList,
        clientsDataListOrdered,
        id,
        name,
        cpf,
        email,
        phone,
        adress,
        newClientError,
        msgErro,
        sortClientsList,
        setClientsDataList,
        setId,
        setName,
        setCpf,
        setEmail,
        setPhone,
        setAdress,
        setNewClientError,
        setMsgErro,
        createClient,
        clearForm,
        setCurrentId,
        setClientId,
        editClientForm,
        verifyNewClient,
        handleModifyClientsList,
      }}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  return useContext(ClientContext);
}