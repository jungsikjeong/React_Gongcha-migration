export interface IUserInfo {
  avatar: string;
  commentCount: number;
  date: string;
  email: string;
  nickname: string;
  postCount: number;
  __v: number;
  _id: string;
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
