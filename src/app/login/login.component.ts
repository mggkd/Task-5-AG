import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  users = [
    { username: 'admin', password: 'password', role: 'HOD' },
    { username: 'user1', password: 'password1', role: 'Employee' },
    { username: 'user2', password: 'password2', role: 'Employee' },
    // Add more users as needed
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      // Valid credentials, navigate to the dashboard
      this.router.navigate(['/dashboard']);

      // Store the user's role in local storage or state management
      localStorage.setItem('userRole', user.role);
    } else {
      // Invalid credentials, display error message
      this.invalidLogin = true;
    }
  }

  goToRegistration() {
    // Navigate to the registration form route
    this.router.navigate(['/registration']);
  }
}
