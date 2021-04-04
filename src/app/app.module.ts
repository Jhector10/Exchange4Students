import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListingFormComponent } from './listing-form/listing-form.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


@NgModule({
  declarations: [ 
    AppComponent, 
    ListingFormComponent, 
    NavigationBarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( {
      apiKey: "AIzaSyD4sVCwHgz1GUoP7ITGkdg4TtpvDX8uX2o",
      authDomain: "exchange4students.firebaseapp.com",
      projectId: "exchange4students",
      storageBucket: "exchange4students.appspot.com",
      messagingSenderId: "1081070035803",
      appId: "1:1081070035803:web:6d9f8bf34a862a1ae1f07e",
      measurementId: "G-F1NZZJSDQT"
  }),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
