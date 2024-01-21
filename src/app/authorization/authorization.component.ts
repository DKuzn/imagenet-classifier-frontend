import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
  constructor(private auth: AuthService, private router: Router) {
    
  }

  onLogInButtonClick = async () => {
    let loginInput: any = document.getElementById("loginInput");
    let passwordInput: any = document.getElementById("passwordInput");

    await this.auth.logIn(loginInput.value, passwordInput.value);

    console.log(this.auth.isAuth);

    if (this.auth.isAuth) {
      await this.router.navigate(["profile"]);
    }

  }
}
