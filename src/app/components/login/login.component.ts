import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  passwordVisible: boolean = false;
  isSpinning: boolean = false;

  constructor(private fb: FormBuilder) {


  }

  initForm() {
    this.form = this.fb.group({
      login: [null, Validators.required],
      senha: [null, Validators.required]
    })
  }

  login(): void {
    if (this.form.valid) {
      const login = this.form.value;
      console.log(login);
    }
    else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
  }

  ngOnInit() {
    this.initForm();
  }
}
