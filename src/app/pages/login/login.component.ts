import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {UserModel} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy  {

  loginSub: Subscription;
  myControl = new FormControl();
  expiredToken: boolean;
  constructor(private authService: AuthenticationService,  private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const params: any = this.route.snapshot.queryParams;
    if (params.refresh) {
      this.expiredToken = true;
    }
  }

  login(){
    if (this.myControl.value !== ''){
      this.loginSub = this.authService.login(this.myControl.value)
        .pipe(first())
        .subscribe(
        (data: UserModel) => {
          this.router.navigate(['/home']);
        },
        error => {
          this.myControl.reset();
          this.authService.logout();
          alert(error.error.error.message);
        }
      );
    }
  }

  ngOnDestroy() {
    // tslint:disable-next-line:no-unused-expression
    this.loginSub ? this.loginSub.unsubscribe() : '';
  }

}
