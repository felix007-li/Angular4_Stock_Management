import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus:Array<Menu>;

  currentMenuId:number;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.menus = [
      new Menu(1,'Home','dashboard'),
      new Menu(2,'Stock Management','stock')
    ];
  }

  nav(menu: Menu) {
    this.router.navigateByUrl(menu.link);

    this.currentMenuId = menu.id;
  }

}

export class Menu {
  constructor(public id: number,
              public name: string,
              public link: string) {

  }
}
