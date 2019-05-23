import { Injectable } from '@angular/core';
import { LoginGuard } from './login.guard';
import { Role } from '../models/role/role';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard extends LoginGuard {
  protected expectedRole: Role = 'ADMIN';
}
