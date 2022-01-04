import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-account-info-tab',
  templateUrl: './account-info-tab.component.html',
  styleUrls: ['./account-info-tab.component.scss']
})
export class AccountInfoTabComponent implements OnInit {

  @Input() currentUser: User | undefined ;

  constructor() { }

  ngOnInit(): void {
  }

}
