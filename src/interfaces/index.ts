// Project Interfaces

export interface UserData {
  id: string,
  user: string,
  email: string,
  password: string,
  active: boolean
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