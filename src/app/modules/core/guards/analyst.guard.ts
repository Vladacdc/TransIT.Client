import { Injectable } from '@angular/core';
import { LoginGuard } from './login.guard';
import { Role } from '../models/role/role';

@Injectable({
  providedIn: 'root'
})
export class AnalystGuard extends LoginGuard {
  protected expectedRole: Role = 'ANALYST';
}
