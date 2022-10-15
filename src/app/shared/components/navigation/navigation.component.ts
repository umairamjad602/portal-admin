import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '@app/shared/services/dynamic-script-loader.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public ready = false;

  constructor(
    private dynamicScriptLoaderService: DynamicScriptLoaderService
  ) { }

  ngOnInit(): void {
    this.dynamicScriptLoaderService.load(['scrollbar', 'scrollable']).then(
      () => {
        this.ready = true;
      }
    )
  }

}
