import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userAuthenticationListenerSubscription: Subscription;
  userIsAuthenticated: boolean = false;

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userAuthenticationListenerSubscription = this.loginService.getUserAuthenticationSubject().subscribe(
      userIsAuthenticated => {
        this.userIsAuthenticated = userIsAuthenticated;
      }
    );
  }

  ngOnDestroy() {
    this.userAuthenticationListenerSubscription.unsubscribe();
  }

  onLogout() {
    this.loginService.logout();
  }

}
