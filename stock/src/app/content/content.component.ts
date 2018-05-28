import {Component, OnInit} from "@angular/core";
import {NavigationCancel, NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  pageTitle = '';

  pageDesc = '';

  constructor(public router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd) => {
        if(event.url == '/dashboard'){
          this.pageTitle = 'Home Page';
          this.pageDesc = '';
        }else if(event.url.startsWith('/stock')){
          this.pageTitle = 'Stock Management';
          this.pageDesc = 'Adding Deletion Modification Searching';
        }
      });
  }

  ngOnInit() {
  }

}
