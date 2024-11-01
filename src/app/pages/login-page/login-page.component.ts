import { Component } from '@angular/core';
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [UserFormComponent, RouterLink],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {}
