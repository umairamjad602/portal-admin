import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { UsersService } from '@app/core/service/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public loggedUserName: string | undefined = '';

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.fetchProfile();
  }
  clk() {
  }

  public logout() {
    try {
      this.authService.logout();
    } catch (error: any) {
      Swal.fire('Oops!', error, 'error');
    }
  }

  private async fetchProfile() {
    try {
      const response = await this.usersService.fetchMyProfileAsync();
      this.loggedUserName = response.profile?.first_name + ' ' +response.profile?.last_name;
    } catch (error: any) {
      Swal.fire('Oops!', error, 'error');
    }
  }
}
