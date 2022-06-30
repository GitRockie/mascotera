import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { DetalleComponent } from './detalle/detalle.component';



@NgModule({

  declarations: [
    HeaderComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    DetalleComponent,

  ]
})
export class ComponentsModule { }
