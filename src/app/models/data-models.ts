export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName?: string;
  city?: string;
  state?: string;
}

export class User implements IUser {
  name: string = "";
  email: string = "";
  password: string = "";

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export interface RegistrationResponse extends IUser {
  access_token: string;
}

export interface IClub {
  id: string;
  name: string;
}
