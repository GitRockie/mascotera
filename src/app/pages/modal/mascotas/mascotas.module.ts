import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotasPageRoutingModule } from './mascotas-routing.module';

import { MascotasPage } from './mascotas.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MascotasPageRoutingModule
  ],
  declarations: [MascotasPage]
})
export class MascotasPageModule {}
