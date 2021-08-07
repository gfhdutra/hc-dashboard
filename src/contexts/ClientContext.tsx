import {
  createContext,
  useState,
  ReactNode,
  useContext,
  FormEvent,
  useEffect,
} from 'react'
import Swal from 'sweetalert2'


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
  sortClientsList: (a: ClientData, b: ClientData) => number,
  createClient: (currentClient: ClientData) => ClientData
  clearForm: () => void,
  setClientId: (newId: number) => void,
  editClientForm: (id: number) => void,
  verifyNewClient: () => void,
  deleteConfirmation: (id: number) => void,
  removeClient: (id: number) => void,
  handleModifyClientsList: (e: FormEvent) => void,
}

type ClientContextProviderProps = {
  children: ReactNode,
}

export const ClientContext = createContext({} as ClientContextData);

export function ClientContextProvider({ children }: ClientContextProviderProps) {
  const [clientsDataList, setClientsDataList] = useState<ClientData[]>([])
  const [id, setId] = useState(Date.now())
  const [currentId, setCurrentId] = useState(Number)
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [adress, setAdress] = useState('')
  const [newClientError, setNewClientError] = useState(false)
  const [updateClient, setUpdateClient] = useState(false)
  const [updateTable, setUpdateTable] = useState(false)
  const [msgErro, setMsgErro] = useState('Ocorreu um erro')
  const currentClient: ClientData = {id, name, cpf, email, phone, adress}

  useEffect(() => {
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
  }, [clientsDataList.length, currentId, updateClient, updateTable])


  function sortClientsList(a: ClientData, b: ClientData) {
    return a.id - b.id;
  }

  function createClient(currentClient: ClientData): ClientData {
    return {
      id: currentClient.id,
      name: currentClient.name,
      cpf: currentClient.cpf,
      email: currentClient.email,
      phone: currentClient.phone,
      adress: currentClient.adress,
    }
  }

  function clearForm() {
    setName('')
    setCpf('')
    setEmail('')
    setPhone('')
    setAdress('')
  }

  function setClientId(newId: number) {
    setCurrentId(newId)
    editClientForm(newId)
    setUpdateClient(true)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  function editClientForm(id: number) {
    clientsDataList.map((client: ClientData) => {
      if (id === client.id) {
        setName(client.name)
        setCpf(client.cpf)
        setEmail(client.email)
        setPhone(client.phone)
        setAdress(client.adress)
      }
    })
  }

  function verifyNewClient() {
    clientsDataList.map((client: ClientData) => {
      if (phone === client.phone) {
        setMsgErro('Telefone já cadastrado')
        setNewClientError(true)
      }
      if (email === client.email) {
        setMsgErro('E-mail já cadastrado')
        setNewClientError(true)
      }
      if (cpf === client.cpf) {
        setMsgErro('CPF já cadastrado')
        setNewClientError(true)
      }
    })
  }

  function deleteConfirmation(id: number) {
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
  }

  function removeClient(id: number) {
    clientsDataList.map((client: ClientData) => {
      if (client.id === id) {
          let index = clientsDataList.indexOf(client)
          clientsDataList.splice(index, 1)
          localStorage.setItem('clientsDataList', JSON.stringify(clientsDataList))
      }})
    setUpdateTable(!updateTable)
    localStorage.setItem('clientsDataList', JSON.stringify(clientsDataList.sort(sortClientsList)))
  }

  function handleModifyClientsList(e: FormEvent) {
    e.preventDefault()
    setNewClientError(false)
    setMsgErro('Ocorreu um erro')
    // verifyNewClient()
    if (updateClient) {
      removeClient(id)
    }
    if (!newClientError) {
      setId(Date.now())
      clientsDataList.push(createClient(currentClient))
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
        sortClientsList,
        createClient,
        clearForm,
        setClientId,
        editClientForm,
        verifyNewClient,
        deleteConfirmation,
        removeClient,
        handleModifyClientsList,
      }}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = () => {
  return useContext(ClientContext);
}