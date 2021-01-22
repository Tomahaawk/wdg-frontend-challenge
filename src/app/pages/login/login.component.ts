import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Patterns } from 'src/app/utils/patterns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(Patterns.EMAIL)]],
      password: ['', [Validators.required]],
    });
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }

  authUser(values): void {
    this.hasError = false;
    this.toggleLoading();

    this.authService.authUser(values).subscribe(response => {
      this.toggleLoading();
      this.authService.saveToken(response.token);
      this.router.navigate(['/users']);
    }, (err) => {
      console.log(err);
      this.toggleLoading();
      this.hasError = true;
    });
  }

}
