
export interface IUserAuth {
  email?: string;
  password?: string;
  name?: string
  avatar?: string
}

export interface Available {
  isAvailable: boolean
}

export interface IUser {
  email: string
  password: string
  name: string
  avatar: string
}

export interface UserProfile {
  id: number | null
  email: string
  password: string
  name: string
  avatar: string
  creationAt: string | null
  updatedAt: string | null
}

export interface AuthTokenResponse {
  access_token: string;
  refresh_token: string;
}