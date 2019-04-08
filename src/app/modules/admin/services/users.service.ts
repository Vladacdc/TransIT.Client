import { Injectable } from '@angular/core';
import {User} from '../models/user/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  formData: User;
  userItems: User[] = [];
  constructor() { }
}
