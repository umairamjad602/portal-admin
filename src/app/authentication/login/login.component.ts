import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { AbstractBaseComponent } from '@app/core/class/abstract.base.omponent';
import { Credentials } from '@app/core/model/authentication.model';
import { ProfileService } from '@app/core/service/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AbstractBaseComponent implements OnInit {
  public loginForm: FormGroup;
  public resetPasswordForm: FormGroup;
  public paymentNeeded = false;
  public accountSignupEmailSent = false;
  public loginFormData: { email: string; password: string };

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.createForm();
    this.createResetPasswordForm();
    const params = this.router.parseUrl(this.router.url).queryParams;
    if (!!params.signup && params.signup === 'done') {
      this.accountSignupEmailSent = true;
    }
    this.ready = true;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  private createResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  public async login() {
    this.httpProcessStart();
    this.loadingStart();
    this.loginFormData = this.loginForm.value;
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: (cred: any)=> this.onLoggedIn(cred),
      error: (error: any)=> this.onLoginError(error)
    });
  }

  private onLoggedIn(credentials: Credentials) {
    this.profileService.getProfileAsync().then(() => {
      this.router.navigate(['/app/inbox'], { replaceUrl: true });
    });
  }

  private onLoginError(error: any) {
    this.httpProcessEnd();
    this.loadingFinished();
  }
}
