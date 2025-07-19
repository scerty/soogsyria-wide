export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
}