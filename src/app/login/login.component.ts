import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showSuccess = false;
  showError = false; 
  errorMessage = '';
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.showSuccess = false;
      this.showError = false;
      const { email, password } = this.loginForm.value;

      axios.post('https://reqres.in/api/login', { email, password })
        .then(response => {
          this.isLoading = false;
          this.showSuccess = true;
          this.loginForm.reset();
          console.log('Login successful', response.data);
        })
        .catch(error => {
          this.isLoading = false;
          this.showError = true;
          this.errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
          console.error('Login failed', error);
        });
    }
  }
}