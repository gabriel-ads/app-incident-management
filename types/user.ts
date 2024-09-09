export interface User {
  id: number
  name: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
}

export interface RegisterResponse {
  status: boolean
  user: User
  message: string
}

export interface LoginResponse {
  access_token: string
  expires_in: number
  status: boolean
  token_type: string
}
