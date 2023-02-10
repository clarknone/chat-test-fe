import { IUser } from "../user";

export interface ITopicForm {
  title: string;
}

export interface ITopic {
  title: string;
  _id: string;
}
export interface IInvite {
  _id?: string;
  email: string;
  fullname: string;
  topic: ITopic;
}

export interface IInviteForm {
  email: string;
  fullname: string;
  topic: string;
}

export interface IChatFile {
  _id?: string;
  type?: string;
  url?: string;
  format?: string;
}

export interface IChatForm {
  invite?: string;
  user?: string;
  message?: string;
  topic: string;
  file?: string;
}
export interface IChatFilter {
  topic: string;
}


export interface IChat {
  _id?: string;
  user?: IUser;
  topic: ITopic;
  invite?: IInvite;
  message: string;
  file?: IChatFile;
}
