export interface IUserInfo {
  id: string;
  nickname: string;
  email: string;
  avatar: string;
  token: string;
}

export interface IRegister {
  email: string;
  nickname: string;
  password: string;
  password2: string;
}

export interface ILogin {
  email: string;
  password: string;
}
