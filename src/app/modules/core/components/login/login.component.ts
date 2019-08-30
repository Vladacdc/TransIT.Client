import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LOGIN_ERRORS } from 'src/app/custom-errors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  CustomLoginErrorMessages = LOGIN_ERRORS;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z0-9]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { login, password } = this.loginForm.value;
    this.authService.login(login, password).subscribe(null, error => {
      this.loginForm.controls.login.setErrors({incorrect: true});
      this.loginForm.controls.password.setErrors({incorrect: true});
    });
  }
}
