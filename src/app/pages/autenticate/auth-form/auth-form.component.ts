import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})

export class AuthFormComponent implements OnInit {
  @Input() actionButtonText = 'Sign In';
  @Input() isPasswordResetPage = false;
  @Output() formSubmitted = new EventEmitter<any>();

  public authForm: FormGroup;
    constructor(private readonly formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.initializeForm(!this.isPasswordResetPage);
  }

  initializeForm(showPasswordField: boolean): void {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([
          showPasswordField ? Validators.required : null,
          Validators.minLength(6),
        ]),
      ],
      name: [''],
      direccion: [''],
      cp: [''],
      tlf: [''],
      obs: [''],
    },Validators.required);
  }

  submitCredentials(authForm: FormGroup): void {
    if (!authForm.valid) {
      console.log('Form is not valid yet, current value:', authForm.value);
    } else {
      const credentials = {
        email: authForm.value.email,
        password: authForm.value.password,
        nombre: authForm.value.name,
        direccion: authForm.value.direccion,
        cp: authForm.value.cp,
        tlf: authForm.value.tlf,
        obs: authForm.value.obs,
      };
      this.formSubmitted.emit(credentials);
    }
  }
}
