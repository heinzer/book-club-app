export interface IUser {
  id: string;
  firstName: string;
  email: string;
  password: string;
  lastName?: string;
  city?: string;
  state?: string;
}

export class User implements IUser {
  id: string = "";
  firstName: string = "";
  email: string = "";
  password: string = "";

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.firstName = name;
    this.email = email;
    this.password = password;
  }
}

export interface LoginResponse extends IUser {
  access_token: string;
}

export interface IClub {
  id: string;
  name: string;
}

export interface ITheme {
  id?: string;
  clubId: string;
  name: string;
  description: string;
  nominatorId: string;
  status: ThemeStatus;
  startDate: string;
  nominationDeadline: string;
  votingDeadline: string;
  readingDeadline: string;
  discussionDeadline: string;
}

export enum ThemeStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
