import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  user: User | undefined;
  constructor( private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.authService.user.subscribe( (data: User ) => {
       this.user = data });
  }

}
