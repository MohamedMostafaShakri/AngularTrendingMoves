import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // constructor() {}
  isLoading: Boolean = false;
  errorMessage: string = '';
  signupForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z][a-z0-9]{8,16}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z][a-z0-9]{8,16}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(020)?01[0125][0-9]{8}$/)])
  })

  constructor(private _AuthService: AuthService, private _Router: Router) { };

  signUpUser(data: FormGroup) {
    // console.log(data.value);
    this.isLoading = true; // For Sign up Btn animation during Ajax request
    this._AuthService.register(data.value).subscribe({
      next: (res) => {
        console.log('res ', res);
        if (res.message == 'success') {

          this._Router.navigate(['/signin'])
        }
      },
      error: (myErrors) => {
        // console.log('myErrors ', myErrors); // response in case of error
        // console.log(myErrors.error.message);
        this.isLoading = false;
        this.errorMessage = myErrors.error.message;
        if (this.errorMessage == "Account Already Exists") {
          this.errorMessage = this.errorMessage + " ,Please Sign in." + 
          setTimeout(() => {
            this._Router.navigate(['/login'])

          }, 2000);
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    })

  }



}
