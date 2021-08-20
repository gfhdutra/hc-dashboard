// Project Interfaces

export interface UserData {
  id: string,
  user: string,
  email: string,
  password: string,
  active: boolean,
  clientDB: string
}
export interface CurrentUser {
  user: string,
  password: string
}
export interface LoginError {
  loginError: boolean
}
export interface SignUpError {
  signUpError: boolean
}
export interface NewClientError {
  newClientError: boolean
}
export interface Route {
  route: string,
  currentRoute: string
}
export interface ClientData {
  id: number,
  name: string,
  cpf: string,
  email: string,
  phone: string,
  adress: string,
}