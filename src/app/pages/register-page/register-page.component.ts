import { Component } from '@angular/core';
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [UserFormComponent, RouterLink],
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent { }
