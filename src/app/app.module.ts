import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import {provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {getFirestore, provideFirestore } from '@angular/fire/firestore'

import { AppComponent } from './app.component';
import { provideDatabase,getDatabase } from '@angular/fire/database';

import { environment } from '../environments/environment';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    provideFirebaseApp( () => initializeApp( environment.firebase )),
    provideFirestore (() => getFirestore()),
    provideDatabase(() => getDatabase())

  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
