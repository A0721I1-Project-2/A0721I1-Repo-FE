export interface Account {
  idAccount: number;
  username: string;
  password: string;

  isBlock: boolean;

  block: boolean;
  last_login: string;
  flagDelete: boolean;
  member: any;
  roles: any;
}
