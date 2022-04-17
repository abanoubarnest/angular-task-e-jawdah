import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/authentication/auth.service';
import { LoginData } from '../../../../shared/models/login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordToggle: boolean = false;
  submitted: boolean = false;
  loginForm!: FormGroup;
  returnUrl!: string;
  error!: string;
  login:LoginData={email:'',password:''}
  constructor(  private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,private toastr: ToastrService,) {
  //  this.loginForm = this.initLoginForm();
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      this.returnUrl = params.returnUrl || '/';
    });
  }

  // initLoginForm() {
  //   return this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required]],
  //   });
  // }
  onSubmit() {
    this.authenticationService.login(this.login)
    .then((result) => {
      if (result) {
         // this.toastr.success('login successfully')
    
          this.authenticationService.SetUserData(result.user);
          this.router.navigateByUrl(this.returnUrl);
        

      }
      //   this.auth.SetUserData(result.user);
    }).catch((error) => {
      this.toastr.error(error.message)
    })
  }
}
