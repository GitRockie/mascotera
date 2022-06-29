import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario, FileUpload } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  user: Usuario;
  public photo: SafeResourceUrl;
  image: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    public photoService: PhotoService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initializeForm(!this.isPasswordResetPage);
  }

  initializeForm(showPasswordField: boolean): void {
    this.authForm = this.formBuilder.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([
            showPasswordField ? Validators.required : null,
            Validators.minLength(6),
          ]),
        ],
        name: [''],
        direccion: [''],
        cp: [''],
        tlf: [''],
        obs: [''],
      },
      Validators.required
    );
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
        photo: this.photo,
      };
      this.formSubmitted.emit(credentials);
/*      if (this.image) {
        const filename = this.user.id + '.png';
        const file = this.photoService.dataURLtoFile(
          this.image.dataUrl,
          filename
        );
        const fileUpload = new FileUpload(file);
        this.photoService.pushFileToStorage(fileUpload);
      }
*/
    }
  }
  async userPhoto() {
    const picture = await this.photoService.addNewPhoto();
    this.image = picture;
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      picture.dataUrl && picture.dataUrl
    );
    return;
  }
}
