import { Role } from '../role/role';

export class TokenPayload {
  login: string;
  role: Role;
  sub: string;
  jti: string;
  iat: number;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}
