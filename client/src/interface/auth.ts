export interface IUserInfo {
  avatar: string;
  date: string;
  email: string;
  nickname: string;
  postLikes: string[];
  introduction: string;
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

export type AuthorType = {
  avatar: string;
  nickname: string;
  _id: string;
};

export interface IEditMyProfile {
  nickname?: string;
  password?: string;
  password2?: string;
  introduction?: string;
}
