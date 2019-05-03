import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { matchPassword } from 'src/app/custom-errors';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restore-user-password',
  templateUrl: './restore-user-password.component.html',
  styleUrls: ['./restore-user-password.component.scss']
})
export class RestoreUserPasswordComponent implements OnInit {
  userForm: FormGroup;
  @ViewChild('close') closeRestoreModal: ElementRef;
  @Input() selectedUser;

  constructor(private formBuilder: FormBuilder, private serviceUser: UserService, private toast: ToastrService) {}

  ngOnInit() {
    $('#restoreModal').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });

    this.userForm = this.formBuilder.group(
      {
        id: '',
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
      },
      { validators: matchPassword }
    );
  }
  updatePassword() {
    if (this.userForm.invalid) {
      return;
    }
    this.selectedUser.password = this.userForm.value.password;
    this.serviceUser.updateEntity(this.selectedUser).subscribe(
      _ => {
        this.toast.success('', 'Пароль змінено');
      },
      error => this.toast.error('Помилка')
    );
    this.closeRestoreModal.nativeElement.click();
  }
}
