import { CHECK_USER_AUTH } from './../../constants/axiosConstants';
import { AxiosResponse } from "axios";
import { CREATE_USER, GET_USER_PROFILE_URL, USER_AUTHORIZATION_URL } from "../../constants/axiosConstants";
import { AuthTokenResponse, Available, ICheckAuth, IUser, IUserAuth, UserProfile } from "../../types/userTypes";
import { usersInstance } from "../usersIndex";


export class UsersService {
  static async authorization(authDataUser: IUserAuth): Promise<AxiosResponse<AuthTokenResponse>> {
    return usersInstance.post(USER_AUTHORIZATION_URL, authDataUser)
  }

  static async registration(userProfile: IUserAuth): Promise<AxiosResponse<UserProfile>> {
    return usersInstance.post(CREATE_USER, userProfile)
  }

  static async checkAuth(email: IUserAuth): Promise<AxiosResponse<Available>> {
    return usersInstance.post(CHECK_USER_AUTH, email)
  }
  static async getProfile(): Promise<AxiosResponse<UserProfile>> {
    return usersInstance.get<UserProfile>(GET_USER_PROFILE_URL)
  }
} 