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

  private constraints = {
    login: {
      minlength: 3
    },
    password: {
      minlength: 8,
      maxlength: 30
    }
  };

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(this.constraints.login.minlength),
        Validators.pattern('^[A-Za-z0-9]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.constraints.password.minlength),
        Validators.maxLength(this.constraints.password.maxlength)
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
