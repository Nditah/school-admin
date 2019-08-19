import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLoginHeight: string;
  loginForm: FormGroup;
  loading = false;

  constructor(private router: Router,
    private authSerive: AuthService) { }

  ngOnInit() {
    // this.formLoginHeight = `calc(50vh - ${+document.getElementById('login-row').clientHeight / 2}px)`;
    this.initialSelectFields();
  }

  initialSelectFields() {
    this.loginForm = new FormGroup({
      // 'phone': new FormControl(null, [this.phoneValidation]),
      'email': new FormControl(null, [this.emailValidation]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  phoneValidation = (control: FormControl): {
    [s: string]: boolean
    } => {
        if (/^[0][0-9]/.test(control.value) === false) {
            return {
                'phoneValidation': true
            };
        }
        return null;
    }

  emailValidation = (control: FormControl): {
    [s: string]: boolean
    } => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value) === false) {
            return {
                'emailValidation': true
            };
        }
        return null;
    }

  async onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      const currentElm = $('button.hovering.ld-over');
      currentElm.addClass('running');
      const payload = this.loginForm.value;
      await this.authSerive.postLogin(payload, currentElm);
      this.loading = false;
      } else {
        this.loading = false;
        this.loginForm.controls.email.markAsTouched();
        this.loginForm.controls.password.markAsTouched();
      }
  }
}
