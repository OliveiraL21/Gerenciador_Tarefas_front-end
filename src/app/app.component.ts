import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe(({ url }: any) => {
      const appUrl = url.split('/')[1];
      console.log(appUrl);
      switch (appUrl) {
        case '/':
          this.isLogin = true;
          break;
        case 'login':
          this.isLogin = true;
          break;
        case '':
          this.isLogin = true;
          break;

        default:
          this.isLogin = false;
      }
    });
    // let url = this.router.url.split('/');
    // console.log(url);
    // if (url[0] == 'login') {
    //   this.isLogin = true;
    // }
    // else {
    //   this.isLogin = false;
    // }
  }
}
