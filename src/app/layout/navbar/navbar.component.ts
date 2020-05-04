import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() myUser: UserModel;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe((data: UserModel) => {
      this.myUser = data;
    });
  }

}
