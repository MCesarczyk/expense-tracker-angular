import { Component } from '@angular/core';
import { UserFormComponent } from "../../components/user-form/user-form.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {}
