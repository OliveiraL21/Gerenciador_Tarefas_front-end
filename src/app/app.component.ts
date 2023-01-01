import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isLogin: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    let url = this.router.url.split('/');
    if (url[0] == '' || url[0] == 'login') {
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }
}
