import { User } from '../user/user';

export class Token {
  refreshToken: string;
  accessToken: string;
  user: User;
}
