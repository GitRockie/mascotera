import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { environment } from '../environments/environment';

import {provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {getFirestore, provideFirestore } from '@angular/fire/firestore'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    TranslateModule.forRoot(),
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    provideFirebaseApp( () => initializeApp( environment.firebase )),
    provideFirestore (() => getFirestore())

  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
