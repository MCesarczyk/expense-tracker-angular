import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    readonly authService = inject(AuthService);
    readonly router = inject(Router);

    user$ = this.authService.userData$;

    logout() {
        this.authService.logoutUser();
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.authService.loadToken();
        if (this.authService.isTokenExpired()) {
            this.logout();
        };
    }
}
