import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from '@app/shared/models/navigation';
declare const $:any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public ready = false;
  public navigation = NAVIGATION;

  constructor(
  ) { }

  ngOnInit(): void {
    this.ready = true;
  }

}
