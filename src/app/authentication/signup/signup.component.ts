import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationDataService } from '@app/core/service/application-data.service';
import { ProfileService } from '@app/core/service/profile.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  isLoading = false;
  public httpProcess = false;
  public hasErrors = false;
  public errorsList: string[] = [];


  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private applicationDataService: ApplicationDataService,
    protected profileService: ProfileService) {
  }

  ngOnInit() {
    this.createForm();
  }

  public async signup() {
    this.isLoading = true;
    try {
      const registration  = await this.profileService.registerAsync(this.signupForm?.value);
      this.router.navigate(['login'], {
          state: registration,
          queryParams: {
              signup: 'done'
      }});
      this.hasErrors = false;
    } catch (errorResponse: any) {
        this.errorsList = this.applicationDataService.getRequestErrors(errorResponse);
    }
    this.isLoading = false;
  }

  private createForm() {
    this.signupForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }
}
