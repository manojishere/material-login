import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  showFiller = false;
  public isSmallScreen: boolean | any;
  loggedUser: User | any;
  users: User[] =[];
  user: User = new User();
  isUserLoggedIn: boolean = false;
  @ViewChild('sidenav') sidenav: any;

  constructor( private breakpointObserver: BreakpointObserver,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.breakpointObserver
      //.observe( Breakpoints.Small)
      .observe( [`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`] )
      .subscribe( (state: BreakpointState) => {
        this.isSmallScreen = state.matches;
      } )

      /*
      this.loggedUser = this.authService.user;
      this.authService.loadUser();
      console.log('logged user : ' + this.loggedUser.);
      */

     this.authService.getUsers().subscribe(
       (data:User[])=>{
        this.users = data;
        this.users.forEach((x:User)=>{
          console.log(x.firstName);
        });
        this.loggedUser = this.users.find( (x:User )=> x.userName === this.user.userName && x.password === this.user.password );
        console.log( 'loggedUser : ' + this.loggedUser);

       },
       (error:any)  =>{
         console.log('Error occured just : ' + error);
        }
     )

     this.authService.user.subscribe(( x: User)=>{
        console.log('Side nav component  user email : ' + x.email);
        console.log('Side nav component isUserLoggedIn : ' + this.isUserLoggedIn);
        if( x.email){
          this.isUserLoggedIn = true;
        }else{
          this.isUserLoggedIn = false;
        }
      })

  }

  handleIt():void {
    console.log('handling click');

  }

}
