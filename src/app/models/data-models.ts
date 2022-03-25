export interface IUser {
  id: number;
  firstName: string;
  email: string;
  password: string;
  lastName?: string;
  city?: string;
  state?: string;
}

export interface IUserMembership extends IUser {
  isAdmin: boolean;
}

export interface LoginResponse {
  access_token: string;
}

export interface IClub {
  id: number;
  name: string;
}

export interface IClubMembership extends IClub {
  isAdmin: boolean;
}

export interface ITheme {
  id?: number;
  clubId: number;
  name: string;
  description: string;
  nominatorId: number;
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
