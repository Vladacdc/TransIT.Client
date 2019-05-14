import { Token } from '../models/token/token';

export class ChannelMessage {
  command: 'cleanStorage' | 'getStorage' | 'shareStorage';
  token: Token;
}
