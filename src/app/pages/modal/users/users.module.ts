import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {ModalRoutingModule } from './users-routing.module';

import { ModalPage } from './users.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ModalRoutingModule
  ],
  declarations: [ModalPage]
})
export class UsersPageModule {}
