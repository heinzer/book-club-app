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
  id?: number;
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

export interface NominateBookRequest {
  themeId: string;
  nominatorId: string;
  workId: string;
  triggerWarnings: string;
}

export interface IBook {
  externalBookData: IExternalBookData;
  nomination: INominationEntity;
  book: IBookEntity;
}

export interface IExternalBookData {
  covers: number[]
}

export interface INominationEntity {
  id: number;
  themeId: string;
  bookId: number;
  nominatorId: string;
}

export interface IBookEntity {
  id: number;
  workId: string;
  triggerWarnings: string;
}

export interface IOpenLibraryResponse {
  docs: IOpenLibraryDocument[];
  numFound: number;
  numFoundExact: boolean;
  num_found: number;
  q: string;
  start: number;
}

export interface IOpenLibraryDocument {
  author_name: string[]
  cover_i: number
  first_publish_year: number
  key: string
  number_of_pages_median: number
  subject: string[]
  title: string
  type: string
}
