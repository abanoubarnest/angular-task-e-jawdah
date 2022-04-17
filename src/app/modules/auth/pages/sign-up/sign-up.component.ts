import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/auth.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { LoginData } from '../../../../shared/models/login-data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  confirmPasswordToggle: boolean = false;
  oldPasswordToggle: boolean = false;
  newPasswordToggle: boolean = false;
  newPasswordConfirmToggle: boolean = false;
  userForm!: FormGroup;
  submitted: boolean = false;
  compLifeSub!: Subject<any>;
  loading: boolean = false;
  // user: User;
  title = 'Register User';
  constructor(private fb: FormBuilder,
    private router: Router,
    public ngZone: NgZone,
    private auth: AuthenticationService,
    private toastr: ToastrService,) {
    this.userForm = this.initUserForm();
  }

  ngOnInit(): void {
  }
  initUserForm() {
    let patternPassword: any = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
    return this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(patternPassword)]],
        password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: ValidationService.MustMatch('password', 'password_confirmation'),
      }
    );
  }
  back() {
    this.router.navigate(['auth']);

  }
  submit() {
    if (this.userForm.valid) {
      this.registerUser(this.userForm.value)


    }

  }
  registerUser(body: LoginData) {
    this.auth.register(body).then((result) => {
      if (result) {
        this.toastr.success('User added successfully')
        this.ngZone.run(() => {
       //   this.auth.SetUserData(result.user);
       this.auth.logout()
        });

      }
      //   this.auth.SetUserData(result.user);
    }).catch((error) => {
      this.toastr.error(error.message)
    })
  }
  get firstName() {
    return this.userForm.get('firstName')

  }
  get email() {
    return this.userForm.get('email')

  } 
  get password() {
    return this.userForm.get('password')
  }
  get password_confirmation() {
    return this.userForm.get('password_confirmation')
  }
}
