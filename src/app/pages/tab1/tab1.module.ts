import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Share } from '@capacitor/share';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
