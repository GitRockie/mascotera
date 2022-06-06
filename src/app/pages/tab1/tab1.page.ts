import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-make',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  formEntrada: FormGroup;

  constructor(
    private dataService: DataService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formEntrada = this.fb.group({
      name: [''],
      tipo: [''],
      raza: [''],
      fnac: Date.now(),
      obs: [''],
    });
  }

  onFormSubmit() {
    if (!this.formEntrada.valid) {
      return false;
    } else {
      this.dataService.createMascota(this.formEntrada.value).then(res => {
        this.formEntrada.reset();
        this.router.navigate(['/tabs']);
      })
        .catch(error => console.log(error));
    }
  }
}
