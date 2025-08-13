import { AxiosResponse } from "axios";
import { AUTH_URLS } from "../../../shared/model/constants/axiosConstants";
import { AuthTokenResponse, Available, IUserAuth, UserProfile } from "../../../shared/model/types/userTypes";
import { usersInstance } from "../usersIndex";


export class UsersService {
  static async authorization(authDataUser: IUserAuth): Promise<AxiosResponse<AuthTokenResponse>> {
    return usersInstance.post(AUTH_URLS.USER_AUTHORIZATION_URL, authDataUser)
  }

  static async registration(userProfile: IUserAuth): Promise<AxiosResponse<UserProfile>> {
    return usersInstance.post(AUTH_URLS.CREATE_USER, userProfile)
  }

  static async checkAuth(email: IUserAuth): Promise<AxiosResponse<Available>> {
    return usersInstance.post(AUTH_URLS.CHECK_USER_AUTH, email)
  }
  static async getProfile(): Promise<AxiosResponse<UserProfile>> {
    return usersInstance.get<UserProfile>(AUTH_URLS.GET_USER_PROFILE_URL)
  }
} 