export interface IUser {
  id: string;
  firstName: string;
  email: string;
  password: string;
  lastName?: string;
  city?: string;
  state?: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface IClub {
  id: string;
  name: string;
}

export interface IClubMembership extends IClub {
  isAdmin: boolean;
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
