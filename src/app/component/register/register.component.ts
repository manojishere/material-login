import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/shared/validators/custom-validators';
import { DateValidator } from 'src/app/shared/validators/date-validator';

function passwordMatcher( c: AbstractControl ) : { [ key : string ] : boolean } | null {
  const password = c.get( 'password' );
  const confirmPassword = c.get( 'confirmPassword' );
  console.log('password : ' + password?.value );
  console.log('confirmPassword : ' + confirmPassword?.value );

  if( password?.pristine === confirmPassword?.pristine ){
    return null;
  }

  if( password?.value === confirmPassword?.value ){
    return null;
  }
  return{ 'misMatch' : true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  Roles: any = [ 'Admin', 'Author', 'Reader' ];
  userCreated: User = new User();
  minDate: Date;
  maxDate: Date;
  //@ViewChild('secondDialog') secondDialog: TemplateRef<any> | any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor( private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    private router : Router,
    private dialog : MatDialog ) { 
    const currentYear = new Date().getFullYear();
    const todaysDate = new Date();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date( todaysDate );
  }

/*
  ngOnInit() {
    this.form = this.formBuilder.group({
      userName : [null,[Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      firstName : [null,[Validators.required]],
      lastName : [null, [Validators.required]],
      dateOfBirth : [null,[DateValidator.required]],
      matching_passwords : this.formBuilder.group({
        password : [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
        confirmPassword: [null, Validators.required],
      }, { validator : passwordMatcher } ),
      email : [null, [Validators.required, Validators.email]],
      role : [null, [Validators.required]]
    })
  }
  */

  ngOnInit() {
    this.form = this.formBuilder.group({
      userName : [null,[Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      firstName : [null,[Validators.required]],
      lastName : [null, [Validators.required]],
      dateOfBirth : [null,[DateValidator.required]],
      password : [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: [null, Validators.required],
      email : [null, [Validators.required, Validators.email]],
      role : [null, [Validators.required]]
    }, { validator: MustMatch("password", "confirmPassword") } )
  }


  onSubmit(){
    console.log('RegisterComponent onSubmit :' + this.form.value)
    this.userCreated = Object.assign( this.userCreated, this.form.value);
    this.clearAllData();
    console.log('userCreated : ' + this.userCreated.email);
    localStorage.setItem('user', JSON.stringify( this.userCreated ) ); 
    this.authService.add( this.userCreated );
    this.authService.userList.subscribe( (data : User[] ) =>{
      console.log('inside register total users : ' + data.length );
      this.openSnackBar( "Registration Successful", "Login" );
      /*
      this.openSnackBar( "Registration Successful", "Login" ).onAction().subscribe( () =>{
        this.router.navigate(['/login']);
      });
      */
      //this.router.navigateByUrl('/login');
    });
  }

  openSnackBar(message: string, action: string)  : MatSnackBarRef<SimpleSnackBar>{
    let snack = this._snackBar.open( message, action,  {duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snackbar'
    });
    //let snack = this._snackBar.open( message, action,  {duration: 5000, panelClass: 'snackbar'});
    snack.afterDismissed().subscribe(() => {
      console.log("This will be shown after snackbar disappeared");
      
      this.router.navigate(['/login']);
    });
    snack.onAction().subscribe(() => {
      console.log("This will be called when snackbar button clicked");
      this.router.navigate(['/login']);
    });
    return snack;
  } 
  
  clearAllData(){
    this.form.disable();
  }

  /*
  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(message, action, { 
      duration: 5000,
    })
  }
  */  

  /*
  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }
  openOtherDialog() {
    this.dialog.open(this.secondDialog);
  } 
   

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //this.dialog.open( RegisterSuccessDialogComponent, dialogConfig );
  }
  */

}

