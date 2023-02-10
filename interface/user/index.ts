export interface IUser {
  fullname: string;
  _id?: string;
  email: string;
  avatar?: string;
}
export interface IUserForm {
  fullname: string;
  avatar?: File;
}
