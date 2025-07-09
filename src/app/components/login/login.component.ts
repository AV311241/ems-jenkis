import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { JwtService } from '../../services/jwt.service';


@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
   private jwtService: JwtService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, ]],
      password: ['', [Validators.required, ]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        // alert('Login Successful!');
        if(this.jwtService.getRole() == 'EMPLOYEE'){ 
          this.router.navigate(['/profile']);
        }else if(['ADMIN','HR'].includes(this.jwtService.getRole())){
          this.router.navigate(['/admin']);
        }       
      },
      error: (err:any) => {
        console.error('Login failed:', err);
        alert('Invalid email or password.');
      },
    });
  }
}
