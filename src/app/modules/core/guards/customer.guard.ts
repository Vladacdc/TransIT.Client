import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { LoginGuard } from './login.guard';
import { Role } from '../models/role/role';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard extends LoginGuard {
  protected expectedRole: Role = 'CUSTOMER';
}
