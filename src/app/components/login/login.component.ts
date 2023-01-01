import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {


  }

  initForm() {
    this.form = this.fb.group({
      login: [null, Validators.required],
      senha: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.initForm();
  }
}
