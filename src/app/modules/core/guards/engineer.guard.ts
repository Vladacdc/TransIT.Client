import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EngineerGuard implements CanActivate {
  constructor(private service: AuthenticationService) {}

  canActivate(): boolean {
    return this.service.getRole() === 'ENGINEER';
  }
}
