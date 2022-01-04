import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter();
  isUserLoggedIn: boolean = false;

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.user.subscribe(( x: User)=>{
      console.log('In toolbar component user email : ' + x.email);
      if( x.email){
        this.isUserLoggedIn = true;
      }else{
        this.isUserLoggedIn = false;
      }
    })    
  }

  logOut(){
    //console.log('user logged out before : ' + this.isUserLoggedIn);
    this.authService.logout();
    // this.isUserLoggedIn = false;
    //console.log('user logged out after : ' + this.isUserLoggedIn);
    this.router.navigate(['\login']);
  }

}
