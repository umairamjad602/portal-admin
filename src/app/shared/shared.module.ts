import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullViewComponent } from './components/full-view/full-view.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormErrorWrapperComponent } from './form-error-wrapper/form-error-wrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { Select2StructDirective } from './directives/select2struct.directive';

@NgModule({
  declarations: [
    FullViewComponent,
    HeaderComponent,
    NavigationComponent,
    FormErrorWrapperComponent,
    FooterComponent,
    Select2StructDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FullViewComponent,
    FormErrorWrapperComponent,
    HeaderComponent,
    NavigationComponent,
    Select2StructDirective
  ],
  entryComponents: [
    NavigationComponent
  ]
})
export class SharedModule { }
