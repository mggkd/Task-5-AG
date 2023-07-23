import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormObj: FormGroup | any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormObj = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.loginFormObj.value);

    const { userName, password } = this.loginFormObj.value;

    this.authService.login(userName, password).subscribe(
      (user: any) => {
        console.log('Login successful:', user);
        const userPosition = user.position.toLowerCase(); 
        const allowedRole = 'hod';

        if (userPosition === allowedRole.toLowerCase()) { 
          this.router.navigate(['/hod-dashboard']);
        } else if (userPosition === 'staff') {
          this.router.navigate(['/staff-dashboard']);
        } else {
          console.log('Unknown user position');
        }
      },
      (error: any) => {
        console.log('Authentication error:', error);
      }
    );

    this.loginFormObj.reset();
  }

}