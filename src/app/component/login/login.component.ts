import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  loginInvalid:boolean= false;
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective | undefined;

  constructor( private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName : [null,[Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      password : ['']
    });
    this.toastrService.overlayContainer = this.toastContainer;

  }


  message: string = "";
  onSubmit() {
    this.loginInvalid = false;
    const userName = this.form.get( 'userName' )?.value;
    const password = this.form.get( 'password' )?.value;
    console.log(this.form.value);

    this.authService.login( userName, password );

    this.authService.user.subscribe( (data : User ) => {
      if( data.email ){
        console.log('login success');
        //this.toastrService.success("Login Success", "Have Fun",{progressBar:true, closeButton: true});
        //this.router.navigate(['\dashboard']);

      }else{
        console.log('login failed');
        //this.toastrService.error("Login Failed","",{progressBar:true, closeButton: true})
        this.loginInvalid = true;
        this.message = "Login failed";
      }
    });
  }

}
