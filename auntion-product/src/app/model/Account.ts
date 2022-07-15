export interface Account {
  idAccount: number;
  username: string;
  password: string;
  isBlock: boolean;
  last_login: string;
  flagDelete: boolean;
  roles: any[];
  member: any;
}
